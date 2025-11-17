import { apiSlice } from "./apiSlice";

const TRAINER_URL = "/trainer";

export const trainerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    trainerSignup: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    trainerLogin: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    createPerformance: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/performance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Performance"],
    }),
    appealPerformance: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/performance`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Performance"],
    }),
    refreshTokens: builder.mutation({
      query: (refresh_token) => ({
        url: `${TRAINER_URL}/refresh`,
        method: "POST",
        body: { refresh_token },
      }),
    }),
    getTrainerProfile: builder.query({
      query: () => ({
        url: `${TRAINER_URL}/me`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useTrainerSignupMutation,
  useTrainerLoginMutation,
  useCreatePerformanceMutation,
  useAppealPerformanceMutation,
  useRefreshTokensMutation,
  useGetTrainerProfileQuery,
} = trainerApi;