import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { FiToggleRight } from "react-icons/fi";

const Trainers = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const pendingData = [
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" }
  ];
    const approvedData = [
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" }
  ];

    const appointedData = [
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" }
  ];
      const certificateData = [
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" },
    { ShoolName: "Rwanda Coding Academy", District: "Nyabihu", Trade: "Culinary Arts", Qualifications: "A0", Trainers: "2", Position: "Matron" }
  ];
const data =
  activeTab === "Pending" ? pendingData : activeTab === "Approved"? approvedData: activeTab === "Appointed"? appointedData: activeTab === "Certificate Updates"? certificateData : pendingData;


  return (
    <div className="bg-gray-50 py-2 min-h-screen text-gray-600 w-full">
      {/* Header */}
<div className="flex justify-between items-center gap-2 mb-4 ">
  {/* Title */}
  <div className="text-sm font-medium py-2 text-center rounded  bg-gray-200 text-gray-700 w-full">
    List of Trainers
  </div>

  {/* Button */}

</div>



      {/* Tabs and Year */}
      <div className="flex justify-between items-center bg-white text-gray-600 px-8 py-4 mt-3 rounded-md ">
        <div className="flex bg-gray-100 rounded-full ">
          {["Pending", "Approved","Appointed","Certificate updates"].map((tab) => (
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

        <div className="border rounded-md px-4 py-1 w-30 text-sm text-gray-700">
          Filter 
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full overflow-x-auto px-10 text-sm">
        <table className="min-w-full bg-white rounded-lg border-separate border-spacing-y-3 overflow-hidden ">
<thead>
  {activeTab === "Pending" && (
    <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left mb-2">
      <th className="py-3 px-3 font-medium">Name</th>
      <th className="py-3 px-3 font-medium text-center">District</th>
      <th className="py-3 px-3 font-medium text-center">Trade</th>
      <th className="py-3 px-3 font-medium text-center">Certificate</th>
      <th className="py-3 px-3 font-medium text-center">Gender</th>
      <th className="py-3 px-3 font-medium text-center">Level</th>
      <th className="py-3 px-3 font-medium text-center">View</th>
      <th className="py-3 px-3 font-medium text-center">Edit</th>
      <th className="py-3 px-3 font-medium text-center">Approve</th>
      <th className="py-3 px-3 font-medium text-center text-red-600">Reject</th>
    </tr>
  )}

  {activeTab === "Approved" && (
    <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left mb-2">
      <th className="py-3 px-3 font-medium">Names</th>
      <th className="py-3 px-3 font-medium text-center">District</th>
      <th className="py-3 px-3 font-medium text-center">Trade</th>
      <th className="py-3 px-3 font-medium text-center">Certificate</th>
      <th className="py-3 px-3 font-medium text-center">Gender</th>
      <th className="py-3 px-3 font-medium text-center">Level</th>
      <th className="py-3 px-3 font-medium text-center">View</th>

    </tr>
  )}


  {activeTab === "Appointed" && (
    <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left mb-2">
      <th className="py-3 px-3 font-medium">Names</th>
      <th className="py-3 px-3 font-medium text-center">District</th>
      <th className="py-3 px-3 font-medium text-center">Trade</th>
      <th className="py-3 px-3 font-medium text-center">Gender</th>
      <th className="py-3 px-3 font-medium text-center">Position</th>
      <th className="py-3 px-3 font-medium text-center">View</th>
    </tr>
  )}

  {activeTab === "Certificate updates" && (
    <tr className="bg-[#EEF4FF] text-[#1D5FAD] text-left mb-2">
      <th className="py-3 px-3 font-medium">Names</th>
      <th className="py-3 px-3 font-medium">Current Qualification</th>
      <th className="py-3 px-3 font-medium">Current Level</th>
      <th className="py-3 px-3 font-medium">New Qualification</th>
      <th className="py-3 px-3 font-medium">New Level</th>
      <th className="py-3 px-3 font-medium">Edit</th>
      <th className="py-3 px-3 font-medium">Approve</th>
      <th className="py-3 px-3 font-medium">Reject</th>
    </tr>
  )}
</thead>

<tbody>
  {activeTab === "Pending" &&
    pendingData.map((item, index) => (
      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-[#F5F9FF]"} hover:bg-gray-200`}>
        <td className="py-3 px-3">{item.ShoolName}</td>
        <td className="py-3 px-3 text-center">{item.District}</td>
        <td className="py-3 px-3 text-center">{item.Trade}</td>
        <td className="py-3 px-3 text-center">{item.Qualifications}</td>
        <td className="py-3 px-3 text-center">{item.Trainers}</td>
        <td className="py-3 px-3 text-center">{item.Position}</td>
        <td className="py-3 px-3 text-center"><FaRegEye className="mx-auto" /></td>
        <td className="py-3 px-3 text-center"><FaPen className="mx-auto" /></td>
        <td className="py-3 px-3 text-center text-green-600"><FiToggleRight className="mx-auto" /></td>
        <td className="py-3 px-3 text-center text-red-600"><FiToggleRight className="mx-auto" /></td>
      </tr>
    ))}

  {activeTab === "Approved" &&
    approvedData.map((item, index) => (
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


    
  {activeTab === "Appointed" &&
    appointedData.map((item, index) => (
      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-[#F5F9FF]"} hover:bg-gray-200`}>
        <td className="py-3 px-3">{item.ShoolName}</td>
        <td className="py-3 px-3 text-center">{item.District}</td>
        <td className="py-3 px-3 text-center">{item.Trade}</td>
        <td className="py-3 px-3 text-center">{item.Trainers}</td>
        <td className="py-3 px-3 text-center">{item.Position}</td>
        <td className="py-3 px-3 text-center"><FaRegEye className="mx-auto" /></td>
      </tr>
    ))}

  {activeTab === "Certificate updates" &&
    certificateData.map((item, index) => (
      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-[#F5F9FF]"} hover:bg-gray-200`}>
        <td className="py-3 px-3">{item.ShoolName}</td>
        <td className="py-3 px-3 text-center">{item.Qualifications}</td>
        <td className="py-3 px-3 text-center">{item.Qualifications}</td>
        <td className="py-3 px-3 text-center">{item.Qualifications}</td>
        <td className="py-3 px-3 text-center">{item.Qualifications}</td>
         <td className="py-3 px-3 text-center"><FaPen className="mx-auto" /></td>
       <td className="py-3 px-3 text-center text-green-600"><FiToggleRight className="mx-auto" /></td>
        <td className="py-3 px-3 text-center text-red-600"><FiToggleRight className="mx-auto" /></td>
      
      </tr>
    ))}
</tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-20 space-x-2">
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


    </div>
  );
};

export default Trainers;
