import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RtbImage from '../assets/rtb.png';
import { useManagerSignupMutation } from '../redux/api/SchoolManagerSlice';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  national_id: '',
  province: '',
  district: '',
  school_name: '',
  gender: '',
  certificate: '',
  password: '',
  confirmPassword: '',
  passed_course: '',
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [registerManager, { isLoading }] = useManagerSignupMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error('Please complete all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const payload = { ...formData };
      delete payload.confirmPassword;
      await registerManager(payload).unwrap();
      toast.success('Account created successfully. Please login.');
      setFormData(initialState);
      navigate('/user/login', { replace: true });
    } catch (error) {
      const message = error?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <div className="bg-[#1D5FAD] text-[#868585] flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-10 w-11/12 max-w-6xl shadow-lg my-10">
        <img src={RtbImage} alt="RTB logo" className="w-32 h-20 mx-auto mb-6" />
        <h1 className="text-[#1D5FAD] text-2xl font-bold text-center mb-4">SCHOOL MANAGER REGISTRATION</h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          A single account gives you access to the School Manager portal. Trainers have a dedicated signup page.
        </p>

        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {[
            { name: 'first_name', label: 'First Name', placeholder: 'John' },
            { name: 'last_name', label: 'Last Name', placeholder: 'Doe' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { name: 'phone', label: 'Phone', placeholder: '0781234567' },
            { name: 'national_id', label: 'National ID' },
            { name: 'school_name', label: 'School Name' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1 text-gray-600">{field.label}</label>
              <input
                name={field.name}
                type={field.type || 'text'}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
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
            <label className="block text-sm font-medium mb-1 text-gray-600">District</label>
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Certificate</label>
            <input
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Passed Course</label>
            <input
              name="passed_course"
              value={formData.passed_course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1D5FAD]"
              required
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D5FAD] text-white py-3 rounded-xl font-semibold hover:bg-[#164e94] transition disabled:opacity-60"
            >
              {isLoading ? 'Submitting...' : 'Register'}
            </button>
            <p className="text-center text-sm mt-4">
              Already registered?{' '}
              <Link to="/user/login" className="text-[#1D5FAD] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
