import { apiSlice } from "./apiSlice";

const TRAINER_URL = "/trainer"
const TrainerSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    TrainerSignup: builder.mutation({
      query: data => ({
        url: `${TRAINER_URL}/`,
        method: "POST",
        body: data
      }),
      
    })
  })
})