import { useState } from "react";
import { FaPen, FaRegEye } from "react-icons/fa";

const Performance = () => {
  const [activeTab, setActiveTab] = useState("Rejected");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [nextAllowed, setNextAllowed] = useState(false);

  const data = [
    { trainer: "John Doe", rate: "76%", status: "Rejected", message: "You have not uploaded your national ID transcript" },
    { trainer: "Vraiment Donc", rate: "76%", status: "Rejected", message: "Incomplete academic credentials" },
  ];

  const handleView = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenView(true);
  };

  const handleOpenEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenEdit(true);
  }

  const handleOpenExibitedBehavior = () => {

  }
 
  return (
    <div>
      {openView || openEdit ? (
        <div className="fixed inset-0 flex items-center overflow-scroll-x justify-center bg-black/50 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[700px]">
            {/* Header */}
            <div className="bg-[#1D5FAD] text-white font-semibold text-center py-3 rounded-t-lg">
              {openEdit ? "Performance Edit" : "Trainers Performance Information"}
            </div>

            {openView && <>
              {/* Body */}
            <div className="flex justify-between p-6 text-gray-800">
              {/* Left */}
              <div className="w-[45%] border-r pr-4">
                <h3 className="text-sm font-medium mb-2">Feedback Information</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Vacant post status:{" "}
                  <span className="text-red-500 font-semibold">{selectedTrainer.status}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Rejection Message:</strong> {selectedTrainer.message}
                </p>
              </div>

              {/* Right */}
              <div className="w-[50%] pl-4">
                <h3 className="text-sm font-medium mb-2">Appealing Information</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Description: I have reached the minimum reference in my classes so if you may reconsider my
                  request please.
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appeal Response</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="3"
                  placeholder="Enter response..."
                ></textarea>
                <button className="mt-3 px-5 py-2 bg-[#1D5FAD] cursor-pointer text-white rounded-md text-sm hover:bg-blue-700 transition">
                  Respond
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t mr-5 p-3">
              <button
                onClick={() => {setOpenView(false) || setOpenEdit(false)}}
                className="text-gray-500 cursor-pointer hover:text-red-600 transition text-sm font-medium"
              >
                ✕ Close
              </button>
            </div>
            </>}

            {openEdit && 
            <>
              <div className="flex justify-center my-[3rem] items-center space-x-1">
            <div className="bg-[#1D5FAD] rounded-full w-8 hover:bg-white hover:text-gray-800 cursor-pointer pt-1 pl-3 font-semibold  h-8">1</div>
              <div className="h-[5px] rounded-xl w-40 bg-[#1D5FAD]"></div>
              <div className="h-[5px] rounded-xl w-40 bg-gray-300"></div>
              <div className="hover:bg-[#1D5FAD] rounded-full w-8 text-gray-800 hover:text-white cursor-pointer pt-1 pl-3 font-semibold  h-8">2</div>
            </div>
            <div className="flex justify-center items-center space-x-20">
            <div className="flex mr-[2rem] items-center block space-x-2">
                <span className="text-[#1D5FAD] font-semibold text-sm">
                  Expected Results
                </span>
              </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-semibold text-sm">
                Exhibited Behaviour
              </span>
            </div>
            </div>
            <div className="grid my-[3rem]">
              <div className="flex w-[100%] justify-between">
                <div className="ml-[10rem]">
                  <h3 className="text-[#1D5FAD]">Title</h3>
                </div>
                <div className="text-center mr-[10rem]">
                  <h3 className="text-[#1D5FAD]">Score</h3>
                </div>
              </div>

              {[0,1,2,3].map(() => (
                <div className="flex w-[100%]  my-[1rem] justify-between">
                <div className="ml-[10rem] text-gray-800 w-[20rem] py-2 rounded-xl h-[4rem] bg-gray-300 px-[5rem]">
                  Preparation T/L materials
                </div>
                <input type="text" className="text-center w-[50px] h-[3rem] border border-gray-800 rounded-xl bg-blue mr-[10rem]" />
              </div>
              ))}
            </div>

            <div>
              <button onClick={handleOpenExibitedBehavior} className={`${nextAllowed ? "text-white":"text-black"}`}>
                Next
              </button>
            </div>
            </>
            }
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 min-h-screen text-gray-800">
          {/* Header */}
          <div className="bg-gray-200 py-5 text-center text-sm font-medium text-gray-700">
            Trainers’ Performance
          </div>

          {/* Tabs */}
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
            <div className="border rounded-md px-4 py-1 text-sm text-gray-700">2021 - 2022</div>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left">
                  <th className="py-3 px-6 font-medium">Trainers</th>
                  <th className="py-3 px-6 font-medium">Rate</th>
                  <th className="py-3 px-6 font-medium text-center">View</th>
                  <th className="py-3 px-6 font-medium text-center">Edit</th>
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
                      <FaRegEye
                        onClick={() => handleView(item)}
                        className="mx-auto text-gray-600 hover:text-[#1D5FAD] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <FaPen
                        onClick={() => handleOpenEdit(item)}
                        className="mx-auto text-gray-600 hover:text-[#1D5FAD] cursor-pointer"
                      />
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
      )}
    </div>
  );
};

export default Performance;
