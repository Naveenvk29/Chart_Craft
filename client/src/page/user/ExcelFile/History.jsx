import { useFetchAllUserExcelFilesQuery } from "../../../redux/api/excelApi";
import { useRemoveExcelFileMutation } from "../../../redux/api/excelApi";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";

const History = () => {
  const { data, error, isLoading } = useFetchAllUserExcelFilesQuery();

  const [removeExcelFile] = useRemoveExcelFileMutation();

  const handleDelete = async (id) => {
    try {
      await removeExcelFile(id).unwrap();
      toast.success("Successfully deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the file.");
    }
  };

  return (
    <div className="w-full h-full bg-white text-black py-5 px-8">
      <h2 className="text-2xl font-bold">History</h2>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading files.</p>}
        {data && data.length === 0 && <p>No files found.</p>}
        {data &&
          data.map((file) => {
            const formattedDate = moment(file.uploadedAt).format(
              "MMMM D, YYYY, h:mm A"
            );

            return (
              <div
                key={file._id}
                className="my-2 p-2 border rounded flex items-center justify-between"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold">{file.originalName}</h3>
                  <p className="text-sm text-gray-600">Date: {formattedDate}</p>
                </div>
                <div className="space-x-3">
                  <button>
                    <Link to={`/dashboard/viewfile/${file._id}`}>View</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
