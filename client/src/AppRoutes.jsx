// router/AppRouter.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import App from "./App";
import LoginPage from "./page/Auth/LoginPage";
import SignUp from "./page/Auth/SignUp";
import Home from "./page/Home/Home";
import UserDashboardLayout from "./page/user/dashboard/UserDashboardLayout";
import UserPrivate from "./page/user/UserPrivate";
import ExcelFile from "./page/user/ExcelFile/ExcelFile";
import History from "./page/user/ExcelFile/History";
import ViewExcelFile from "./page/user/ExcelFile/ViewExcelFile";
import Settings from "./page/user/Settings/Settings";

const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route
          path="/"
          element={userInfo ? <Navigate to="/dashboard" /> : <Home />}
        />

        <Route path="" element={<UserPrivate />}>
          <Route path="/dashboard" element={<UserDashboardLayout />}>
            <Route path="excel" element={<ExcelFile />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
            <Route path="viewfile/:id" element={<ViewExcelFile />} />
          </Route>
        </Route>

        {/* Public auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
