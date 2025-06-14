import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUser: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    modifyUserDetailsbyadmin: builder.mutation({
      query: ({ id, userData }) => ({
        url: `${ADMIN_URL}/user/${id}`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    removeAnyUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    modifyUserRole: builder.mutation({
      query: ({ id, userData }) => ({
        url: `${ADMIN_URL}/user/${id}/role`,
        method: "PATCH",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    // Excel
    fetchAllExcelFiles: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/excels`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ExcelFile"],
    }),
    removeAnyUserExcelFile: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/excel/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ExcelFile"],
    }),
    modifyAnyUserChartConfig: builder.mutation({
      query: ({ id, excelData }) => ({
        url: `${ADMIN_URL}/excel/${id}/chart`,
        method: "PATCH",
        body: excelData,
        credentials: "include",
      }),
      invalidatesTags: ["ExcelFile"],
    }),
    viewAnalytics: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/analytics`,
        method: "GET",
        credentials: "include",
      }),
    }),
    monitorUseractivity: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/monitor`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAuditLogs: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/log`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useFetchAllUserQuery,
  useModifyUserDetailsbyadminMutation,
  useRemoveAnyUserMutation,
  useModifyUserRoleMutation,
  useFetchAllExcelFilesQuery,
  useRemoveAnyUserExcelFileMutation,
  useMonitorUseractivityQuery,
  useViewAnalyticsQuery,
  useGetAuditLogsQuery,
} = adminApi;
