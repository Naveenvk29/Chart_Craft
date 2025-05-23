import { useSelector } from "react-redux";
import { useFetchAllUserExcelFilesQuery } from "../../../redux/api/excelApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: files, isLoading } = useFetchAllUserExcelFilesQuery();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full mt-10"
    >
      <div className="max-w-7xl mx-auto p-8">
        {/* Welcome + Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl text-neutral-800 dark:text-neutral-300 font-bold mb-1 tracking-wide">
            Welcome back, {userInfo.user?.username}
          </h1>
          <p className="text-neutral-500">
            Manage your Excel visualizations and create new insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Uploaded Files Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-lg shadow-lg flex flex-col"
          >
            <p className="text-4xl font-bold">{files?.length || 0}</p>
            <p className="text-lg mt-1">Uploaded Files</p>
          </motion.div>

          {/* Time Spent Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 rounded-lg shadow-lg"
          >
            <p className="text-4xl font-bold">
              {(() => {
                const totalSeconds = userInfo.user.totalTimeSpent;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                return `${hours}h ${minutes}m`;
              })()}
            </p>
            <p className="text-lg mt-1">Total Time Spent</p>
          </motion.div>
        </div>

        {/* Recent Files */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              Your Recent Files
            </h2>
            <Link
              to="/dashboard/excel"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              Upload New File
            </Link>
          </div>

          {isLoading ? (
            <motion.p
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              Loading...
            </motion.p>
          ) : files && files.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
              {files.map((file, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-100">
                      {file.originalName}
                    </p>
                    <p className="text-gray-500 text-sm dark:text-neutral-400">
                      Uploaded on{" "}
                      {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/viewfile/${file._id}`}
                    className="text-blue-500 dark:text-blue-200 hover:underline"
                  >
                    Preview
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-10 text-gray-500 dark:text-neutral-400"
            >
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
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
