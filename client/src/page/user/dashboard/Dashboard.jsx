import { useSelector } from "react-redux";
import { useFetchAllUserExcelFilesQuery } from "../../../redux/api/excelApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: files, isLoading } = useFetchAllUserExcelFilesQuery();

  return (
    <div className="w-full min-h-screen  text-black">
      <div className="max-w-6xl mx-auto p-8  ">
        {/* Welcome + Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, {userInfo.user?.username}
          </h1>
          <p className="text-gray-600">
            Manage your Excel visualizations and create new insights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-red-400 text-white p-6 rounded-lg shadow">
            <p className="text-4xl font-bold">{files?.length || 0}</p>
            <p className="text-lg mt-1">Uploaded Files</p>
          </div>
          <div className="bg-blue-300 p-6 rounded-lg shadow">
            <p className="text-4xl font-bold">44</p>
            <p className="text-lg mt-1">Downloaded</p>
          </div>
        </div>

        {/* Recent Files */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Recent Files</h2>
            <Link
              to="/dashboard/excel"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              Upload New File
            </Link>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : files && files.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{file.originalname}</p>
                    <p className="text-gray-500 text-sm">
                      Uploaded on{" "}
                      {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      to={`/dashboard/viewfile/${file._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Preview
                    </Link>
                    <a
                      href={file.downloadUrl}
                      download
                      className="text-indigo-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-lg font-semibold mb-2">No files yet</p>
              <p className="mb-4">
                Upload your first Excel file to start visualizing data.
              </p>
              <Link
                to="/dashboard/excel"
                className="inline-block bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
              >
                Upload First File
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
