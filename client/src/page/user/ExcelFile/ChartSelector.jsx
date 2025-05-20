import { useState } from "react";
import { Bar, Line, Pie, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import html2canvas from "html2canvas";
import { motion } from "motion/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const ChartSelector = ({ data }) => {
  const [chartType, setChartType] = useState("bar");
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");

  const fields = data.length > 0 ? Object.keys(data[0]) : [];

  const generateRandomColors = (count) => {
    return Array.from(
      { length: count },
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, 
             ${Math.floor(Math.random() * 255)}, 
             ${Math.floor(Math.random() * 255)}, 0.6)`
    );
  };

  const values = data.map((item) => item[yField]);
  const labels = data.map((item) => item[xField]);
  const backgroundColors = generateRandomColors(values.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: yField,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
        fill: chartType !== "line",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // allow container to control height
    plugins: {
      legend: {
        labels: {
          color: "#fff", // for dark mode text
        },
      },
      background: {
        color: "#ffffff", // white canvas background
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "doughnut":
        return <Doughnut data={chartData} options={chartOptions} />;
      case "polarArea":
        return <PolarArea data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  const downloadImage = async (type = "png") => {
    const chartElement = document.getElementById("chart-container");
    const canvas = await html2canvas(chartElement);
    const link = document.createElement("a");
    link.download = `chart.${type}`;
    link.href = canvas.toDataURL(`image/${type}`);
    link.click();
  };

  return (
    <motion.div
      className="w-full mt-14 px-4 md:px-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.h2
        className="text-xl font-semibold text-center mb-8"
        variants={fadeIn}
        custom={0.1}
      >
        2D Chart Visualization
      </motion.h2>

      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-10"
        variants={fadeIn}
        custom={0.2}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded p-2 dark:bg-neutral-800"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">PolarArea</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">X-Axis:</label>
          <select
            value={xField}
            onChange={(e) => setXField(e.target.value)}
            className="border rounded p-2 dark:bg-neutral-800"
          >
            <option value="">Select X-axis</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y-Axis:</label>
          <select
            value={yField}
            onChange={(e) => setYField(e.target.value)}
            className="border rounded p-2 dark:bg-neutral-800"
          >
            <option value="">Select Y-axis</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {xField && yField && (
        <>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-end items-end mb-4"
            variants={fadeIn}
            custom={0.3}
          >
            <button
              onClick={() => downloadImage("png")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadImage("jpeg")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Download JPG
            </button>
          </motion.div>

          <motion.div
            id="chart-container"
            className="mt-6 w-full max-w-4xl mx-auto px-4 sm:px-6"
            variants={fadeIn}
            custom={0.4}
          >
            <div className="relative w-full h-[400px]">{renderChart()}</div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ChartSelector;
