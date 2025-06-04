import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BarChart3D from "../../../components/3dCharts/BarChart3D.jsx";
import DonutChart3D from "../../../components/3dCharts/DonutChart3D.jsx";
import PieChart3D from "../../../components/3dCharts/PieChart3D.jsx";
import { motion } from "motion/react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const chartTypes = ["bar", "pie", "donut"];
const ThreeChartSelector = ({ data }) => {
  const [chartType, setChartType] = useState("bar");
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");

  const dataFields = data.length > 0 ? Object.keys(data[0]) : [];
  const isReady = xField && yField;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="w-full mt-14 px-4 md:px-10"
    >
      <motion.h3
        className="text-xl font-semibold text-center mb-8"
        variants={fadeIn}
        custom={0.1}
      >
        3D Chart Visualization
      </motion.h3>
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-10"
        variants={fadeIn}
        custom={0.2}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Chart Type:</label>
          <select
            className="border rounded p-2 dark:bg-neutral-800"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {chartTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">X Field:</label>
          <select
            className="border rounded p-2 dark:bg-neutral-800"
            value={xField}
            onChange={(e) => setXField(e.target.value)}
          >
            <option value="">Select</option>
            {dataFields.map((field) => (
              <option key={field}>{field}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y Field:</label>
          <select
            className="border rounded p-2 dark:bg-neutral-800"
            value={yField}
            onChange={(e) => setYField(e.target.value)}
          >
            <option value="">Select</option>
            {dataFields.map((field) => (
              <option key={field}>{field}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {isReady && (
        <motion.div
          className=" rounded w-full h-[400px]  flex justify-center items-center"
          variants={fadeIn}
          custom={0.4}
        >
          <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {chartType === "bar" && (
              <BarChart3D data={data} xKey={xField} yKey={yField} />
            )}
            {/* {chartType === "line" && (
              <LineChart3D data={data} xKey={xField} yKey={yField} />
            )} */}
            {/* {chartType === "area" && (
              <AreaChart3D data={data} xKey={xField} yKey={yField} />
            )} */}
            {chartType === "pie" && (
              <PieChart3D data={data} xKey={xField} yKey={yField} />
            )}
            {chartType === "donut" && (
              <DonutChart3D data={data} xKey={xField} yKey={yField} />
            )}
            <OrbitControls />
          </Canvas>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThreeChartSelector;
