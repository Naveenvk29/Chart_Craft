import React from "react";
import {
  useFetchAllUserQuery,
  useFetchAllExcelFilesQuery,
  useViewAnalyticsQuery,
} from "../../redux/api/adminApi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { data: users } = useFetchAllUserQuery();
  const { data: excelFiles } = useFetchAllExcelFilesQuery();
  const { data: analytics } = useViewAnalyticsQuery({ period: "week" });

  const barData = {
    labels: analytics?.sessionTrends?.map((t) => t.date) || [],
    datasets: [
      {
        label: "Time Spent (minutes)",
        data:
          analytics?.sessionTrends?.map((t) =>
            Math.round((t.totalTimeSpent || 0) / 60)
          ) || [],
        backgroundColor: "#3b82f6",
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        data: [analytics?.admins || 0, analytics?.normalUsers || 0],
        backgroundColor: ["#10b981", "#f59e0b"],
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} mins`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-neutral-50 text-neutral-800 dark:text-neutral-300 dark:bg-neutral-900  p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Admin Dashboard
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold mb-4">System Overview</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{users?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Excel Files</p>
              <p className="text-2xl font-bold">{excelFiles?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users (5m)</p>
              <p className="text-2xl font-bold">
                {analytics?.activeUsers || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Session Time</p>
              <p className="text-2xl font-bold">
                {analytics?.averageSessionTime?.toFixed(2)} mins
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow h-[500px]"
          >
            <h3 className="text-lg font-semibold mb-2">User Time Trends</h3>
            <Bar data={barData} options={option} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow h-[500px]"
          >
            <h3 className="text-lg font-semibold mb-2">
              User Roles Distribution
            </h3>
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              className=" md:p-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
