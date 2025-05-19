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

//user
import UserDashboard from "./page/user/dashboard/UserDashboard";
import UserPrivate from "./page/user/UserPrivate";
import ExcelFile from "./page/user/ExcelFile/ExcelFile";
import History from "./page/user/ExcelFile/History";
import ViewExcelFile from "./page/user/ExcelFile/ViewExcelFile";
import Settings from "./page/user/Settings/Settings";
import Dashboard from "./page/user/dashboard/Dashboard";

//
import AdminPrivateRoutes from "./page/admin/AdminPrivateRoutes";
import AdminDashboard from "./page/admin/AdminDashboard";
import DashBoard from "./page/admin/DashBoard";
import UserManagement from "./page/admin/UserManagement";
import Analytics from "./page/admin/Analytics";
import UserActivity from "./page/admin/UserActivity";
import RoleManagement from "./page/admin/RoleManagement";
const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={userInfo ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* Admin private routes */}
        <Route path="" element={<AdminPrivateRoutes />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DashBoard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="user-activity" element={<UserActivity />} />
            <Route path="role-management" element={<RoleManagement />} />
          </Route>
        </Route>

        <Route path="" element={<UserPrivate />}>
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Dashboard />} />
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
