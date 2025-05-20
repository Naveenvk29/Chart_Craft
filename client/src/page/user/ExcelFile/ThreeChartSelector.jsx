import React, { useState } from "react";

const chartTypes = ["bar", "line", "pie"];

const ThreeChartSelector = ({ data = [] }) => {
  const [chartType, setChartType] = useState("bar");
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");

  const fields = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="w-full mt-20">
      <h2 className="text-center text-2xl font-semibold mb-6">
        3D Chart Visualization
      </h2>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
        <select value={xField} onChange={(e) => setXField(e.target.value)}>
          <option value="">Select X-Axis</option>
          {fields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select value={yField} onChange={(e) => setYField(e.target.value)}>
          <option value="">Select Y-Axis</option>
          {fields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThreeChartSelector;
