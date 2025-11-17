import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetAllRecruitmentsQuery,
  useGetAllPerformancesQuery,
  useGetAllTrainersQuery,
} from "../redux/api/SchoolManagerSlice";

const DashboardHome = () => {
  const { data: recruitments = [] } = useGetAllRecruitmentsQuery();
  const { data: performances = [] } = useGetAllPerformancesQuery();
  const { data: trainers = [] } = useGetAllTrainersQuery();

  const stats = useMemo(() => {
    const pendingTransfers = recruitments.filter((item) => item.status === "pending").length;
    const approvedTransfers = recruitments.filter((item) => item.status === "approved").length;
    const rejectedTransfers = recruitments.filter((item) => item.status === "rejected").length;
    const promotionReady = performances.filter((item) => item.status === "approved").length;
    const rejectedPerformances = performances.filter((item) => item.status === "rejected").length;

    return [
      { title: "Pending Transfers", value: pendingTransfers, color: "bg-blue-100 text-blue-600" },
      { title: "Active Trainers", value: trainers.length, color: "bg-red-100 text-red-600" },
      { title: "Posted Vacancies", value: recruitments.length, color: "bg-teal-100 text-teal-600" },
      { title: "Rejected Trainers", value: rejectedPerformances, color: "bg-purple-100 text-purple-600" },
      { title: "Promotion Ready", value: promotionReady, color: "bg-green-100 text-green-600" },
      { title: "Approved Transfers", value: approvedTransfers, color: "bg-yellow-100 text-yellow-600" },
      { title: "Rejected Transfers", value: rejectedTransfers, color: "bg-orange-100 text-orange-600" },
    ];
  }, [performances, recruitments, trainers.length]);

  const chartData = useMemo(() => {
    return performances.slice(0, 5).map((item, index) => ({
      label: `Trainer ${item.trainer_id}`,
      value: Number(item.rate) || 0,
      year: 2019 + index,
    }));
  }, [performances]);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-70px)] bg-gray-100">
      {/* Toast notifications */}
      <ToastContainer />
      <div className="flex justify-center items-center">

        <div className="flex bg-gray-400 w-30 p-1.5 rounded-lg mr-3 ">
          <span className="mx-auto text-center ">My school</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 ">

        <div className="grid grid-cols-3 lg:grid-cols-3 mid:grid-cols-2 gap-5 w-150  mx-20">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl p-4 ${item.color} shadow-sm`}
            >
              <h3 className="text-xs font-medium">{item.title}</h3>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          ))}

        </div>
        <div className="bg-white rounded-2xl shadow flex flex-col items-center justify-center  w-115  mx-20">
          <div className="bg-gray-500 w-full h-full rounded-t-2xl">

            <h3 className="font-semibold mb-2 text-gray-100 text-center mt-2">My Performance</h3>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-30 h-30 transform -rotate-90 mt-2">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#2563eb"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset="85"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-700">
              70%
            </span>
          </div>
        </div>
      </div>


      {/* Middle Section */}
      <div className="grid md:grid-cols-2   lg:grid-cols-3  mx-20">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow w-150">
          <h3 className="font-semibold mb-4 text-500 text-gray-700 text-center">Promotion Evaluation</h3>
          <ResponsiveContainer width="80%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Header */}
          <div className="bg-gray-500 py-3 rounded-t-2xl">
            <h3 className="font-semibold text-center text-gray-100 tracking-wide">
              Incoming Transfers
            </h3>
          </div>

          {/* List */}
          <ul className="p-4 text-gray-600 space-y-3">
            {["Uwimana David", "Uwitonze Daniel", "Uwumukiza Clarisse", "Uwineza Christian"].map(
              (name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 transition-all duration-200 rounded-lg px-4 py-2 text-sm font-medium"
                >

                  <span>{name}</span>
                </li>
              )
            )}
          </ul>
        </div>


      </div>


    </div>
  );
};

export default DashboardHome;
