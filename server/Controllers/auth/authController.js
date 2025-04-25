import jwt from "jsonwebtoken";
import User from "../../Models/auth/auth.model.js";
import fs from "fs/promises";
import path from "path";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import admin from "../../Config/firebaseAdmin.js";
import { Readable } from "stream";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../../services/emailService.js";
import crypto from "crypto";

// Initialize default admin on server start
const initializeDefaultAdmin = async () => {
  try {
    const adminEmail = "usman@gmail.com";
    const adminPassword = "usman123";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        isAdmin: true,
        termsAccepted: true,
        isEmailVerified: true,
      });
      await admin.save();
      console.log("Default admin registered:", adminEmail);
    }
  } catch (error) {
    console.error("Error initializing default admin:", error);
  }
};

// Call this function when the server starts
initializeDefaultAdmin();

const signup = async (req, res) => {
  try {
    const { email, password, termsAccepted } = req.body;

    if (!email || !password || termsAccepted === undefined) {
      return res.status(400).json({
        message: "Email, password, and terms acceptance are required.",
        success: false,
        error: true,
      });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        message: "You must accept the terms and conditions.",
        success: false,
        error: true,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered.",
        success: false,
        error: true,
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = new User({
      email,
      password,
      termsAccepted,
      isAdmin: false,
      verificationToken,
    });

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      success: true,
      error: false,
      token,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        displayName: user.displayName,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error during signup.",
      success: false,
      error: true,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
        error: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
        success: false,
        error: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    const redirectUrl = user.isAdmin ? "/admin" : "/user-dashboard";

    res.status(200).json({
      message: "Login successful.",
      success: true,
      error: false,
      token,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        displayName: user.displayName,
        isEmailVerified: user.isEmailVerified,
      },
      redirectUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error during signin.",
      success: false,
      error: true,
    });
  }
};

const firebaseSignIn = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken || typeof idToken !== "string") {
      return res.status(400).json({
        message: "ID token must be a valid string.",
        success: false,
        error: true,
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    if (!email) {
      return res.status(400).json({
        message: "Invalid  account: No email provided.",
        success: false,
        error: true,
      });
    }

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = new User({
        email,
        displayName: name,
        profileImage: picture,
        isAdmin: email === "usman@gmail.com",
        termsAccepted: true,
        isEmailVerified: true, // Google users are auto-verified
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    const redirectUrl = user.isAdmin ? "/admin" : "/user-dashboard";

    res.status(isNewUser ? 201 : 200).json({
      message: isNewUser ? "User registered." : "login successful.",
      success: true,
      error: false,
      token,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        displayName: user.displayName,
        isEmailVerified: user.isEmailVerified,
      },
      redirectUrl,
    });
  } catch (error) {
    console.error(" Sign-In Error:", error);
    res.status(500).json({
      message: error.message || "Server error during  sign-in.",
      success: false,
      error: true,
    });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req;
  let updateData = req.body;

  try {
    // Find user

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before updating your profile.",
      });
    }

    // Check for duplicate email
    if (updateData.email) {
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      }).lean();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use.",
        });
      }
    }

    // Handle profile image upload to Cloudinary
    if (req.file) {
      // Upload to Cloudinary using buffer

      const [cloudinaryResponse] = await Promise.all([
        new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "user_profiles",
              public_id: `user_${userId}_${uuidv4()}_${Date.now()}`,
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(req.file.buffer); // Upload buffer directly
        }),
        user.profileImage?.public_id
          ? cloudinary.v2.uploader
              .destroy(user.profileImage.public_id)
              .catch((err) => {
                console.warn("Failed to delete old image:", err.message);
                return null;
              })
          : Promise.resolve(null),
      ]);
      console.timeEnd("cloudinaryOperations");

      updateData.profileImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } else if (
      updateData.profileImage === "null" ||
      updateData.profileImage === null
    ) {
      if (user.profileImage?.public_id) {
        try {
          await cloudinary.v2.uploader.destroy(user.profileImage.public_id);
          console.log(
            "Old profile image deleted from Cloudinary:",
            user.profileImage.public_id
          );
        } catch (cloudinaryError) {
          console.warn(
            "Failed to delete old Cloudinary image:",
            cloudinaryError.message
          );
        }
      }

      updateData.profileImage = null;
    }

    // Handle password update
    if (updateData.password) {
      if (updateData.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
      }

      const salt = await bcryptjs.genSalt(10);
      updateData.password = await bcryptjs.hash(updateData.password, salt);
    }

    // Check if there's data to update
    if (Object.keys(updateData).length === 0 && !req.file) {
      return res.status(400).json({
        success: false,
        message: "No data provided to update.",
      });
    }

    // Update user
    console.time("updateUser");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
    console.timeEnd("updateUser");

    console.timeEnd("updateProfile");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        profileImage: updatedUser.profileImage?.url || null,
        displayName: updatedUser.displayName,
        isEmailVerified: updatedUser.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

export default updateProfile;

// const getUserData = async (req, res) => {
//   try {
//     const { userId } = req;

//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//         error: true,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User data fetched successfully.",
//       error: false,
//       user: {
//         email: user.email,
//         isAdmin: user.isAdmin,
//         profileImage: user.profileImage
//           ? user.profileImage.startsWith("http")
//             ? user.profileImage
//             : `http://localhost:5000/${user.profileImage}`
//           : null,
//         displayName: user.displayName,
//         termsAccepted: user.termsAccepted,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     console.error("Get User Data Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Server error while fetching user data.",
//       error: true,
//     });
//   }
// };
const getUserData = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        error: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      error: false,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage?.url || null, // Use Cloudinary URL
        displayName: user.displayName,
        termsAccepted: user.termsAccepted,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Get User Data Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching user data.",
      error: true,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    error: false,
    message: "Logged out successfully.",
  });
};

// controllers/authController.js
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
        error: true,
      });
    }

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token.",
        error: true,
      });
    }

    // Update user only if not already verified to avoid redundant updates
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      user.verificationToken = null;
      await user.save();

      // Send welcome email
      await sendWelcomeEmail(user.email);
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      error: false,
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during email verification.",
      error: true,
    });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
        error: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        error: true,
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
        error: true,
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    await sendVerificationEmail(email, verificationToken, "resend");

    res.status(200).json({
      success: true,
      message: "Verification email resent successfully.",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Server error while resending verification email.",
      error: true,
    });
  }
};

export {
  signup,
  signin,
  firebaseSignIn,
  updateProfile,
  getUserData,
  logout,
  verifyEmail,
  resendVerification,
};
