import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  FileBarChart,
  Settings,
  LucideUserSquare2,
} from "lucide-react";
import Sidebar from "../../../components/common/Sidebar";
import bg from "../../../assets/pp.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../redux/api/usersApi";
import { logout } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navItems = [
    {
      path: "/dashboard",
      label: "DashBoard",
      icon: (
        <LayoutDashboard className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/dashboard/excel",
      label: "ExcelFile",
      icon: (
        <FileBarChart className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/dashboard/history",
      label: "History",
      icon: (
        <Activity className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: (
        <Settings className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  if (userInfo?.user?.role === "admin") {
    navItems.push({
      path: "/admin",
      label: "Admin Dashboard",
      icon: (
        <LucideUserSquare2 className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    });
  }
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("👋 Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  return (
    <Sidebar
      title="Chart Craft"
      avatarUrl={userInfo.user.profilePic?.url || bg}
      userName={userInfo.user.username}
      links={navItems}
      logout={handleLogout}
    >
      <Outlet />
    </Sidebar>
  );
};

export default UserDashboard;
