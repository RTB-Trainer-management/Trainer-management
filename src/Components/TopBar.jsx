import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import profileImg from "../assets/image.png"; // Replace with your image path

const TopBar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-sm border-b">
      {/* Breadcrumb Section */}
      <div className="flex items-center text-sm text-gray-500">
        <span>School Manager</span>
        <span className="mx-2 text-gray-400">/</span>
        <span>Dashboard</span>
        <span className="mx-2 text-gray-400">/</span>
        <span>Performance</span>
        <span className="mx-2 text-gray-400">/</span>
        <Link
          to="/view-performance"
          className="text-blue-600 font-medium hover:underline"
        >
          View Performance
        </Link>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-600 w-48"
          />
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        </div>

        {/* Profile Avatar */}
        <img
          src={profileImg}
          alt="User"
          className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TopBar;
