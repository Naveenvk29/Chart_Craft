import { useViewAnalyticsQuery } from "../../redux/api/adminApi";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Analytics = () => {
  const { data, isLoading, isError } = useViewAnalyticsQuery();

  if (isLoading) return <p>Loading analytics...</p>;
  if (isError) return <p>Failed to load analytics.</p>;

  // Format upload data by date
  const uploadCountsByDate = data.recentUploads.reduce((acc, item) => {
    const date = new Date(item.uploadedAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

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

  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded text-center space-y-2">
          <h3 className="font-bold">Total Users</h3>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center space-y-2">
          <h3 className="font-bold">Admins</h3>
          <p className="text-2xl">{data.admins}</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center space-y-2">
          <h3 className="font-bold">Excel Files</h3>
          <p className="text-2xl">{data.totalFiles}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-32">
        <div className="bg-white p-4 rounded shadow ">
          <h3 className="text-lg font-semibold mb-2">User Role Distribution</h3>
          <div className="h-120">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow ">
          <h3 className="text-lg font-semibold mb-2">Recent Uploads Per Day</h3>
          <div className="h-120">
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
