import { Link, useNavigate } from "react-router-dom";
import RtbImage from "../assets/rtb.png";

const CheckEmail=() => {
  return (
    <div>
      <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white rounded-xl py-15 px-8 w-[30rem] h-[40rem] shadow-lg">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mt-[5rem]">Check Email </h1>
        <p className="text-gray-600 my-[8rem]">Check the code we sent to m************cole@gmail.com</p>
        <Link to="" className="text-center font-semibold">
          <p>Back to code page</p>
        </Link>
       </div>
       </div>
    </div>
  )
}

export default CheckEmail;