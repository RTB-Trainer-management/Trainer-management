import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { FiToggleRight } from "react-icons/fi";

const Performance = () => {
  const [activeTab, setActiveTab] = useState("Unverified");

  const data = [
    { trainer: "Vraiment Donc😂", rate: "76%" },
    { trainer: "Vraiment Donc😂", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="bg-gray-200 py-4 text-center text-sm font-medium text-gray-700">
        Trainers’ Performance
      </div>

      {/* Tabs and Year */}
      <div className="flex justify-between items-center bg-white px-4 py-4 mt-3 rounded-md shadow-sm">
        <div className="flex bg-gray-100 rounded-full p-1">
          {["Pending", "Unverified"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === tab
                  ? "bg-[#1D5FAD] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#1D5FAD]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="border rounded-md px-4 py-1 text-sm text-gray-700">
          2021 - 2022
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left">
              <th className="py-3 px-6 font-medium">
                <input type="text" className="mr-0 accent-[#1D5FAD]" />
                Trainers
              </th>
              <th className="py-3 px-6 font-medium">Rate</th>
              <th className="py-3 px-6 font-medium text-center">View</th>
              <th className="py-3 px-6 font-medium text-center">Edit</th>
              <th className="py-3 px-6 font-medium text-center">Verify</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-[#F5F9FF]"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="py-3 px-6">
                  <input type="text" className="mr-0 accent-[#1D5FAD]" />
                  {item.trainer}
                </td>
                <td className="py-3 px-6">{item.rate}</td>
                <td className="py-3 px-6 text-center">
                  <FaRegEye className="mx-auto text-gray-600 hover:text-[#1D5FAD] cursor-pointer" />
                </td>
                <td className="py-3 px-6 text-center">
                  <FaPen className="mx-auto text-gray-600 hover:text-[#1D5FAD] cursor-pointer" />
                </td>
                <td className="py-3 px-6 text-center">
                  <FiToggleRight className="mx-auto text-[#1D5FAD] text-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-md text-sm font-medium transition ${
              num === 1
                ? "bg-[#1D5FAD] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#1D5FAD] hover:text-white"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Verify All */}
      <div className="flex justify-center mt-6">
        <button className="bg-[#1D5FAD] text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Verify All
        </button>
      </div>
    </div>
  );
};

export default Performance;
