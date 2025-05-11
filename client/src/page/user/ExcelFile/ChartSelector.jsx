import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
      default:
        return <Bar data={chartData} />;
    }
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

      {/* //todo add download option like in pnng jpg */}

      {xField && yField ? (
        <div className="mt-6  ">{renderChart()}</div>
      ) : (
        <p>Please select both X and Y axes.</p>
      )}
    </div>
  );
};

export default ChartSelector;
