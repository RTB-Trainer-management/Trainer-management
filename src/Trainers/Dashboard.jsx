import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../redux/Features/authSlice";
import {
  useAppealPerformanceMutation,
  useCreatePerformanceMutation,
} from "../redux/api/TrainerSlice";
import { useGetAllPerformancesQuery } from "../redux/api/SchoolManagerSlice";

const TrainerDashboard = () => {
  const user = useSelector(selectCurrentUser);
  const [rate, setRate] = useState("");
  const [appealMessage, setAppealMessage] = useState("");

  const { data: performances = [] } = useGetAllPerformancesQuery(undefined, {
    skip: !user,
  });

  const myPerformance = useMemo(
    () => performances.find((item) => item.trainer_id === user?.id),
    [performances, user]
  );

  const [createPerformance, { isLoading: isCreating }] = useCreatePerformanceMutation();
  const [appealPerformance, { isLoading: isAppealing }] = useAppealPerformanceMutation();

  const handleCreatePerformance = async (event) => {
    event.preventDefault();
    if (!user) return;
    if (!rate) {
      toast.error("Provide a performance rate");
      return;
    }
    try {
      await createPerformance({
        trainerId: user.id,
        rate,
        status: "pending",
      }).unwrap();
      toast.success("Performance submitted");
      setRate("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit performance");
    }
  };

  const handleAppeal = async (event) => {
    event.preventDefault();
    if (!user) return;
    try {
      await appealPerformance({
        trainerId: user.id,
        appeal_message: appealMessage,
      }).unwrap();
      toast.success("Appeal sent");
      setAppealMessage("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit appeal");
    }
  };

  return (
    <div className="flex-1 p-10 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-[#1D5FAD] mb-4">Welcome back, {user?.first_name || user?.email}</h2>
          <p className="text-gray-600">
            Track your performance submissions and respond to school manager feedback from a single place.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-lg font-semibold capitalize">{myPerformance?.status || "Not submitted"}</p>
            </div>
            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">Latest Rate</p>
              <p className="text-lg font-semibold">{myPerformance?.rate ? `${myPerformance.rate}%` : "-"}</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#1D5FAD]">Submit Performance</h3>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleCreatePerformance}>
            <input
              type="number"
              min="0"
              max="100"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter performance rate"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              required
            />
            <button
              type="submit"
              disabled={isCreating}
              className="bg-[#1D5FAD] text-white px-6 py-2 rounded-lg hover:bg-[#164e94] transition disabled:opacity-60"
            >
              {isCreating ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#1D5FAD]">Appeal Decision</h3>
          <form onSubmit={handleAppeal} className="space-y-4">
            <textarea
              value={appealMessage}
              onChange={(e) => setAppealMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 min-h-[120px] focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              placeholder="Explain why your performance should be reconsidered..."
              required
            />
            <button
              type="submit"
              disabled={isAppealing}
              className="bg-[#1D5FAD] text-white px-6 py-2 rounded-lg hover:bg-[#164e94] transition disabled:opacity-60"
            >
              {isAppealing ? "Sending..." : "Submit Appeal"}
            </button>
          </form>
        </section>

        {myPerformance?.rejection_message && (
          <section className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-[#1D5FAD]">Manager Feedback</h3>
            <p className="text-gray-600">{myPerformance.rejection_message}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default TrainerDashboard;