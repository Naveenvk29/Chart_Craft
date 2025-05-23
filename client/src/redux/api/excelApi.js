import { AI_INSIGHTS, EXCELS_FILE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const excelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadExcelFile: builder.mutation({
      query: (fileData) => ({
        url: `${EXCELS_FILE_URL}/upload`,
        method: "POST",
        body: fileData,
        credentials: "include",
      }),
    }),
    fetchAllUserExcelFiles: builder.query({
      query: () => ({
        url: `${EXCELS_FILE_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ExcelFile"],
    }),
    fetchExcelFileById: builder.query({
      query: (id) => ({
        url: `${EXCELS_FILE_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    removeExcelFile: builder.mutation({
      query: (id) => ({
        url: `${EXCELS_FILE_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ExcelFile"],
    }),
    aiInsights: builder.mutation({
      query: ({ data, type }) => ({
        url: `${AI_INSIGHTS}/ai-insights`,
        method: "POST",
        body: { data, type },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUploadExcelFileMutation,
  useFetchAllUserExcelFilesQuery,
  useFetchExcelFileByIdQuery,
  useRemoveExcelFileMutation,
  useAiInsightsMutation,
} = excelsApi;
