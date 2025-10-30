import { FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import profileImg from "../assets/image.png";

const TopBar = () => {
  const location = useLocation();
  
  // Split path and filter empty segments
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-between px-6 bg-white py-3 h-[4rem] mb- shadow-sm border-b">
      {/* Breadcrumb Section */}
      <div className="flex items-center text-sm text-gray-500">
        <span>School Manager</span>
        

        {pathParts.map((part, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <span>Dashboard</span>
            <span className="mx-2 text-gray-400">/</span>
            <span
              className={`${
                index === pathParts.length - 1
                  ? "text-blue-600 font-medium hover:underline"
                  : ""
              } capitalize`}
            >
              {part}
            </span>
          </div>
        ))}
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-6">
        <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-600 w-48"
          />
        </div>

        <div className="relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        </div>

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
