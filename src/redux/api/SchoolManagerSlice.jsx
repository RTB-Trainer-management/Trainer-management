import { apiSlice } from "./apiSlice";

const MANAGER_URL = "/school-manager"
const TrainerSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    ManagerSignup: builder.mutation({
      query: data => ({
        url: `${MANAGER_URL}/create`,
        method: "POST",
        body: data
      })
    }),

    GetAllPerformances: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/performance`,
        method: "GET",
      })
    }),

    GetAllTrainers: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/trainers`,
        method: "GET",
      })
    }),

    GetTrainer: builder.query({
      query: id => ({
        url: `${MANAGER_URL}/trainers/${id}`,
        method: "GET",
      })
    }),
  })
})

export const {
  useGetAllPerformancesQuery,
  useGetAllTrainersQuery,
  useGetTrainerQuery
} = TrainerSlice