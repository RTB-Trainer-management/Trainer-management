import { Link, Navigate, useNavigate } from "react-router-dom";
import RtbImage from "../assets/rtb.png";

const VerifyCode=() => {
  return (
    <div>
      <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white rounded-xl p-8 w-[30rem] h-[30rem] shadow-lg">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mb-8">Code</h1>
        <p className="text-gray-600 font-semibold text-center my-5">Enter sent code on your email</p>
        <form className="space-y-6">
          <div className="w-full my-[3rem] mx-auto">
            <label htmlFor="email" className="block text-[#868585] text-sm font-medium mb-1">
              CODE
            </label>
            <input
              id="email"
              type="text"
              className="block w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              placeholder="--- --- --- ---"
            />
          </div>
          
          <div className="text-center">
            <Link to="/change-password">
              <button
                type="submit"
                onClick={() => Navigate("/change-password")}
                className="w-[8rem] hover:cursor-pointer bg-[#1D5FAD] text-white px-6 py-2 rounded-md hover:bg-[#164e94] transition-colors"
              >
                Send
              </button>
            </Link>
          </div>
       </form>
       </div>
       </div>
    </div>
  )
}

export default VerifyCode;