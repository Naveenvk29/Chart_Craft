import { useFetchExcelFileByIdQuery } from "../../../redux/api/excelApi";
import { useParams } from "react-router-dom";
import ChartSelector from "./ChartSelector";
import ThreeChartSelector from "./threeChartSelector";
const ViewExcelFile = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const { data: fileData, error, isLoading } = useFetchExcelFileByIdQuery(id); // Fetch the Excel file data by id
  console.log(fileData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Excel file</div>;
  }

  return (
    <div className="bg-white text-black w-full h-full">
      <h1>View Excel File</h1>
      <h2>{fileData.originalName}</h2>
      {fileData.data.length > 0 && <ChartSelector data={fileData.data} />}
      {fileData.data.length > 0 && <ThreeChartSelector data={fileData.data} />}
    </div>
  );
};

export default ViewExcelFile;
