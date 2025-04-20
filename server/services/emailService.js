import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secure Gmail setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (
  toEmail,
  verificationToken,
  type = "initial"
) => {
  try {
    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

    // Choose template based on `type`
    const templateFileName =
      type === "resend"
        ? "resendVerificationEmail.html"
        : "verificationEmail.html";

    const templatePath = path.join(__dirname, "./templates", templateFileName);
    let emailTemplate = await fs.readFile(templatePath, "utf-8");

    // Replace placeholder with actual verification link
    emailTemplate = emailTemplate.replace(
      /{{verification_link}}/g,
      verificationLink
    );

    const mailOptions = {
      from: `"SoftwareCoverage" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Verify Your Email - SoftwareCoverage",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email (${type}) sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
};

// ✅ Send Welcome Email
const sendWelcomeEmail = async (email) => {
  try {
    const templatePath = path.join(
      __dirname,
      "./templates",
      "welcomeEmail.html"
    );
    let welcomeTemplate = await fs.readFile(templatePath, "utf-8");

    const htmlContent = welcomeTemplate.replace(
      /{{dashboard_link}}/g,
      "http://localhost:5173/user-dashboard"
    );

    const mailOptions = {
      from: `"SoftwareCoverage" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to SoftwareCoverage!",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to: ${email}`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw new Error("Failed to send welcome email.");
  }
};
export { sendVerificationEmail, sendWelcomeEmail };
