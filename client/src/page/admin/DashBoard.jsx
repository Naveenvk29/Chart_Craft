import React from "react";
import {
  useFetchAllUserQuery,
  useFetchAllExcelFilesQuery,
} from "../../redux/api/adminApi";
const DashBoard = () => {
  const { data: users, isLoading: loadingUsers } = useFetchAllUserQuery();
  const { data: excelFiles, isLoading: loadingExcels } =
    useFetchAllExcelFilesQuery();

  return (
    <div className="w-full bg-neutral-50 text-neutral-700 dark:text-neutral-300 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Admin Dashboard
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Manage your application settings
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-lg">System Analytics</h3>
          <p>Users: {loadingUsers ? "Loading..." : users?.length || 0}</p>
          <p>
            Excel Files:{" "}
            {loadingExcels ? "Loading..." : excelFiles?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
