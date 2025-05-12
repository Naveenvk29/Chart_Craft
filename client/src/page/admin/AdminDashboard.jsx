import Header from "../../components/common/Header";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const AdminDashboard = () => {
  const navItems = [
    {
      path: "/admin",
      label: "Admin Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "user-management",
      label: "User Management",
      icon: LayoutDashboard,
    },
    {
      path: "role-management",
      label: "Role Management",
      icon: LayoutDashboard,
    },
    {
      path: "analytics",
      label: "Analytics",
      icon: LayoutDashboard,
    },
    {
      path: "user-activity",
      label: "User Activity",
      icon: LayoutDashboard,
    },
  ];

  const navLinkStyle = ({ isActive }) =>
    `flex items-center space-x-5
         px-4 py-2 rounded-lg transition-all duration-200 text-lg font-medium  ${
           isActive
             ? "bg-indigo-600 text-white"
             : "text-gray-700 hover:bg-indigo-100  "
         }`;
  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="flex flex-col w-64 p-4 transition-all duration-300 bg-white text-black shadow-md h-[55rem] ">
          <nav className="flex flex-col gap-2 mt-8 space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkStyle}
                >
                  <Icon size={24} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
