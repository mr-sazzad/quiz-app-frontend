import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const base = "/categories";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: `${base}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    updateCategory: build.mutation({
      query: ({ id, ...data }) => ({
        url: `${base}/edit/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${base}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),

    getSingleCategory: build.query({
      query: (id) => ({
        url: `${base}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    getAllCategories: build.query({
      query: (data) => ({
        url: `${base}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetSingleCategoryQuery,
} = categoryApi;
