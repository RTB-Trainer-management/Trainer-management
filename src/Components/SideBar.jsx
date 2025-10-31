import { useState } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { TbListDetails } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePerformance } from "../redux/Features/authSlice"; // Adjust path
import RtbImage from "../assets/rtb.png";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed((c) => !c);
  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleNavUpdate = (to, performanceValue) => {
    dispatch(updatePerformance({ newPerformance: performanceValue }));
    localStorage.setItem("nav_performance", performanceValue);
    navigate('/performance');
  };

  return (
    <aside
      className={`h-screen bg-gray-200 text-gray-600 shadow-md flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-[20rem]"
      }`}
    >
      <div className="flex justify-center mt-12 items-center py-6 border-b border-gray-300">
        <img
          src={RtbImage}
          alt="RTB Logo"
          className={`transition-all duration-300 ${collapsed ? "h-10" : "h-20"}`}
        />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        <NavItem to="/" icon={<FaHome size={22} />} label="Home" collapsed={collapsed} />

        <CollapsibleItem
          title="Recruitments"
          icon={<FaUsersViewfinder size={22} />}
          collapsed={collapsed}
          isOpen={openMenu === "recruitment"}
          toggle={() => toggleMenu("recruitment")}
          items={[
            { to: "/recruitments/transfers", label: "Transfers" },
            { to: "/recruitments/trainers", label: "Trainers" },
            { to: "/recruitments/vacant-posts", label: "Vacant Posts" }
          ]}
        />

        <CollapsibleItem
          title="Performance"
          icon={<GoGraph size={22} />}
          collapsed={collapsed}
          isOpen={openMenu === "performance"}
          toggle={() => toggleMenu("performance")}
          items={[
            { to: "", label: "Performance", comp: "performance" },
            { to: "", label: "Promotion", comp: "promotion" },
            { to: "", label: "My Performance", comp: "my-performance" },
          ]}
          onSubItemClick={handleNavUpdate}
        />

        <CollapsibleItem
          title="Payments"
          icon={<FaFileInvoiceDollar size={22} />}
          collapsed={collapsed}
          isOpen={openMenu === "payment"}
          toggle={() => toggleMenu("payment")}
          items={[
            { to: "/payment/invoices", label: "Invoices" },
            { to: "/payment/history", label: "Payment History" },
          ]}
        />
      </nav>

      <div className="px-4 pb-6 border-t border-gray-300">
        <button className="w-full flex cursor-pointer items-center gap-3 py-3 px-2 rounded-md hover:bg-gray-300 transition-colors">
          <FaSignOutAlt className="text-gray-700" size={22} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {collapsed ? <IoIosArrowForward size={18} /> : <IoIosArrowDown size={18} />}
      </button> */}
    </aside>
  );
};

const NavItem = ({ to, icon, label, collapsed }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 py-3 px-3 rounded-md text-gray-700 hover:bg-gray-300 transition-all ${
      collapsed ? "justify-center" : ""
    }`}
  >
    {icon}
    {!collapsed && <span className="font-medium">{label}</span>}
  </Link>
);

const CollapsibleItem = ({ title, icon, collapsed, isOpen, toggle, items, onSubItemClick }) => (
  <div>
    <button
      onClick={toggle}
      className={`w-full hover:cursor-pointer flex items-center justify-between gap-3 py-3 px-3 rounded-md hover:bg-gray-300 transition-all ${
        collapsed ? "justify-center" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span className="font-medium">{title}</span>}
      </div>
      {!collapsed && (
        <span className="text-gray-600">
          {isOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
        </span>
      )}
    </button>

    {!collapsed && isOpen && (
      <div className="ml-8 mt-1 space-y-1">
        {items.map((item, index) => (
          <SubItem
            key={index}
            to={item.to}
            label={item.label}
            comp={item.comp}
            onClick={onSubItemClick}
          />
        ))}
      </div>
    )}
  </div>
);

const SubItem = ({ to, label, comp, onClick }) => {
  const handleClick = () => {
    if (onClick && comp) {
      onClick(to, comp);
    } else {
      window.location.href = to;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-gray-200 text-gray-700 transition-colors text-left"
    >
      <TbListDetails size={18} />
      <span>{label}</span>
    </button>
  );
};

export default SideBar;