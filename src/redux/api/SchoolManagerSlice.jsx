import { apiSlice } from "./apiSlice";

const MANAGER_URL = "/school-manager";

export const schoolManagerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    managerSignup: builder.mutation({
      query: (data) => ({
        url: `${MANAGER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    managerLogin: builder.mutation({
      query: (data) => ({
        url: `${MANAGER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getAllPerformances: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/performance`,
        method: "GET",
      }),
      providesTags: ["Performance"],
    }),
    respondToPerformance: builder.mutation({
      query: (data) => ({
        url: `${MANAGER_URL}/performance`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Performance"],
    }),
    editPerformance: builder.mutation({
      query: (data) => ({
        url: `${MANAGER_URL}/performance-edit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Performance"],
    }),
    getAllTrainers: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/trainers`,
        method: "GET",
      }),
      providesTags: ["Trainers"],
    }),
    getTrainer: builder.query({
      query: (id) => ({
        url: `${MANAGER_URL}/trainers/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _err, id) => [{ type: "Trainers", id }],
    }),
    updateTrainerPerformance: builder.mutation({
      query: (data) => ({
        url: `${MANAGER_URL}/trainers/performance`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Performance"],
    }),
    getAllRecruitments: builder.query({
      query: () => ({
        url: `${MANAGER_URL}/recruitments`,
        method: "GET",
      }),
      providesTags: ["Recruitments"],
    }),
    getRecruitmentsByStatus: builder.query({
      query: (status) => ({
        url: `${MANAGER_URL}/recruitments/status/${status}`,
        method: "GET",
      }),
      providesTags: ["Recruitments"],
    }),
    respondToRecruitment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${MANAGER_URL}/recruitments/${id}/respond`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Recruitments"],
    }),
  }),
});

export const {
  useManagerSignupMutation,
  useManagerLoginMutation,
  useGetAllPerformancesQuery,
  useRespondToPerformanceMutation,
  useEditPerformanceMutation,
  useGetAllTrainersQuery,
  useGetTrainerQuery,
  useUpdateTrainerPerformanceMutation,
  useGetAllRecruitmentsQuery,
  useGetRecruitmentsByStatusQuery,
  useRespondToRecruitmentMutation,
} = schoolManagerApi;