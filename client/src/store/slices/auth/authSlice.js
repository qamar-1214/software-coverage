import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "initial", // initial, signup, signin
  signupForm: { email: "", password: "", termsAccepted: false },
  signinForm: { email: "", password: "" },
  profileForm: {
    email: "",
    password: "",
    profileImage: null,
    displayName: "",
  },
  showPassword: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setView(state, action) {
      state.view = action.payload;
    },
    setSignupForm(state, action) {
      state.signupForm = { ...state.signupForm, ...action.payload };
    },
    setSigninForm(state, action) {
      state.signinForm = { ...state.signinForm, ...action.payload };
    },
    toggleShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    setProfileForm: (state, action) => {
      state.profileForm = { ...state.profileForm, ...action.payload };
    },
    resetProfileForm: (state) => {
      state.profileForm = initialState.profileForm;
    },

    resetForms(state) {
      state.signupForm = initialState.signupForm;
      state.signinForm = initialState.signinForm;
      state.profileForm = initialState.profileForm;
      state.showPassword = false;
      state.view = "initial";
    },
  },
});

export const {
  setView,
  setSignupForm,
  setSigninForm,
  toggleShowPassword,
  resetForms,
  setProfileForm,
  resetProfileForm,
} = authSlice.actions;

export default authSlice.reducer;
