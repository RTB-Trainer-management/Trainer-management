import { Link } from 'react-router-dom';
import RtbImage from '../assets/rtb.png';

const Rtb= () => {
  return (
    <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-8 w-[50rem] shadow-lg my-10">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mb-8">REGISTER</h1>

        <div className="text-[#868585] text-sm font-medium flex items-center justify-center space-x-4 mb-10">
  <Link to="/" className="hover:text-[#1D5FAD]">Trainer</Link>
  <span>.</span>
  <Link to="/school-management">School Manager</Link>
  <span>.</span>
  <Link to="/mayor" className="hover:text-[#1D5FAD]">Mayor</Link>
  <span>.</span>
  <Link to="/Dde" className="hover:text-[#1D5FAD]">DDE</Link>
  <span>.</span>
  <Link to="/Rtb" className="] bg-[#1D5FAD] p-3 text-white rounded-2xl">RTB</Link>
  <span>.</span>
  <Link to="/Seo" className="hover:text-[#1D5FAD]">SEO</Link>
</div>

        <form className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 my-10">
          <div className="space-y-6 mx-20">
            <div className>
              <label htmlFor="fname" className="block text-[#868585] text-sm font-medium mb-1">
                Firstname
              </label>
              <input
                id="fname"
                type="text"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400 "
                placeholder="John"
              />
            </div>
                        <div>
              <label htmlFor="email" className="block text-[#868585] text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
                placeholder="johndoe@example.com"
              />
            </div>
                                    <div>
              <label htmlFor="gender" className="block text-[#868585] text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400 "
              >
                <option value=""></option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>



            <div>
              <label htmlFor="password" className="block text-[#868585] text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              />
            </div>
            



           
          </div>

          <div className="space-y-6 mx-5.5 my-0.5">
            <div>
              <label htmlFor="lname" className="block text-[#868585] text-sm font-medium mb-1">
                Lastname
              </label>
              <input
                id="lname"
                type="text"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
                placeholder="Doe"
              />
            </div>



            <div>
              <label htmlFor="phone" className="block text-[#868585] text-sm font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="number"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
                placeholder="078..."
              />
            </div>
            
            <div>
              <label htmlFor="id" className="block text-[#868585] text-sm font-medium mb-1">
                National ID
              </label>
              <input
                id="id"
                type="text"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              />
            </div>
 
            <div>
              <label htmlFor="cpassword" className="block text-[#868585] text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="cpassword"
                type="password"
                className="block w-70 border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              />
            </div>
          </div>
        </form>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="w-60 bg-[#1D5FAD] text-white px-6 py-2 rounded-md hover:bg-[#164e94] transition-colors"
          >
            Register
          </button>
          <p className="text-center text-sm mt-4">
            Already registered?{' '}
            <Link to="/login" className="text-[#1D5FAD] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rtb;
