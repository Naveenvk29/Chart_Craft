import { useFetchAllUserExcelFilesQuery } from "../../../redux/api/excelApi";

import moment from "moment";

const History = () => {
  const { data, error, isLoading } = useFetchAllUserExcelFilesQuery();

  return (
    <div className="w-full h-full bg-white text-black py-5 px-8">
      <h2 className="text-2xl font-bold">History</h2>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading files.</p>}
        {data && data.length === 0 && <p>No files found.</p>}
        {data &&
          data.map((file, index) => {
            const formattedDate = moment(file.uploadedAt).format(
              "MMMM D, YYYY, h:mm A"
            );

            return (
              <div key={index} className="my-2 p-2 border rounded">
                <h3 className="font-semibold">{file.originalName}</h3>
                <p className="text-sm text-gray-600">Date: {formattedDate}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
