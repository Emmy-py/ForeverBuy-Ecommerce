import { Routes, Route, NavLink, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets as shopAssets } from "../../assets/assets";
import { assets as adminAssets } from "../../assets/foreverBuy-assets/admin_assets/assets";
import Add from "./Add";
import List from "./List";
import AdminOrders from "./AdminOrders";

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const navItems = [
  { to: "/admin/add", icon: adminAssets.add_icon, label: "Add Items" },
  { to: "/admin/list", icon: adminAssets.order_icon, label: "List Items" },
  { to: "/admin/orders", icon: adminAssets.order_icon, label: "Orders" },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />

      {/* Admin navbar */}
      <div className="flex items-center py-2 px-[4%] justify-between border-b bg-white">
        <div className="flex flex-col">
          <img src={shopAssets.logo} alt="logo" className="w-[80px]" />
          <p className="text-[10px] tracking-widest text-pink-400 font-medium -mt-1 ml-0.5">
            ADMIN PANEL
          </p>
        </div>
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm transition-colors"
        >
          ← Back to Shop
        </Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[18%] min-h-screen border-r bg-white">
          <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
                    isActive
                      ? "bg-pink-100 border-pink-300 text-pink-700"
                      : "hover:bg-gray-50"
                  }`
                }
              >
                <img src={icon} alt="" className="w-5 h-5" />
                <p className="hidden md:block">{label}</p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 mx-8 my-8 text-gray-600 text-base">
          <Routes>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<AdminOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
