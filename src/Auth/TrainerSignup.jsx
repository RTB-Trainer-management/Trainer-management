import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RtbImage from "../assets/rtb.png";
import { useTrainerSignupMutation } from "../redux/api/TrainerSlice";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: "",
  level: "",
  password: "",
  national_id: "",
  school_name: "",
  employed: "",
  birth_date: "",
  province: "",
  district: "",
  passed_course: "",
};

const TrainerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [signup, { isLoading }] = useTrainerSignupMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...formData,
        employed: formData.employed === "yes",
      };
      await signup(payload).unwrap();
      toast.success("Trainer account created. Please login.");
      setFormData(initialState);
      navigate("/user/login", { replace: true });
    } catch (error) {
      const message = error?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1D5FAD] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg px-10 py-8">
        <div className="flex flex-col items-center">
          <img src={RtbImage} alt="RTB logo" className="w-32 h-auto" />
          <h2 className="text-[#1D5FAD] text-2xl font-bold mt-4">Trainer Registration</h2>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Join as a Trainer to access your personalized portal. Already have an account?{" "}
            <Link to="/user/login" className="text-[#1D5FAD] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        <form className="mt-8 grid md:grid-cols-2 gap-6 text-sm" onSubmit={handleSubmit}>
          {[
            { name: "first_name", label: "First Name", placeholder: "John" },
            { name: "last_name", label: "Last Name", placeholder: "Doe" },
            { name: "email", label: "Email", type: "email", placeholder: "john@example.com" },
            { name: "phone", label: "Phone", placeholder: "0781234567" },
            { name: "password", label: "Password", type: "password" },
            { name: "birth_date", label: "Birth Date", type: "date" },
            { name: "national_id", label: "National ID" },
            { name: "school_name", label: "School Name" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-600 font-medium mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Employed</label>
            <select
              name="employed"
              value={formData.employed}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select status</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select province</option>
              <option value="Kigali City">Kigali City</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="Western Province">Western Province</option>
              <option value="Southern Province">Southern Province</option>
              <option value="Northern Province">Northern Province</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">District</label>
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">Passed Course</label>
            <select
              name="passed_course"
              value={formData.passed_course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select course</option>
              {[
                "Math",
                "Science",
                "History",
                "English",
                "Art",
                "Music",
                "Physical Education",
                "Other",
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D5FAD] text-white py-3 rounded-lg font-semibold hover:bg-[#174f91] transition disabled:opacity-60"
            >
              {isLoading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerRegister;

