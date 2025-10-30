// Promotion.jsx (JavaScript)
import { useState } from "react";
import { FaRegEye, FaTimes } from "react-icons/fa";

const Promotion = () => {
  const [openView, setOpenView] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const data = [
    {
      trainer: "Uwimimana Clarisse",
      rate: "76%",
      levels: 5,
      promotionHistory: [
        { year: 2021, level: "10.II", years: 4, status: "Rejected", performance: "80%" },
        { year: 2020, level: "10.II", years: 4, status: "Rejected", performance: "80%" },
        { year: 2019, level: "10.II", years: 4, status: "Rejected", performance: "80%" },
      ],
    },
    // Add more trainers if needed
  ];

  const handleView = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenView(true);
  };

  return (
    <>
      {/* Main List */}
      {!openView && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gray-300 py-6 text-center">
            <h2 className="text-xl font-bold text-[#1D5FAD]">Promotion</h2>
          </div>

          {/* Table */}
          <div className="mt-6 mx-6 bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left text-sm font-semibold">
                  <th className="py-4 px-6">Trainers</th>
                  <th className="py-4 px-6">Rate</th>
                  <th className="py-4 px-6 text-center">Years in Level</th>
                  <th className="py-4 px-6 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F8FAFF]"
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">{item.trainer}</td>
                    <td className="py-4 px-6 text-gray-700">{item.rate}</td>
                    <td className="py-4 px-6 text-center text-gray-700">{item.levels}</td>
                    <td className="py-4 px-6 text-center">
                      <FaRegEye
                        onClick={() => handleView(item)}
                        className="mx-auto text-xl text-gray-500 hover:text-[#1D5FAD] cursor-pointer transition"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2 pb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 rounded-xl cursor-pointer text-sm font-medium transition-all ${
                  num === 1
                    ? "bg-[#1D5FAD] text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-[#1D5FAD] hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* View Modal - Timeline Design */}
      {openView && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center">
              <h3 className="text-lg mx-auto font-bold">Promotion View</h3>
              <button
                onClick={() => setOpenView(false)}
                className="text-white hover:text-gray-200 transition"
              >
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            {/* Body - Timeline */}
            <div className="p-8">
              <div className="flex ml-[7.4rem] w-[45rem] items-center justify-between text-sm font-semibold text-[#1D5FAD] mb-6">
                <span>Level</span>
                <span>Years</span>
                <span>Status</span>
                <span>Performance</span>
              </div>

              <div className="relative">
                {selectedTrainer.promotionHistory.map((entry, index) => (
                  <div key={index} className="flex items-center mb-6 relative">
                    {/* Year Label */}
                    <div className="w-16 text-center">
                      <span className="inline-block px-3 py-1 bg-[#1D5FAD] text-white text-sm font-bold rounded-full">
                        {entry.year}
                      </span>
                    </div>

                    {/* Dotted Line */}
                    {index < selectedTrainer.promotionHistory.length - 1 && (
                      <div className="absolute left-6 top-10 w-0.5 h-16 bg-gray-400 border-dashed border-l-2 border-gray-400"></div>
                    )}

                    {/* Data Row */}
                    <div className="flex-1 flex justify-between items-center ml-8 bg-gray-50 px-6 py-3 rounded-xl shadow-sm">
                      <span className="text-gray-800 font-medium">{entry.level}</span>
                      <span className="text-gray-700">{entry.years}</span>
                      <span className="text-blue-600 font-semibold">{entry.status}</span>
                      <span className="text-gray-800 font-bold">{entry.performance}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trainer Summary */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-center text-gray-700">
                  <span className="font-semibold text-[#1D5FAD]">{selectedTrainer.trainer}</span> has been at{" "}
                  <span className="font-bold">Level 10.II</span> for <span className="font-bold">5 years</span>.
                  Current performance rate: <span className="font-bold text-[#1D5FAD]">{selectedTrainer.rate}</span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 text-right">
              <button
                onClick={() => setOpenView(false)}
                className="text-red-600 mb-[0.5rem] cursor-pointer hover:text-red-800 font-medium text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Promotion;