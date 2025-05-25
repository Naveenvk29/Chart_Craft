import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/homeComponets/NavBar";
import FooterSecction from "./components/homeComponets/FooterSecction";
import useSessionTracker from "./page/user/useSessionTracker";
import { useSelector } from "react-redux";

const App = () => {
  const location = useLocation();
  const publicPaths = ["/", "/login", "/signup", "/send-mail"];
  const showLayout = publicPaths.includes(location.pathname);
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.user?._id || userInfo?._id;
  useSessionTracker(userId);

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
