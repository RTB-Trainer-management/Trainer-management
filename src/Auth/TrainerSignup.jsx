import { Link } from "react-router-dom";
import RtbImage from "../assets/rtb.png";

const TrainerRegister = () => {
  return (
    <div className="min-h-screen w-full bg-[#1D5FAD] flex items-center justify-center">
      <div className="bg-white w-[850px] rounded-xl shadow-lg px-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <img src={RtbImage} alt="RTB logo" className="w-40 h-auto" />
          <div className="flex space-x-4 text-[#1D5FAD] font-medium">
            <select className="border border-[#1D5FAD] rounded px-2 py-1">
              <option>Trainer</option>
              <option>School Manager</option>
              <option>Manager</option>
              <option>DDE</option>
              <option>RTB</option>
              <option>SEO</option>
            </select>
          </div>
        </div>

        {/* Register Progress */}
        <div className="mt-6 text-center">
          <h2 className="text-[#1D5FAD] text-2xl font-bold mb-2">REGISTER</h2>
          <div className="">
            <div className="flex justify-center items-center space-x-2">
            <div className="bg-[#1D5FAD] rounded-full w-8 hover:cursor-pointer font-semibold pt-[0.1rem] h-7">1</div>
              <div className="h-[5px] rounded-xl w-60 bg-gray-300"></div>
              <div className="h-[5px] rounded-xl w-60 bg-gray-300"></div>
              <div className="w-8 h-7 border-2 hover:cursor-pointer border-gray-400 rounded-full"></div>
            </div>
            <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center block space-x-2">
                <span className="text-[#1D5FAD] font-semibold text-sm">
                  Personal info
                </span>
              </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-semibold text-sm">
                Address info
              </span>
            </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {/* Column 1 */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Firstname
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Lastname
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Gender
              </label>
              <select className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Birthdate
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  maxLength={4}
                  placeholder="YY"
                  className="w-1/3 border border-gray-300 rounded-md px-2 py-2 text-center focus:ring-2 focus:ring-[#1D5FAD]"
                />
                <input
                  type="number"
                  placeholder="MM"
                  className="w-1/3 border border-gray-300 rounded-md px-2 py-2 text-center focus:ring-2 focus:ring-[#1D5FAD]"
                />
                <input
                  type="number"
                  placeholder="DD"
                  className="w-1/3 border border-gray-300 rounded-md px-2 py-2 text-center focus:ring-2 focus:ring-[#1D5FAD]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                National ID
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Trade
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Certificate
              </label>
              <select className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]">
                <option value="">Select</option>
                <option>Certificate</option>
                <option>Diploma</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Employed
              </label>
              <select className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Province
              </label>
              <select className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]">
                <option>Kigali</option>
                <option>Southern</option>
                <option>Western</option>
                <option>Eastern</option>
                <option>Northern</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                District
              </label>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"/>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Cell
              </label>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"/>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Village
              </label>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"/>
            </div>

            <div className="flex">
              <input type="radio" className="mr-[1rem] border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"/>
              <label className="block text-gray-600 font-medium mb-1">
                Passed exam
              </label>
            </div>

            <div className="flex">
              <input type="radio" className="mr-[1rem] border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#1D5FAD]"/>
              <label className="block text-gray-600 font-medium mb-1">
               Employed 
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center mt-8">
            <button
              type="submit"
              className="bg-[#1D5FAD] w-48 text-white py-2 rounded-md hover:bg-[#174f91] transition"
            >
              Next
            </button>
            <p className="text-gray-600 text-sm mt-2">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-[#1D5FAD] font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerRegister;
