import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const base = "/users";
const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signupUser: build.mutation({
      query: (data) => ({
        url: `${base}/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: `${base}/login`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getAllUsers: build.query({
      query: () => ({
        url: `${base}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: (id) => ({
        url: `${base}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateSingleUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `${base}/update/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} = userApi;
