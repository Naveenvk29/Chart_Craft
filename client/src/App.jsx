import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/homeComponets/NavBar";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
