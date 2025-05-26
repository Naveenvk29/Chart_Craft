import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const chartTypes = ["bar"]; // For now, just 'bar'

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

      {/* <div ref={mountRef} className="relative  h-[400px] bg-gray-100 " /> */}
    </div>
  );
};

export default ThreeChartSelector;
