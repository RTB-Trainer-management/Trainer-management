import { useState, useMemo } from "react";
import { FaRegEye, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetAllRecruitmentsQuery,
  useRespondToRecruitmentMutation,
} from "../redux/api/SchoolManagerSlice";


const Vacant = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const { data: recruitments = [], isLoading } = useGetAllRecruitmentsQuery();
  const [respondToRecruitment, { isLoading: isResponding }] = useRespondToRecruitmentMutation();

  const filteredData = useMemo(() => {
    if (activeTab === "All Posts") return recruitments;
    if (activeTab === "Pending") return recruitments.filter((item) => item.status === "pending");
    if (activeTab === "Approved") return recruitments.filter((item) => item.status === "approved");
    if (activeTab === "Rejected") return recruitments.filter((item) => item.status === "rejected");
    if (activeTab === "Appealed") {
      return recruitments.filter((item) => item.response_message && item.status === "pending");
    }
    return recruitments;
  }, [activeTab, recruitments]);

  const handleRespond = async (id, response) => {
    const response_message = window.prompt("Enter a message for this response:", "");
    if (response_message === null) return;

    try {
      await respondToRecruitment({ id, response, response_message }).unwrap();
      toast.success("Recruitment updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update recruitment");
    }
  };
  return (
    <div className="bg-gray-50 py-2 min-h-screen text-gray-800 w-full">
      {/* Header */}
      <div className="flex justify-between items-center gap-2 mb-4 ">
        {/* Title */}
        <div className="text-sm font-medium py-1.5 text-center rounded  bg-gray-200 text-gray-700 w-280">
          Vacant Posts
        </div>

        {/* Button */}
        <button className="bg-blue-500 text-white text-sm px-2 py-2  rounded-lg hover:bg-blue-600 transition mr-10">
          Post a Vacancy
        </button>
      </div>



      {/* Tabs and Year */}
      <div className="flex justify-between items-center text-gray-600 bg-white px-8 py-4 mt-3 rounded-md ">
        <div className="flex bg-gray-100 rounded-full ">
          {["Pending", "Approved", "Rejected", "Appealed", "All Posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${activeTab === tab
                  ? "bg-[#1D5FAD] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#1D5FAD]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="border rounded-md px-4 py-1 w-30 text-sm text-gray-600">
          Filter
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full overflow-x-auto px-10 rounded-2xl text-sm">
        <table className="min-w-full bg-white rounded-lg border-separate border-spacing-y-3 overflow-hidden ">
          <thead>
            {activeTab === "Pending" && (
              <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left ">
                <th className="py-3 px-3 font-medium">School Name</th>
                <th className="py-3 px-3 font-medium text-center">District</th>
                <th className="py-3 px-3 font-medium text-center">Trade</th>
                <th className="py-3 px-3 font-medium text-center">Qualification</th>
                <th className="py-3 px-3 font-medium text-center">Trainers</th>
                <th className="py-3 px-3 font-medium text-center">Position</th>
                <th className="py-3 px-3 font-medium text-center">View</th>
                <th className="py-3 px-3 font-medium text-center">Edit</th>
                <th className="py-3 px-3 font-medium text-center">Remove</th>
              </tr>
            )}
            {activeTab === "Approved" && (
              <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left ">
                <th className="py-3 px-3 font-medium">School Name</th>
                <th className="py-3 px-3 font-medium text-center">District</th>
                <th className="py-3 px-3 font-medium text-center">Trade</th>
                <th className="py-3 px-3 font-medium text-center">Qualification</th>
                <th className="py-3 px-3 font-medium text-center">Trainers</th>
                <th className="py-3 px-3 font-medium text-center">Position</th>
                <th className="py-3 px-3 font-medium text-center">View</th>
                <th className="py-3 px-3 font-medium text-center">Status</th>
              </tr>
            )}
            {activeTab === "Rejected" && (
              <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left mb-2">
                <th className="py-3 px-3 font-medium">School Name</th>
                <th className="py-3 px-3 font-medium text-center">District</th>
                <th className="py-3 px-3 font-medium text-center">Trade</th>
                <th className="py-3 px-3 font-medium text-center">Qualification</th>
                <th className="py-3 px-3 font-medium text-center">Trainers</th>
                <th className="py-3 px-3 font-medium text-center">Position</th>
                <th className="py-3 px-3 font-medium text-center">View</th>
                <th className="py-3 px-3 font-medium text-center">Appeal</th>

              </tr>
            )}
            {activeTab === "Appealed" && (
              <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left ">
                <th className="py-3 px-3 font-medium">School Name</th>
                <th className="py-3 px-3 font-medium text-center">District</th>
                <th className="py-3 px-3 font-medium text-center">Trade</th>
                <th className="py-3 px-3 font-medium text-center">Qualification</th>
                <th className="py-3 px-3 font-medium text-center">Trainers</th>
                <th className="py-3 px-3 font-medium text-center">Position</th>
                <th className="py-3 px-3 font-medium text-center">View</th>
                <th className="py-3 px-3 font-medium text-center">Appeal</th>
              </tr>
            )}

            {activeTab === "All Posts" && (
              <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left ">
                <th className="py-3 px-3 font-medium">School Name</th>
                <th className="py-3 px-3 font-medium text-center">District</th>
                <th className="py-3 px-3 font-medium text-center">Trade</th>
                <th className="py-3 px-3 font-medium text-center">Qualification</th>
                <th className="py-3 px-3 font-medium text-center">Trainers</th>
                <th className="py-3 px-3 font-medium text-center">Position</th>
                <th className="py-3 px-3 font-medium text-center">View</th>
              </tr>
            )}

          </thead>
          <tbody>
            {activeTab === "Approved" &&
              pendingData.map((item, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-[#F5F9FF]"} hover:bg-gray-200`}>
                  <td className="py-3 px-3">{item.ShoolName}</td>
                  <td className="py-3 px-3 text-center">{item.District}</td>
                  <td className="py-3 px-3 text-center">{item.Trade}</td>
                  <td className="py-3 px-3 text-center">{item.Qualifications}</td>
                  <td className="py-3 px-3 text-center">{item.Trainers}</td>
                  <td className="py-3 px-3 text-center">{item.Position}</td>
                  <td className="py-3 px-3 text-center"><FaRegEye className="mx-auto" /></td>

                </tr>
              ))}
            {isLoading ? (
              <tr>
                <td colSpan="9" className="py-6 text-center text-gray-500">Loading...</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-6 text-center text-gray-500">No records found</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-[#F5F9FF]"} hover:bg-gray-200`}>
                  <td className="py-3 px-3">{item.school_from}</td>
                  <td className="py-3 px-3 text-center">{item.district}</td>
                  <td className="py-3 px-3 text-center">{item.trade}</td>
                  <td className="py-3 px-3 text-center">{item.qualification}</td>
                  <td className="py-3 px-3 text-center">{item.trainer_name}</td>
                  <td className="py-3 px-3 text-center">{item.position}</td>
                  <td className="py-3 px-3 text-center"><FaRegEye className="mx-auto" /></td>
                  {activeTab === "Pending" && (
                    <>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleRespond(item.id, "approved")}
                          disabled={isResponding}
                          className="text-green-600 font-semibold"
                        >
                          Approve
                        </button>
                      </td>
                      <td className="py-3 px-3 text-center text-red-600">
                        <button
                          onClick={() => handleRespond(item.id, "rejected")}
                          disabled={isResponding}
                          className="font-semibold"
                        >
                          Reject
                        </button>
                      </td>
                    </>
                  )}
                  {activeTab === "Rejected" && (
                    <td className="py-3 px-3 text-center">
                      <FaToggleOff className="mx-auto text-[#1D5FAD]" />
                    </td>
                  )}
                  {activeTab === "Approved" && (
                    <td className="py-3 px-3 text-center">
                      <FaToggleOn className="mx-auto text-[#1D5FAD]" />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-20 space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-md text-sm font-medium transition ${num === 1
                ? "bg-[#1D5FAD] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#1D5FAD] hover:text-white"
              }`}
          >
            {num}
          </button>
        ))}
      </div>
      <footer className="mt-20">
        <div className="w-full h-0.25 bg-gray-300 mb-4"></div>
        {/* Verify All */}
        {/* <div className="flex justify-center mt-2 ">
        <button className="bg-[#ad1d1d] text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Remove All
        </button>
        
      </div> */}
      </footer>
    </div>

  );
};

export default Vacant;
