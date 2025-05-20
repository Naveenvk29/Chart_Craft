import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion"; // ✅ Already imported
import { UploadIcon } from "lucide-react";
import cn from "../../../libs/utils";
import { toast } from "react-toastify";
import { useUploadExcelFileMutation } from "../../../redux/api/excelApi";
import ChartSelector from "./ChartSelector";
import ThreeChartSelector from "./threeChartSelector";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [isPreviewed, setIsPreviewed] = useState(false);
  const fileInputRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [uploadExcelFile, { isLoading }] = useUploadExcelFileMutation();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setExcelData([]);
      setIsPreviewed(false);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    setMousePosition({ x, y });
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    onDropRejected: () => toast.error("File rejected!"),
  });

  const handlePreview = async () => {
    if (!selectedFile) {
      toast.error("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("save", "false");

    try {
      const response = await uploadExcelFile(formData).unwrap();
      setExcelData(response.data);
      setIsPreviewed(true);
      toast.success("Preview ready. Choose to save or discard.");
    } catch (err) {
      console.error("Preview failed:", err);
      toast.error("Preview failed.");
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("save", "true");

    try {
      await uploadExcelFile(formData).unwrap();
      toast.success("File saved to database!");
      setExcelData([]);
      setSelectedFile(null);
      setIsPreviewed(false);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save file.");
    }
  };

  const handleCancel = () => {
    setExcelData([]);
    setSelectedFile(null);
    setIsPreviewed(false);
    toast.info("Upload discarded.");
  };

  return (
    <motion.div
      className="w-full  bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 px-5 sm:px-10 py-5"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold tracking-tight md:mt-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          Upload Excel File
        </motion.h1>

        <motion.p
          className="mt-2 text-sm text-neutral-500 dark:text-neutral-400"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          Please upload a valid Excel file (.xlsx or .xls) to continue.
        </motion.p>

        <motion.div
          {...getRootProps()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Upload Area */}
          <motion.div
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.01 }}
            className="p-10 group cursor-pointer w-full relative overflow-hidden rounded-lg border border-dashed dark:border-neutral-100 border-blue-300 my-5"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => onDrop(Array.from(e.target.files || []))}
            />
            <div className="flex flex-col justify-center items-center">
              <p className="relative z-20 font-bold text-neutral-700 dark:text-neutral-300 text-base">
                {selectedFile ? selectedFile.name : "Upload File"}
              </p>
              <p className="relative z-20 text-neutral-500 text-base mt-3">
                Drag or drop your file here or click to upload
              </p>

              <motion.div
                className="relative w-full mt-10 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {!selectedFile ? (
                  <motion.div
                    style={{
                      x: mousePosition.x * 0.1,
                      y: mousePosition.y * 0.1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={cn(
                      "relative z-40 max-w-[8rem] mx-auto h-32 rounded-md",
                      "flex items-center justify-center shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                      "bg-neutral-100 dark:bg-neutral-800 group-hover:shadow-2xl"
                    )}
                  >
                    {isDragActive ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-neutral-600 flex flex-col items-center"
                      >
                        Drop it
                        <UploadIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                      </motion.p>
                    ) : (
                      <UploadIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    className={cn(
                      "relative z-40 p-4 mt-4 w-full mx-auto rounded-md shadow-md",
                      "bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                        {selectedFile.name}
                      </motion.p>
                      <motion.p className="rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-blue-300 shadow-input">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 w-full text-sm text-neutral-600 dark:text-neutral-400">
                      <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                        {selectedFile.type}
                      </motion.p>
                      <motion.p>
                        Uploaded{" "}
                        {new Date(
                          selectedFile.lastModified
                        ).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Buttons */}
          {selectedFile && !isPreviewed && (
            <motion.div
              className="flex justify-center mt-6 space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handlePreview}
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-white rounded ${
                  isLoading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLoading ? "Uploading..." : "Upload & Preview"}
              </motion.button>
            </motion.div>
          )}

          {excelData.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <ChartSelector data={excelData} />
              <ThreeChartSelector data={excelData} />
              <div className="flex justify-center mt-6 space-x-6">
                <motion.button
                  onClick={handleSave}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save to Database
                </motion.button>
                <motion.button
                  onClick={handleCancel}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileUpload;
