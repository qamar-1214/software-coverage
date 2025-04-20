// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyA0uCPYQvRTCZ5Qz8EOzqjFkOjFFcqbMzQ",
//   authDomain: "software-coverage.firebaseapp.com",
//   projectId: "software-coverage",
//   storageBucket: "software-coverage.firebasestorage.app",
//   messagingSenderId: "161118831605",
//   appId: "1:161118831605:web:512e49c0ec425c09a556bc",
//   measurementId: "G-E0GT6M7WRF",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0uCPYQvRTCZ5Qz8EOzqjFkOjFFcqbMzQ",
  authDomain: "software-coverage.firebaseapp.com",
  projectId: "software-coverage",
  storageBucket: "software-coverage.firebasestorage.app",
  messagingSenderId: "161118831605",
  appId: "1:161118831605:web:512e49c0ec425c09a556bc",
  measurementId: "G-E0GT6M7WRF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
