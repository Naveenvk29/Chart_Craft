import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadExcelFileMutation } from "../../../redux/api/excelApi";
import { toast } from "react-toastify";
import ChartSelector from "./ChartSelector";
import ThreeChartSelector from "./threeChartSelector";

const Fileupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [isPreviewed, setIsPreviewed] = useState(false);

  const [uploadExcelFile, { isLoading }] = useUploadExcelFileMutation();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setExcelData([]);
    setIsPreviewed(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Preview only (save=false)
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

  // Final Save (save=true)
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
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save file.");
    }
  };

  // Cancel preview
  const handleCancel = () => {
    setExcelData([]);
    setSelectedFile(null);
    setIsPreviewed(false);
    toast.info("Upload discarded.");
  };

  return (
    <div className="w-full h-full px-10 py-5">
      <h1 className="text-2xl font-bold tracking-tight">Upload Excel File</h1>
      <div className="max-w-5xl mx-auto mt-16">
        <div
          {...getRootProps()}
          className="h-48 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-b-md cursor-pointer mb-4"
        >
          <input {...getInputProps()} />
          <p>
            {selectedFile
              ? selectedFile.name
              : "Drag & drop or click to browse"}
          </p>
        </div>
        <div className="flex justify-center space-x-8">
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Browse File
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setExcelData([]);
              setIsPreviewed(false);
            }}
          />
          <button
            onClick={handlePreview}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload & Preview"}
          </button>
        </div>
      </div>

      {excelData.length > 0 && (
        <>
          <ChartSelector data={excelData} />
          <ThreeChartSelector data={excelData} />

          <div className="flex justify-center mt-6 space-x-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save to Database
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Fileupload;
