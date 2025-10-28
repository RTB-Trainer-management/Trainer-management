import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

const Performance = () => {
  const [activeTab, setActiveTab] = useState("Rejected");

  const data = [
    { trainer: "John Doe", rate: "76%" },
    { trainer: "Vraiment Donc", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
    { trainer: "Uwimanimpaye Clarisse", rate: "76%" },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-800">
      <div className="bg-gray-200 py-5 text-center text-sm font-medium text-gray-700">
        Trainers’ Performance
      </div>

      <div className="flex justify-between items-center bg-white px-4 py-4 shadow-sm">
        <div className="flex space-x-2 bg-gray-100 rounded-full p-2">
          {["Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm hover:cursor-pointer rounded-full transition-all ${
                activeTab === tab
                  ? "bg-[#1D5FAD] text-white font-semibold"
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

      <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left">
              <th className="py-3 px-6 font-medium">Trainers</th>
              <th className="py-3 px-6 font-medium">Rate</th>
              <th className="py-3 px-6 font-medium text-center">View</th>
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
                <td className="py-3 px-6">{item.trainer}</td>
                <td className="py-3 px-6">{item.rate}</td>
                <td className="py-3 px-6 text-center">
                  <FaRegEye className="mx-auto text-gray-600 hover:text-[#1D5FAD] cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-md hover:cursor-pointer text-sm font-medium ${
              num === 1
                ? "bg-[#1D5FAD] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#1D5FAD] hover:text-white"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Performance;
