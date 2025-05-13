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
import html2canvas from "html2canvas";

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
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} />;
      case "line":
        return <Line data={chartData} />;
      case "pie":
        return <Pie data={chartData} />;
      case "doughnut":
        return <Doughnut data={chartData} />;
      case "polarArea":
        return <PolarArea data={chartData} />;
      default:
        return <Bar data={chartData} />;
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
    <div className="w-full mt-14 ">
      <h1>2d graph</h1>
      <div className="flex justify-center items-center space-x-10 mb-10">
        <div className="space-x-2">
          <label>Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className=""
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">PolarArea</option>
          </select>
        </div>
        <div className="space-x-2">
          <label>X-Axis:</label>
          <select value={xField} onChange={(e) => setXField(e.target.value)}>
            <option value="">Select X-axis</option>
            {fields.map((field) => (
              <option key={field} value={field} className="">
                {field}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <label>Y-Axis:</label>
          <select value={yField} onChange={(e) => setYField(e.target.value)}>
            <option value="">Select Y-axis</option>
            {fields.map((field) => (
              <option key={field} value={field} className="">
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>
      {xField && yField && (
        <>
          <div className="mt-4 flex gap-4 justify-end ">
            <button
              onClick={() => downloadImage("png")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadImage("jpeg")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download JPG
            </button>
          </div>
          <div id="chart-container" className="mt-6 h-160 flex justify-center ">
            {renderChart()}
          </div>
        </>
      )}
    </div>
  );
};

export default ChartSelector;
