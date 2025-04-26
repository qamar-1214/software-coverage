import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../../config/apiConfig";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.token ||
        document.cookie.split("token=")[1]?.split(";")[0];
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Review", "Software"],
  endpoints: (builder) => ({
    getMyReviews: builder.query({
      query: () => "/api/v1/review/my-reviews",
      providesTags: ["Review"],
    }),
    getReviewById: builder.query({
      query: (id) => `/api/v1/review/fetch-review/${id}`,
      providesTags: ["Review"],
    }),
    getSoftwares: builder.query({
      query: () => "/api/v1/software/get-all-softwares",
      transformResponse: (response) => response.data.softwares, // Extract softwares array
      providesTags: ["Software"],
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/api/v1/review/add-reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `/api/v1/review/update-reviews/${id}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetMyReviewsQuery,
  useGetReviewByIdQuery,
  useGetSoftwaresQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;
