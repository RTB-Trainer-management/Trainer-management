import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/admin";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminSignup: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getAllAdminTrainers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/trainers`,
        method: "GET",
      }),
    }),
    getAllAdminManagers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/managers`,
        method: "GET",
      }),
    }),
    deleteTrainer: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/trainer/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAdminSignupMutation,
  useGetAllAdminTrainersQuery,
  useGetAllAdminManagersQuery,
  useDeleteTrainerMutation,
} = adminApi;
