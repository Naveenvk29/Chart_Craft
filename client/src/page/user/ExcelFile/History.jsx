import {
  useFetchAllUserExcelFilesQuery,
  useRemoveExcelFileMutation,
} from "../../../redux/api/excelApi";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Filter } from "lucide-react";
import { useState, useMemo } from "react";

const History = () => {
  const { data, error, isLoading } = useFetchAllUserExcelFilesQuery();
  const [removeExcelFile] = useRemoveExcelFileMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    try {
      await removeExcelFile(id).unwrap();
      toast.success("Successfully deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the file.");
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((file) =>
      file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <motion.div
      className="w-full h-full bg-neutral-50 dark:bg-neutral-900 py-5 px-4 sm:px-6 lg:px-8 text-neutral-700 dark:text-neutral-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto mt-10">
        <div className="mb-6 space-y-2">
          <motion.h2
            className="text-2xl font-bold  flex items-center gap-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Filter className="w-6 h-6 text-blue-500" />
            History
          </motion.h2>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500"
          >
            Here you can view and manage your uploaded Excel files. Use the
            search box to quickly find files by name.
          </motion.p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full "
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        )}

        {error && (
          <motion.p
            className="text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Error loading files.
          </motion.p>
        )}

        {!isLoading && filteredData.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No files found.
          </motion.p>
        )}

        <AnimatePresence>
          {filteredData.map((file, index) => {
            const formattedDate = moment(file.uploadedAt).format(
              "MMMM D, YYYY, h:mm A"
            );

            return (
              <motion.div
                key={file._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="my-3 p-4 border border-gray-200 rounded-md shadow-sm flex flex-col  sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition"
              >
                <div className=" space-y-3">
                  <h3 className="font-semibold text-lg">{file.originalName}</h3>
                  <p className="text-sm text-neutral-500">
                    Uploaded: {formattedDate}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/dashboard/viewfile/${file._id}`}
                    className="text-green-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default History;
