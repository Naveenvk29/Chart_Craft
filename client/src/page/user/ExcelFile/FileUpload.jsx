import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadExcelFileMutation } from "../../../redux/api/excelApi";
import { toast } from "react-toastify";
import ChartSelector from "./ChartSelector";
const Fileupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [uploadExcelFile, { isLoading, isSuccess, error }] =
    useUploadExcelFileMutation();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const HandleUpload = async () => {
    if (!selectedFile) {
      toast.arguments("No file selcted!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await uploadExcelFile(formData).unwrap();
      setExcelData(response.data);
      setSelectedFile(null);
      toast.success("File uploaded Successfull");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="w-full h-full  px-10 py-5">
      <h1 className="text-2xl font-bold tracking-tight">Upload Excel File</h1>
      <div className="max-w-5xl  mx-auto mt-16">
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
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button
            onClick={HandleUpload}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {isSuccess && <p className="mt-4 text-green-600">Upload successful!</p>}
        {error && <p className="mt-4 text-red-600">Error uploading file</p>}
      </div>
      {excelData.length > 0 && <ChartSelector data={excelData} />}
    </div>
  );
};

export default Fileupload;
