import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/admin"; 

const AdminSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    AdminSignup: builder.mutation({
      query: data => ({
        url: `${MANAGER_URL}/create`,
        method: "POST",
        body: data
      })
    }),

    GetAllTrainers: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/trainers`,
        method: "GET",
      })
    }),

    // GetTrainerById: builder.query({
    //   query: id => ({
    //     url: `${MANAGER_URL}/id`,
    //     method: "GET"
    //   })
    // })
  }),
});

export const {
  useGetAllManagersQuery,
  useAdminSignupMutation,
} = AdminSlice;
