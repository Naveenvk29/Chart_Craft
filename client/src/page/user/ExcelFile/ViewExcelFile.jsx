import { useFetchExcelFileByIdQuery } from "../../../redux/api/excelApi";
import { useParams } from "react-router-dom";
import ChartSelector from "./ChartSelector";
import { motion } from "framer-motion";
import ThreeChartSelector from "./threeChartSelector";
import SmartAnalytics from "./SmartAnalytics";

const ViewExcelFile = () => {
  const { id } = useParams();
  const { data: fileData, error, isLoading } = useFetchExcelFileByIdQuery(id);

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-red-500 text-center mt-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Error fetching Excel file
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full  bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 px-5 sm:px-10 py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-7xl mx-auto mt-20">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          View Excel File
        </motion.h1>

        <motion.h2
          className="text-xl text-neutral-500 mb-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {fileData.originalName}
        </motion.h2>
      </div>
      {fileData.data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ChartSelector data={fileData.data} />
          <ThreeChartSelector data={fileData.data} />
          <SmartAnalytics data={fileData.data} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ViewExcelFile;
