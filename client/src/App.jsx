import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/homeComponets/NavBar";
import FooterSecction from "./components/homeComponets/FooterSecction";

const App = () => {
  const location = useLocation();
  const publicPaths = ["/", "/login", "/signup"];
  const showLayout = publicPaths.includes(location.pathname);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-950 min-h-screen">
      <ToastContainer />
      {showLayout && <NavBar />}
      <main>
        <Outlet />
      </main>
      {showLayout && <FooterSecction />}
    </div>
  );
};

export default App;
