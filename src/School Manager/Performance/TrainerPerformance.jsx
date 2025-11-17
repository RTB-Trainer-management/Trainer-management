// Performance.jsx
import { useState } from "react";
import { FaPen, FaRegEye, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useEditPerformanceMutation,
  useGetAllPerformancesQuery,
  useGetAllTrainersQuery,
  useRespondToPerformanceMutation,
} from "../../redux/api/SchoolManagerSlice";

const TrainerPerformance = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState({});
  const [appealResponse, setAppealResponse] = useState("");
  const [responseDecision, setResponseDecision] = useState("approve");

  const {
    data: fetchedPerformance = [],
    isLoading,
    isError,
    error,
  } = useGetAllPerformancesQuery();

  const { data: managers = [] } = useGetAllTrainersQuery();
  const [respondToPerformance, { isLoading: isResponding }] = useRespondToPerformanceMutation();
  const [editPerformance, { isLoading: isSavingEdit }] = useEditPerformanceMutation();

  const performance = fetchedPerformance;

  const getTrainerName = (trainerId) => {
    const trainer = managers.find((m) => m.id === trainerId);
    return trainer ? `${trainer.first_name} ${trainer.last_name}` : `Trainer ID: ${trainerId}`;
  };

  const performanceCriteria = [
    { label: "Preparation T/L materials", field: "prep_materials" },
    { label: "Provide scheme of work", field: "scheme_of_work" },
    { label: "Deliver Teachings to students", field: "delivery_techniques" },
    { label: "Students evaluated and marks", field: "students" },
  ];

  const handleView = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenView(true);
  };

  const handleOpenEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenEdit(true);
    setStep(1);
    setScores({});
  };

  const handleScoreChange = (criteriaField, value) => {
    setScores((prev) => ({ ...prev, [criteriaField]: value }));
  };

  const isStep1Valid = () => {
    return performanceCriteria.every(
      ({ field }) =>
        scores[field] !== undefined &&
        scores[field] !== "" &&
        parseInt(scores[field], 10) >= 0 &&
        parseInt(scores[field], 10) <= 100
    );
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid()) {
      setStep(2);
    }
  };

  const calculateTotal = () => {
    const total = performanceCriteria.reduce(
      (sum, { field }) => sum + (parseInt(scores[field], 10) || 0),
      0
    );
    const avg = performanceCriteria.length > 0 ? total / performanceCriteria.length : 0;
    return avg.toFixed(2);
  };

  const handleResponseSubmission = async (e) => {
    e.preventDefault();
    if (!selectedTrainer) return;

    try {
      await respondToPerformance({
        trainerId: selectedTrainer.trainer_id,
        response_message: appealResponse,
        response: responseDecision === "approve" ? "yes" : "no",
      }).unwrap();
      toast.success("Response submitted");
      setAppealResponse("");
      setOpenView(false);
    } catch (mutationError) {
      toast.error(mutationError?.data?.message || "Failed to submit response");
    }
  };

  // Filter by tab — now safe because performance is always an array
  const filteredPerformance = performance.filter((item) => {
    const status = item.status.toLowerCase();
    if (activeTab === "Pending") return status === "pending";
    if (activeTab === "Approved") return status === "approved";
    if (activeTab === "Rejected") return status === "rejected";
    return true;
  });

  return (
    <>
      {!openView && !openEdit && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gray-300 py-6 text-center">
            <h2 className="text-xl font-bold text-[#1D5FAD]">Trainers’ Performance</h2>
          </div>

          {/* Tabs + Year filter */}
          <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="flex bg-gray-100 rounded-full p-1">
              {["Pending", "Approved", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab
                    ? "bg-[#1D5FAD] text-white shadow-md"
                    : "text-gray-600 hover:text-[#1D5FAD]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700">
              2021 - 2022
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 mx-6 text-center py-10">
              <p className="text-gray-600">Loading performances...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="mt-6 mx-6 text-center py-10">
              <p className="text-red-600">
                Error: {error?.data?.message || "Failed to load performances"}
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <div className="mt-6 mx-6 bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left text-sm font-semibold">
                    <th className="py-4 px-6">Trainers</th>
                    <th className="py-4 px-6">Rate</th>
                    <th className="py-4 px-6 text-center">View</th>
                    <th className="py-4 px-6 text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPerformance.length > 0 ? (
                    filteredPerformance.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-t text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#F8FAFF]"
                          } hover:bg-blue-50 transition-colors`}
                      >
                        <td className="py-4 px-6 font-medium text-gray-800">
                          {getTrainerName(item?.trainer_id)}
                        </td>
                        <td className="py-4 px-6 text-gray-700">{item?.rate ?? 0}%</td>
                        <td className="py-4 px-6 text-center">
                          <FaRegEye
                            onClick={() => handleView(item)}
                            className="mx-auto text-xl text-gray-500 hover:text-[#1D5FAD] cursor-pointer transition"
                          />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <FaPen
                            onClick={() => handleOpenEdit(item)}
                            className="mx-auto text-lg text-gray-500 hover:text-[#1D5FAD] cursor-pointer transition"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">
                        No {activeTab.toLowerCase()} performances found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2 pb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 rounded-xl cursor-pointer text-sm font-medium transition-all ${num === 1
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

      {/* ---------- VIEW MODAL ---------- */}
      {openView && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Trainers Performance Information</h3>
              <button onClick={() => setOpenView(false)} className="text-white hover:text-gray-200 transition">
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            <div className="p-6 flex gap-6 font-semibold text-gray-800">
              <div className="flex-1 border-r border-gray-500 pr-6">
                <h4 className="font-semibold text-gray-700 mb-3">Feedback Information</h4>
                <div className="bg-gray-500 w-[5rem] h-1 mb-3 rounded-3xl"></div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-blue-600 font-bold">
                    {selectedTrainer.status.charAt(0).toUpperCase() + selectedTrainer.status.slice(1)}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">Rejection Message:</span>{" "}
                  {selectedTrainer.rejection_message || "N/A"}
                </p>
              </div>

              <div className="flex-1 pl-2">
                <h4 className="font-semibold text-gray-700 mb-3">Appealing Information</h4>
                <div className="bg-gray-500 w-[5rem] h-1 mb-3 rounded-3xl"></div>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  <strong>Description:</strong> I have reached the minimum reference in my classes so if you may
                  reconsider my request please.
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appeal Response
                </label>
                <form onSubmit={handleResponseSubmission}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Decision</label>
                  <select
                    value={responseDecision}
                    onChange={(e) => setResponseDecision(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-[#1D5FAD]"
                  >
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                  <textarea
                    value={appealResponse}
                    onChange={(e) => setAppealResponse(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent outline-none resize-none text-sm"
                    placeholder="Enter your response..."
                    required
                  />
                  <button
                    type="submit"
                    disabled={isResponding}
                    className="mt-4 cursor-pointer w-full bg-[#1D5FAD] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-60"
                  >
                    {isResponding ? "Sending..." : "Respond"}
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t px-6 py-3 mb-5 text-right">
              <button
                onClick={() => setOpenView(false)}
                className="text-red-600 cursor-pointer hover:text-red-800 font-medium text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- EDIT MODAL ---------- */}
      {openEdit && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
            <div className="bg-[#1D5FAD] text-white py-4 px-6 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-lg font-bold">Performance Edit</h3>
              <button onClick={() => setOpenEdit(false)} className="text-white hover:text-gray-200 transition">
                <FaTimes className="text-xl cursor-pointer" />
              </button>
            </div>

            <div className="flex items-center justify-center my-8 px-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? "bg-[#1D5FAD] text-white" : "bg-gray-300 text-gray-600"
                    }`}
                >
                  1
                </div>
                <div className={`w-32 h-1 ${step >= 1 ? "bg-[#1D5FAD]" : "bg-gray-300"}`} />
                <div className={`w-32 h-1 ${step >= 2 ? "bg-[#1D5FAD]" : "bg-gray-300"}`} />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? "bg-[#1D5FAD] text-white" : "bg-gray-300 text-gray-600"
                    }`}
                >
                  2
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-16 text-sm font-semibold mb-6">
              <span className={step === 1 ? "text-[#1D5FAD]" : "text-gray-400"}>Expected Results</span>
              <span className={step === 2 ? "text-[#1D5FAD]" : "text-gray-400"}>Exhibited Behaviour</span>
            </div>

            {step === 1 && (
              <div className="px-10 pb-8">
                <div className="flex justify-between mb-6">
                  <h4 className="text-[#1D5FAD] font-bold">Title</h4>
                  <h4 className="text-[#1D5FAD] font-bold mr-12">Score</h4>
                </div>

                {performanceCriteria.map(({ label, field }) => (
                  <div key={field} className="flex justify-between items-center mb-5">
                    <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl w-80 text-sm font-medium">
                      {label}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores[field] || ""}
                      onChange={(e) => handleScoreChange(field, e.target.value)}
                      className="w-20 h-12 text-center border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent outline-none font-medium"
                      placeholder="0"
                    />
                  </div>
                ))}

                <div className="mt-8 text-center">
                  <span className="bg-[#1D5FAD] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                    {calculateTotal()}%
                  </span>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleNext}
                    disabled={!isStep1Valid()}
                    className={`px-8 py-2.5 rounded-lg font-medium transition-all ${isStep1Valid()
                      ? "bg-[#1D5FAD] cursor-pointer text-white hover:bg-blue-700 shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="px-10 pb-8">
                <div className="flex justify-between mb-6">
                  <h4 className="text-[#1D5FAD] font-bold">Title</h4>
                  <h4 className="text-[#1D5FAD] font-bold mr-12">Score</h4>
                </div>

                {performanceCriteria.map(({ label, field }) => (
                  <div key={field} className="flex justify-between items-center mb-5">
                    <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl w-80 text-sm font-medium">
                      {label}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores[field] || ""}
                      onChange={(e) => handleScoreChange(field, e.target.value)}
                      className="w-20 h-12 text-center border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent outline-none font-medium"
                      placeholder="0"
                    />
                  </div>
                ))}

                <div className="mt-8 text-center">
                  <span className="bg-[#1D5FAD] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                    {calculateTotal()}%
                  </span>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={async () => {
                      if (!selectedTrainer) return;
                      try {
                        await editPerformance({
                          performanceId: selectedTrainer.id,
                          ...performanceCriteria.reduce(
                            (acc, { field }) => ({
                              ...acc,
                              [field]: Number(scores[field]) || 0,
                            }),
                            {}
                          ),
                        }).unwrap();
                        toast.success("Performance updated");
                        setOpenEdit(false);
                      } catch (mutationError) {
                        toast.error(mutationError?.data?.message || "Failed to save performance");
                      }
                    }}
                    disabled={isSavingEdit}
                    className="px-8 py-2.5 rounded-lg font-medium bg-[#1D5FAD] text-white hover:bg-blue-700 shadow-md transition-all disabled:opacity-60"
                  >
                    {isSavingEdit ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TrainerPerformance;