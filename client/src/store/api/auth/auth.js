import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../../config/apiConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    verifyToken: builder.query({
      query: () => "/api/v1/auth/verify-token",
      providesTags: ["Auth"],
      transformResponse: (response) => ({
        isAuthenticated: response?.isAuthenticated || false,
        user: response?.user || null,
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/sign-up",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/auth/update-profile",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(["Auth", "User"]));
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),
    firebaseSignIn: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/firebaseSignIn",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (response) => ({
        success: response?.success || false,
        user: response?.user || null,
        redirectUrl: response?.redirectUrl || "/user-dashboard",
      }),
    }),
    fetchUserData: builder.query({
      query: () => "/api/v1/auth/user-data",
      providesTags: ["User"],
      transformResponse: (response) => ({
        success: response?.success || false,
        user: response?.user || null,
      }),
    }),
    resendVerification: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/resend-verification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.query({
      query: (token) => `/api/v1/auth/verify-email?token=${token}`,
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useVerifyTokenQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useFirebaseSignInMutation,
  useUpdateProfileMutation,
  useFetchUserDataQuery,
  useResendVerificationMutation,
  useVerifyEmailQuery,
} = authApi;
