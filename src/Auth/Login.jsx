import { Link } from 'react-router-dom';
import RtbImage from '../assets/rtb.png';

const Login = () => {
  return (
    <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white rounded-xl p-8 w-[30rem] shadow-lg">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mb-8">LOGIN</h1>
        <form className="space-y-6">
          <div className="w-full mx-auto">
            <label htmlFor="email" className="block text-[#868585] text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="block w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              placeholder="adminrtb@gmail.com"
            />
          </div>
          <div className="w-full mx-auto">
            <label htmlFor="password" className="block text-[#868585] text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              placeholder=""
            />
          </div>
          <div className="text-right">
            <Link to="/reset" className="text-[#1D5FAD] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-[#1D5FAD] border-gray-300 rounded focus:ring-[#1D5FAD]"
            />
            <label htmlFor="remember" className="text-[#868585] text-sm font-medium">
              Remember me
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-[#1D5FAD] text-white px-6 py-2 rounded-md hover:bg-[#164e94] transition-colors"
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            Not registered?{' '}
            <Link to="/register" className="text-[#1D5FAD] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;