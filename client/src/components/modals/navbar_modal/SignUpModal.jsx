import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../../../firebase";
import {
  setSignupForm,
  setSigninForm,
  toggleShowPassword,
  resetForms,
  setView,
} from "../../../store/slices/auth/authSlice";
import {
  useSignUpMutation,
  useSignInMutation,
  useVerifyTokenQuery,
  useFetchUserDataQuery,
  useResendVerificationMutation,
  useFirebaseSignInMutation,
  authApi,
} from "../../../store/api/auth/auth";
import { toast } from "react-toastify";

const SignUpModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { view, signupForm, signinForm, showPassword } = useSelector(
    (state) => state.auth
  );
  const [
    signUp,
    { isLoading: isSigningUp, error: signupError, isSuccess: signupSuccess },
  ] = useSignUpMutation();
  const [
    signIn,
    { isLoading: isSigningIn, error: signinError, isSuccess: isSigninSuccess },
  ] = useSignInMutation();
  const [
    firebaseSignIn,
    {
      isLoading: isGoogleSigningIn,
      error: googleError,
      isSuccess: isGoogleSignInSuccess,
    },
  ] = useFirebaseSignInMutation();
  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();
  const [loadingState, setLoadingState] = useState({
    google: false,
    facebook: false,
  });

  const { data: authData, isLoading: isVerifying } = useVerifyTokenQuery(
    undefined,
    {
      skip: !isOpen,
    }
  );
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery(
    undefined,
    {
      skip: !authData?.isAuthenticated,
    }
  );

  useEffect(() => {
    if (isGoogleSignInSuccess) {
      navigate("/user-dashboard");
      setIsOpen(false);
      dispatch(resetForms());
    }
  }, [isGoogleSignInSuccess, navigate, setIsOpen, dispatch]);

  useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        dispatch(resetForms());
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, setIsOpen, dispatch]);

  if (!isOpen || isVerifying) return null;

  const handleGoogleSignIn = async () => {
    setLoadingState((prev) => ({ ...prev, google: true }));
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await firebaseSignIn({ idToken }).unwrap();
      toast.success(`Welcome, ${user.displayName || user.email}!`);
      setIsOpen(false);
      dispatch(resetForms());
      dispatch(authApi.util.resetApiState()); // Clear RTK Query cache
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error?.data?.message || "Google Sign-In Failed");
    } finally {
      setLoadingState((prev) => ({ ...prev, google: false }));
    }
  };
  const handleFacebookSignIn = async () => {
    setLoadingState((prev) => ({ ...prev, facebook: true }));

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const idToken = await result.user.getIdToken();
      const response = await firebaseSignIn({ idToken }).unwrap();

      toast.success("Login successful!");
      setIsOpen(false);
      dispatch(resetForms());
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);

      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        const pendingCred = FacebookAuthProvider.credentialFromError(error);

        if (email) {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          console.log("methods", methods);

          if (methods.includes("google.com")) {
            // Ask user to login with Google
            toast.info(
              "Please login with Google to link your Facebook account."
            );

            const googleProvider = new GoogleAuthProvider();
            const googleResult = await signInWithPopup(auth, googleProvider);

            // Link the pending Facebook credentials to the Google account
            await linkWithCredential(googleResult.user, pendingCred);

            const idToken = await googleResult.user.getIdToken();
            const response = await firebaseSignIn({ idToken }).unwrap();

            toast.success("Accounts linked successfully!");
            setIsOpen(false);
            dispatch(resetForms());
            dispatch(authApi.util.resetApiState());
          } else if (methods.includes("password")) {
            toast.error(
              "This email is registered with Email/Password. Please login with your email credentials."
            );
          } else {
            toast.error(
              "This email is registered with a different sign-in method. Please try another way."
            );
          }
        } else {
          toast.error(
            "Email already exists with another provider. Please try signing in using a different method."
          );
        }
      } else {
        toast.error(
          error.message || "Facebook login failed. Please try again!"
        );
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, facebook: false }));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupForm.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    try {
      const response = await signUp(signupForm).unwrap();
      toast.success(response.message || "Signup Success");
    } catch (error) {
      toast.error(error?.data?.message || "Signup Error");
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(signinForm).unwrap();
      toast.success(response.message || "SignIn Success");
      setIsOpen(false);
      dispatch(resetForms());
      dispatch(authApi.util.resetApiState()); // Clear RTK Query cache
    } catch (error) {
      toast.error(error?.data?.message || "SignIn Error");
    }
  };

  const renderInitialView = () => (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6">
      <img
        src="/SoftwareCoverage.png"
        alt="SoftwareCoverage"
        className="h-20 sm:h-26 mb-2 sm:mb-4"
      />
      <div className="w-full max-w-[240px] mx-auto space-y-6 sm:space-y-8">
        <button
          onClick={() => dispatch(setView("signup"))}
          className="w-full bg-emerald-500 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Sign Up with Email
        </button>
        <div className="flex items-center w-full">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 sm:px-4 text-gray-500 text-xs sm:text-sm">
            or
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          disabled={loadingState.google}
          className="w-full border border-gray-300 text-gray-700 rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loadingState.google ? "Signing In..." : "Continue with Google"}
        </button>

        <button
          onClick={handleFacebookSignIn}
          disabled={loadingState.facebook}
          className="w-full border border-gray-300 text-gray-700 rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
            <path
              fill="#1877F2"
              d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.33h-2.031c-1.192 0-1.614.645-1.614 2.19v1.936h3.643l-.743 3.666H12.77v7.98H9.101z"
            />
          </svg>
          {loadingState.facebook ? "Signing In..." : "Continue with Facebook"}
        </button>
        <button
          onClick={() => dispatch(setView("signin"))}
          className="w-full bg-blue-700 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Sign In with Email
        </button>
      </div>
    </div>
  );

  const renderSignupView = () => (
    <>
      {signupSuccess ? (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold  mb-2">You've got mail!</h2>
          <p className="text-gray-700 mb-4">
            Thank you for joining Software Coverage.
          </p>
          <p className="text-sm text-gray-500">
            Please check &
            <strong className="text-2xl text-black font-bold">
              confirm your email address!
            </strong>
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => dispatch(setView("initial"))}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>
          <div className="text-center flex flex-col items-center">
            <img
              src="/SoftwareCoverage.png"
              alt="SoftwareCoverage"
              className="h-16 sm:h-26 mb-2"
            />
            <h2 className="text-3xl font-[400] text-gray-800">Sign Up Now</h2>
            <p className="text-gray-600 mt-3 text-lg sm:text-base">
              Register today and get access to the best deals and software
              insights
            </p>
          </div>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            {signupError && (
              <p className="text-red-500 text-sm">
                {signupError.data?.message || "Signup failed"}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e) =>
                  dispatch(setSignupForm({ email: e.target.value }))
                }
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={signupForm.password}
                onChange={(e) =>
                  dispatch(setSignupForm({ password: e.target.value }))
                }
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => dispatch(toggleShowPassword())}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={signupForm.termsAccepted}
                onChange={(e) =>
                  dispatch(setSignupForm({ termsAccepted: e.target.checked }))
                }
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-emerald-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-emerald-500 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-emerald-600 transition-colors text-sm sm:text-base"
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      )}
    </>
  );

  const renderSigninView = () => (
    <div className="flex flex-col space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => dispatch(setView("initial"))}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      <div className="text-center flex flex-col items-center">
        <img
          src="/SoftwareCoverage.png"
          alt="SoftwareCoverage"
          className="h-16 sm:h-26 mb-2"
        />
        <h2 className="text-3xl font-[400] text-gray-800">Sign In</h2>
        <p className="text-gray-600 mt-3 text-lg sm:text-base">
          Access your account and claim your Software Profile
        </p>
      </div>
      <form onSubmit={handleSigninSubmit} className="space-y-4">
        {signinError && (
          <p className="text-red-500 text-sm">
            {signinError.data?.message || "Signin failed"}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={signinForm.email}
            onChange={(e) => dispatch(setSigninForm({ email: e.target.value }))}
            className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-lg sm:text-base"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={signinForm.password}
            onChange={(e) =>
              dispatch(setSigninForm({ password: e.target.value }))
            }
            className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-lg sm:text-base"
            required
          />
          <button
            type="button"
            onClick={() => dispatch(toggleShowPassword())}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          type="submit"
          disabled={isSigningIn}
          className="w-full bg-emerald-500 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-emerald-600 transition-colors text-sm sm:text-base"
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-white/30 z-50"
      style={{ zIndex: "999" }}
    >
      <div className="bg-white/90 rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6 relative">
        <button
          onClick={() => {
            setIsOpen(false);
            dispatch(resetForms());
          }}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {view === "initial" && renderInitialView()}
        {view === "signup" && renderSignupView()}
        {view === "signin" && renderSigninView()}
      </div>
    </div>
  );
};

export default SignUpModal;
