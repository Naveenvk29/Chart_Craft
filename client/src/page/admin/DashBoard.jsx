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
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage your application settings
      </p>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">System Analytics</h3>
        <p>Users: {loadingUsers ? "Loading..." : users?.length || 0}</p>
        <p>
          Excel Files: {loadingExcels ? "Loading..." : excelFiles?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default DashBoard;
