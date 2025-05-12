import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminPrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo.user.role == "admin" ? <Outlet /> : null;
};

export default AdminPrivateRoutes;
