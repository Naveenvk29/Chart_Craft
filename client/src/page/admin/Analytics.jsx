import React, { useState } from "react";
import { useViewAnalyticsQuery } from "../../redux/api/adminApi";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { AnimatePresence, motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const Analytics = () => {
  const [period, setPeriod] = useState("week");
  const { data, isLoading, isError } = useViewAnalyticsQuery({ period });
  console.log(data);

  if (isLoading)
    return (
      <p className="text-neutral-700 dark:text-neutral-300">
        Loading analytics...
      </p>
    );
  if (isError)
    return (
      <p className="text-red-500 dark:text-red-300">
        Failed to load analytics.
      </p>
    );

  const uploadCountsByDate = data.recentUploads.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9CA3AF",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9CA3AF",
        },
      },
      y: {
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
  };

  const barData = {
    labels: Object.keys(uploadCountsByDate),
    datasets: [
      {
        label: "Uploads",
        data: Object.values(uploadCountsByDate),
        backgroundColor: "#4ADE80",
      },
    ],
  };

  const doughnutData = {
    labels: ["Admins", "Normal Users"],
    datasets: [
      {
        label: "User Roles",
        data: [data.admins, data.normalUsers],
        backgroundColor: ["#60A5FA", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  };

  const sessionLineData = {
    labels: data.userSessions.map((user) => user.username),
    datasets: [
      {
        label: "User Session Time (minutes)",
        data: data.userSessions.map((user) =>
          Math.round((user.totalTimeSpent || 0) / 60)
        ),
        fill: false,
        borderColor: "#6366F1",
        tension: 0.3,
      },
    ],
  };

  const combinedLineData = {
    labels: data.sessionTrends.map((item) => item.date),
    datasets: [
      {
        label: `Total Time Spent (${period})`,
        data: data.sessionTrends.map((item) =>
          Math.round((item.totalTimeSpent || 0) / 60)
        ),
        borderColor: "#EC4899",
        backgroundColor: "#FBCFE8",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 h-full max-w-7xl mx-auto text-neutral-700 dark:text-neutral-300">
      <motion.div
        className="mt-10 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold ">Analytics</h2>
        <p className=" text-neutral-500 ">
          Here you can view insights about user activity, file uploads, and
          session trends on the platform.
        </p>
      </motion.div>

      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center space-y-2"
          >
            <h3 className="font-bold">Total Users</h3>
            <p className="text-2xl">{data.totalUsers}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center space-y-2"
          >
            <h3 className="font-bold">Admins</h3>
            <p className="text-2xl">{data.admins}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-green-100 dark:bg-green-900 p-4 rounded text-center space-y-2"
          >
            <h3 className="font-bold">Excel Files</h3>
            <p className="text-2xl">{data.totalFiles}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-purple-100 dark:bg-purple-900 p-3 rounded text-center"
            variants={itemVariants}
          >
            <div className="font-semibold">Active Users</div>
            <div className="text-xl">{data.activeUsers ?? 0}</div>
          </motion.div>

          <motion.div
            className="bg-pink-100 dark:bg-pink-900 p-3 rounded text-center"
            variants={itemVariants}
          >
            <div className="font-semibold">Total Sessions</div>
            <div className="text-xl">{data.totalSessions ?? 0}</div>
          </motion.div>

          <motion.div
            className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded text-center"
            variants={itemVariants}
          >
            <div className="font-semibold">Avg. Session (min)</div>
            <div className="text-xl">
              {data?.averageSessionTime?.toFixed(2)} mins
            </div>
          </motion.div>

          <motion.div
            className="bg-red-100 dark:bg-red-900 p-3 rounded text-center"
            variants={itemVariants}
          >
            <div className="font-semibold">Most Active User</div>
            <div className="text-xl">
              {data.mostActiveUser?.username ?? "N/A"}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {/* Charts with animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Doughnut Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-neutral-800 px-5 py-8 mb-5 rounded shadow flex flex-col justify-center "
          style={{ height: "400px" }}
        >
          <h3 className="text-lg font-semibold mb-2">User Role Distribution</h3>
          <div className="relative h-full">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-neutral-800 px-5 py-8 mb-5 rounded shadow flex flex-col justify-center "
          style={{ height: "400px" }}
        >
          <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
          <div className="relative h-full">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Line Chart - Session Time (Individual) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-neutral-800 px-5 py-8 mb-5 rounded shadow flex flex-col justify-center "
          style={{ height: "400px" }}
        >
          <h3 className="text-lg font-semibold mb-2">
            User Session Time (Individual)
          </h3>
          <div className="relative h-full">
            <Line data={sessionLineData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Combined Session Time with Selector */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-neutral-800 px-5 py-8 mb-5 rounded shadow flex flex-col justify-center "
          style={{ height: "400px" }}
        >
          <div className="mb-6">
            <label htmlFor="period" className="mr-2 font-medium">
              View session trends by:
            </label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border px-2 py-1 rounded text-black dark:text-white dark:bg-neutral-700"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Combined Session Time by {period}
          </h3>
          <div className="relative  h-[300px]">
            <Bar data={combinedLineData} options={chartOptions} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
