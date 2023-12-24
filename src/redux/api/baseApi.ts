import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
  }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypeLists,
});
