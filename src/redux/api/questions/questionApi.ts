import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const base = "/questions";

const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQuestion: build.mutation({
      query: (data) => ({
        url: `${base}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    getAllQuestions: build.query({
      query: (id) => ({
        url: `${base}/by-category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),

    getSingleQuestion: build.query({
      query: (id) => ({
        url: `${base}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),

    getRandomQuestions: build.query({
      query: (id) => ({
        url: `${base}/by-category/random/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),

    updateSingleQuestion: build.mutation({
      query: ({ id, ...data }) => ({
        url: `${base}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    deleteSingleQuestion: build.mutation({
      query: (id) => ({
        url: `${base}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.question],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionsQuery,
  useGetRandomQuestionsQuery,
  useGetSingleQuestionQuery,
  useUpdateSingleQuestionMutation,
  useDeleteSingleQuestionMutation,
} = questionApi;
