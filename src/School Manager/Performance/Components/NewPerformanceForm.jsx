// NewPerformanceForm.jsx   (pure JavaScript – .jsx)
import { useState } from "react";

const performanceCriteria = [
  "Preparation T/L materials",
  "Provide scheme of work",
  "Deliver Teachings to students",
  "Students evaluated and marks",
];

export default function NewPerformanceForm({ onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [scores, setScores] = useState({});

  // ---------- helpers ----------
  const updateScore = (criterion, value) => {
    setScores((prev) => ({ ...prev, [criterion]: value }));
  };

  const isStepValid = () => {
    return performanceCriteria.every(
      (c) => scores[c] && parseInt(scores[c], 10) >= 0 && parseInt(scores[c], 10) <= 100
    );
  };

  const totalPercent = () => {
    const sum = performanceCriteria.reduce(
      (s, c) => s + (parseInt(scores[c], 10) || 0),
      0
    );
    return performanceCriteria.length ? Math.round(sum / performanceCriteria.length) : 0;
  };

  const handleSave = () => {
    if (!isStepValid()) return;

    const payload = {
      year,
      expectedResults: `${performanceCriteria.reduce(
        (s, c) => s + parseInt(scores[c], 10),
        0
      )}/70`,
      exhibitedBehaviour: `${performanceCriteria.reduce(
        (s, c) => s + parseInt(scores[c], 10),
        0
      )}/30`,
      total: `${totalPercent()}%`,
      status: totalPercent() >= 75 ? "Approved" : "Pending", // you can change the rule
    };

    onSave(payload);
  };

  // ---------- render ----------
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1D5FAD]">Add New Performance</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          Close
        </button>
      </div>

      {/* Year selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Academic Year
        </label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D5FAD] outline-none"
        >
          {[2025, 2024, 2023, 2022, 2021].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
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

      {/* ----- Step Content ----- */}
      <div className="space-y-6">
        {/* Both steps use the same fields – we just show one at a time */}
        {[1, 2].map((s) => (
          <div key={s} className={step === s ? "block" : "hidden"}>
            <div className="flex justify-between mb-4">
              <h4 className="text-[#1D5FAD] font-bold">Performance Criteria</h4>
              <h4 className="text-[#1D5FAD] font-bold">Score (0-100)</h4>
            </div>

            {performanceCriteria.map((c) => (
              <div
                key={c}
                className="flex justify-between items-center mb-4"
              >
                <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl w-80 text-sm font-medium">
                  {c}
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scores[c] || ""}
                  onChange={(e) => updateScore(c, e.target.value)}
                  className="w-20 h-12 text-center border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#1D5FAD] outline-none font-medium"
                  placeholder="0"
                />
              </div>
            ))}

            {/* Live total */}
            <div className="text-center mt-6">
              <span className="bg-[#1D5FAD] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                {totalPercent()}%
              </span>
            </div>

            {/* Navigation */}
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
                  disabled={!isStepValid()}
                  className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                    isStepValid()
                      ? "bg-[#1D5FAD] text-white hover:bg-blue-700 shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={!isStepValid()}
                  className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                    isStepValid()
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save Performance
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}