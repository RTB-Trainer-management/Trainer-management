import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import RtbImage from '../assets/rtb.png';
import { useTrainerLoginMutation } from '../redux/api/TrainerSlice';
import { setCredentials } from '../redux/Features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [login, { isLoading }] = useTrainerLoginMutation();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const result = await login({ email: formData.email.trim(), password: formData.password }).unwrap();
      dispatch(setCredentials(result));
      toast.success('Login successful');

      switch (result?.user?.userType) {
        case 'school_manager':
          navigate('/', { replace: true });
          break;
        case 'trainer':
          navigate('/trainers', { replace: true });
          break;
        case 'admin':
          navigate('/', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    } catch (error) {
      const message = error?.data?.message || 'Failed to login';
      toast.error(message);
    }
  };

  return (
    <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white rounded-xl p-8 w-[30rem] shadow-lg">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mb-8">LOGIN</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full mx-auto">
            <label htmlFor="email" className="block text-[#868585] text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD] focus:border-transparent placeholder-gray-400"
              placeholder="********"
            />
          </div>
          <div className="text-right">
            <Link to="/user/reset" className="text-[#1D5FAD] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#1D5FAD] border-gray-300 bg-white rounded focus:ring-[#1D5FAD]"
            />
            <label htmlFor="remember" className="text-[#868585] text-sm font-medium">
              Remember me
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D5FAD] text-white px-6 py-2 rounded-md hover:bg-[#164e94] transition-colors disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            Not registered?{' '}
            <Link to="/user/trainer-register" className="text-[#1D5FAD] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;