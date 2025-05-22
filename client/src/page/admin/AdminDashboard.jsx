import { Outlet, useNavigate } from "react-router-dom";
import {
  Activity,
  ChartColumnIcon,
  LayoutDashboard,
  LogOut,
  UserCog,
  UsersRound,
  ArrowLeftCircle,
} from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApi";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import bg from "../../assets/pp.jpg";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
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

  const bg = "";

  const navItems = [
    {
      path: "/admin",
      label: "Admin Dashboard",
      icon: (
        <LayoutDashboard className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: (
        <ChartColumnIcon className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/admin/user-activity",
      label: "User Activity",
      icon: (
        <Activity className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/admin/user-management",
      label: "User Management",
      icon: (
        <UserCog className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      path: "/admin/role-management",
      label: "Role Management",
      icon: (
        <UsersRound className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    // Back to user dashboard
    {
      label: "Back to User Dashboard",
      path: "/",
      icon: (
        <ArrowLeftCircle className="h-7 w-7 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <Sidebar
      title="Chart Craft"
      avatarUrl={bg || userInfo}
      userName={userInfo?.user?.username || "Admin"}
      links={navItems}
      logout={handleLogout}
    >
      <div className="w-full h-full">
        <Outlet />
      </div>
    </Sidebar>
  );
};

export default AdminDashboard;
