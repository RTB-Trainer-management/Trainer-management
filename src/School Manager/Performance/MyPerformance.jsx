// MyPerformance.jsx
import { useState } from "react";
import { FaPen, FaRegEye, FaTimes } from "react-icons/fa";
import NewPerformanceForm from "./Components/NewPerformanceForm";

const MyPerformance = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // New: Add modal
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState({});
  const [addScores, setAddScores] = useState({}); // For new performance
  const [selectedYear, setSelectedYear] = useState("2025"); // Default year

  // Initial data (mutable for demo)
  const [data, setData] = useState([
    {
      expectedResults: "58/70",
      exhibitedBehaviour: "18/30",
      total: "76%",
      year: "2021",
      status: "Rejected",
    },
    {
      expectedResults: "58/70",
      exhibitedBehaviour: "18/30",
      total: "76%",
      year: "2020",
      status: "Rejected",
    },
    {
      expectedResults: "58/70",
      exhibitedBehaviour: "18/30",
      total: "76%",
      year: "2019",
      status: "Rejected",
    },
    {
      expectedResults: "58/70",
      exhibitedBehaviour: "18/30",
      total: "76%",
      year: "2018",
      status: "Approved",
    },
  ]);

  const performanceCriteria = [
    "Preparation T/L materials",
    "Provide scheme of work",
    "Deliver Teachings to students",
    "Students evaluated and marks",
  ];

  const filteredData = data.filter(
    (item) => activeTab === "All" || item.status === activeTab
  );

  const handleView = (item) => {
    setSelectedTrainer(item);
    setOpenView(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedTrainer(item);
    setOpenEdit(true);
    setStep(1);
    setScores({});
  };

  const handleScoreChange = (criteria, value) => {
    setScores((prev) => ({ ...prev, [criteria]: value }));
  };

  const handleAddScoreChange = (criteria, value) => {
    setAddScores((prev) => ({ ...prev, [criteria]: value }));
  };

  const isStepValid = (scoresObj) => {
    return performanceCriteria.every(
      (c) => scoresObj[c] && parseInt(scoresObj[c], 10) >= 0 && parseInt(scoresObj[c], 10) <= 100
    );
  };

  const calculateTotal = (scoresObj) => {
    const total = performanceCriteria.reduce(
      (sum, c) => sum + (parseInt(scoresObj[c], 10) || 0),
      0
    );
    const avg = performanceCriteria.length > 0 ? total / performanceCriteria.length : 0;
    return avg.toFixed(0); // e.g., 76%
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const handleSaveNewPerformance = () => {
    if (!isStepValid(addScores)) return;

    const expected = performanceCriteria.reduce((sum, c) => sum + parseInt(addScores[c], 10), 0);
    const exhibited = expected; // For simplicity; can be separate in future
    const total = calculateTotal(addScores);

    const newEntry = {
      expectedResults: `${expected}/70`,
      exhibitedBehaviour: `${exhibited}/30`,
      total: `${total}%`,
      year: selectedYear,
      status: "Pending", // or auto-approve based on score
    };

    setData([newEntry, ...data]); // Add to top
    setOpenAdd(false);
    setAddScores({});
    setSelectedYear("2025");
    setStep(1);
  };

  return (
    <>
      {/* ========== MAIN LIST ========== */}
      {!openView && !openEdit && !openAdd && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6 text-center">
            <h2 className="text-xl font-bold text-[#1D5FAD]">My Performance</h2>
          </div>

          {/* Tabs + New Performance Button */}
          <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="flex bg-gray-100 rounded-full p-1">
              {["All", "Approved", "Rejected", "Pending"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-[#1D5FAD] text-white shadow-md"
                      : "text-gray-600 hover:text-[#1D5FAD]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpenAdd(true)}
              className="bg-[#1D5FAD] cursor-pointer text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-blue-700 transition shadow-md"
            >
              New Performance
            </button>
          </div>

          {/* Table */}
          <div className="mt-6 mx-6 bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left text-sm font-semibold">
                  <th className="py-4 px-6">Expected Results</th>
                  <th className="py-4 px-6">Exhibited Behaviour</th>
                  <th className="py-4 px-6 text-center">Total</th>
                  <th className="py-4 px-6 text-center">Academic Year</th>
                  <th className="py-4 px-6 text-center">View</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F8FAFF]"
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">
                      {item.expectedResults}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{item.exhibitedBehaviour}</td>
                    <td className="py-4 px-6 text-center text-gray-700 font-medium">
                      {item.total}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 font-semibold">
                      {item.year}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FaRegEye
                        onClick={() => handleView(item)}
                        className="mx-auto text-xl text-gray-500 hover:text-[#1D5FAD] cursor-pointer transition"
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
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

      {/* ========== VIEW MODAL ========== */}
      {openView && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Performance Details</h3>
              <button onClick={() => setOpenView(false)}>
                <FaTimes className="cursor-pointer text-xl" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Expected Results</h4>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedTrainer.expectedResults}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Exhibited Behaviour</h4>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedTrainer.exhibitedBehaviour}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Total Score</h4>
                  <p className="text-xl font-bold text-[#1D5FAD]">{selectedTrainer.total}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Academic Year</h4>
                  <p className="text-lg font-semibold text-gray-800">{selectedTrainer.year}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedTrainer.status
                  )}`}
                >
                  {selectedTrainer.status} - {selectedTrainer.year}
                </span>
              </div>
            </div>

            <div className="border-t px-6 py-4 text-right space-x-3">
              <button
                onClick={() => {
                  setOpenView(false);
                  setOpenEdit(true);
                }}
                className="px-4 py-2 cursor-pointer border border-[#1D5FAD] text-[#1D5FAD] rounded-lg hover:bg-[#1D5FAD] hover:text-white transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => setOpenView(false)}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== ADD NEW PERFORMANCE MODAL ========== */}
      {openAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4 pt-[10rem]  overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
            {/* Header */}
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-lg font-bold">Add New Performance</h3>
              <button onClick={() => setOpenAdd(false)}>
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            {/* Year Selector */}
            <div className="px-10 py-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full text-gray-800 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center my-8 px-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= 1 ? "bg-[#1D5FAD] text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div className={`w-32 h-1 ${step >= 2 ? "bg-[#1D5FAD]" : "bg-gray-300"}`} />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= 2 ? "bg-[#1D5FAD] text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-16 text-sm font-semibold mb-6">
              <span className={step === 1 ? "text-[#1D5FAD]" : "text-gray-400"}>
                Expected Results
              </span>
              <span className={step === 2 ? "text-[#1D5FAD]" : "text-gray-400"}>
                Exhibited Behaviour
              </span>
            </div>

            {/* Step 1 & 2 */}
            {[1, 2].map((s) => (
              <div key={s} className={step === s ? "block" : "hidden"}>
                <div className="px-10 pb-8">
                  <div className="flex justify-between mb-6">
                    <h4 className="text-[#1D5FAD] font-bold">Performance Criteria</h4>
                    <h4 className="text-[#1D5FAD] font-bold">Score (0-100)</h4>
                  </div>

                  {performanceCriteria.map((criteria) => (
                    <div key={criteria} className="flex justify-between items-center mb-5">
                      <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl w-80 text-sm font-medium">
                        {criteria}
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={addScores[criteria] || ""}
                        onChange={(e) => handleAddScoreChange(criteria, e.target.value)}
                        className="w-20 h-12 text-center border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent outline-none font-medium"
                        placeholder="0"
                      />
                    </div>
                  ))}

                  <div className="mt-8 text-center">
                    <span className="bg-[#1D5FAD] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                      {calculateTotal(addScores)}%
                    </span>
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    {s === 2 && (
                      <button
                        onClick={() => setStep(1)}
                        className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                      >
                        Previous
                      </button>
                    )}
                    {s === 1 ? (
                      <button
                        onClick={() => setStep(2)}
                        disabled={!isStepValid(addScores)}
                        className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                          isStepValid(addScores)
                            ? "bg-[#1D5FAD] text-white hover:bg-blue-700 shadow-md"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveNewPerformance}
                        disabled={!isStepValid(addScores)}
                        className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                          isStepValid(addScores)
                            ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Save Performance
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* inside the main component */}
     {openAdd && openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <NewPerformanceForm
            onSave={(newEntry) => {
              setData((prev) => [newEntry, ...prev]);   // add to table
              setOpenAdd(false);
            }}
            onCancel={() => setOpenAdd(false)}
          />
        </div>
      )}
    </>
  );
};

export default MyPerformance;