// MyPerformance.jsx
import { useState } from "react";
import { FaPen, FaRegEye, FaTimes } from "react-icons/fa";
import { useEditPerformanceMutation, useGetUsersPerformanceQuery } from "../../redux/api/SchoolManagerSlice";
import { useSelector } from "react-redux";

const MyPerformance = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [step, setStep] = useState(1);
  const [addScores, setAddScores] = useState({});
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedPerformance, setSelectedPerformance] = useState();

  const { user } = useSelector((state) => state.auth);

  const performanceCriteria = [
    "Preparation T/L materials",
    "Provide scheme of work",
    "Deliver Teachings to students",
    "Students evaluated and marks",
  ];

  const backendFieldMap = {
    "Preparation T/L materials": "prep_materials",
    "Provide scheme of work": "scheme_of_work",
    "Deliver Teachings to students": "delivery_techniques",
    "Students evaluated and marks": "students",
  };

  const { data: performance, refetch: refetchPerformance } = useGetUsersPerformanceQuery(user?.id);
  const [createPerformance] = useEditPerformanceMutation();
  
  const filteredData = performance?.results?.filter(
    (item) => activeTab === "All" || item.status === activeTab
  ) || [];

  const handleView = (item) => {
    setSelectedTrainer(item);
    setOpenView(true);
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
    return avg.toFixed(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
      case "Approved":
        return "text-green-600 bg-green-100";
      case "rejected":
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const handleSaveNewPerformance = async () => {
    if (!isStepValid(addScores)) return;

    const mappedPayload = {
      trainerId: user?.id,
      rate: calculateTotal(addScores) + "%",
      status: "pending",
      academic_year: Number(selectedYear),
      prep_materials: Number(addScores["Preparation T/L materials"]),
      scheme_of_work: Number(addScores["Provide scheme of work"]),
      delivery_techniques: Number(addScores["Deliver Teachings to students"]),
      students: Number(addScores["Students evaluated and marks"]),
    };

    await createPerformance(mappedPayload).unwrap();
    refetchPerformance();

    setOpenAdd(false);
    setAddScores({});
    setSelectedYear("2025");
    setStep(1);
  };

  return (
    <>
      {!openView && !openEdit && !openAdd && (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6 text-center">
            <h2 className="text-xl font-bold text-[#1D5FAD]">My Performance</h2>
          </div>

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

          <div className="mt-6 mx-6 bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left text-sm font-semibold">
                  <th className="py-4 px-6">Rate</th>
                  <th className="py-4 px-6 text-center">Academic Year</th>
                  <th className="py-4 px-6 text-center">View</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-t  text-sm hover:bg-blue-50">
                    <td className="py-4 px-6 font-medium text-gray-800">{item?.rate}</td>
                    <td className="py-4 px-6 text-center text-gray-800">{item?.academic_year}</td>
                    <td className="py-4 px-6 text-center">
                      <FaRegEye
                        onClick={() => handleView(item)}
                        className="mx-auto text-xl text-gray-500 hover:text-[#1D5FAD] cursor-pointer"
                      />
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          item?.status
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

        </div>
      )}

      {openView && selectedTrainer && (
        <div className="fixed text-gray-800 inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Performance Details</h3>
              <button onClick={() => setOpenView(false)}>
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                <div>
                  <h4 className="text-sm text-gray-600 mb-2">Rate</h4>
                  <p className="text-lg font-semibold">{selectedTrainer?.rate}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-600 mb-2">Academic Year</h4>
                  <p className="text-lg font-semibold">{selectedTrainer?.academic_year}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedTrainer.status
                  )}`}
                >
                  {selectedTrainer.status}
                </span>
              </div>
            </div>

            <div className="border-t px-6 py-4 text-right">
              <button
                onClick={() => setOpenView(false)}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {openAdd && (
        <div className="fixed inset-0 z-50 flex text-gray-800 items-center justify-center bg-black/60 overflow-y-auto p-10 pt-[6rem]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">

            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-lg font-bold">Add New Performance</h3>
              <button onClick={() => setOpenAdd(false)}>
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            <div className="px-10 py-4">
              <label className="block text-sm font-medium mb-2">Academic Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>

            <div className="flex items-center justify-center my-8">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-[#1D5FAD] text-white" : "bg-gray-300"}`}>1</div>
                <div className={`w-32 h-1 ${step >= 2 ? "bg-[#1D5FAD]" : "bg-gray-300"}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-[#1D5FAD] text-white" : "bg-gray-300"}`}>2</div>
              </div>
            </div>

            {[1, 2].map((s) => (
              <div key={s} className={step === s ? "block" : "hidden"}>
                <div className="px-10 pb-8">
                  <div className="flex justify-between mb-6">
                    <h4 className="font-bold text-[#1D5FAD]">Performance Criteria</h4>
                    <h4 className="font-bold text-[#1D5FAD]">Score (0–100)</h4>
                  </div>

                  {performanceCriteria.map((criteria) => (
                    <div key={criteria} className="flex justify-between items-center mb-5">
                      <div className="bg-gray-100 px-6 py-3 rounded-xl w-80 font-medium">
                        {criteria}
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={addScores[criteria] || ""}
                        onChange={(e) => handleAddScoreChange(criteria, e.target.value)}
                        className="w-20 h-12 text-center border rounded-xl"
                      />
                    </div>
                  ))}

                  <div className="text-center mt-8">
                    <span className="bg-[#1D5FAD] text-white px-6 py-3 rounded-full text-lg font-bold">
                      {calculateTotal(addScores)}%
                    </span>
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    {s === 2 && (
                      <button
                        onClick={() => setStep(1)}
                        className="px-8 cursor-pointer py-2.5 border rounded-lg"
                      >
                        Previous
                      </button>
                    )}

                    {s === 1 ? (
                      <button
                        onClick={() => setStep(2)}
                        disabled={!isStepValid(addScores)}
                        className={`px-8 py-2.5 cursor-pointer rounded-lg ${
                          isStepValid(addScores)
                            ? "bg-[#1D5FAD] text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveNewPerformance}
                        disabled={!isStepValid(addScores)}
                        className={`px-8 py-2.5 cursor-pointer rounded-lg ${
                          isStepValid(addScores)
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-500"
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
    </>
  );
};

export default MyPerformance;
