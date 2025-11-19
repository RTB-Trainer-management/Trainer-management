import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateRecruitmentMutation, useCreatePaymentIntentMutation, useSavePaymentRecordMutation } from '../redux/api/SchoolManagerSlice';
import PaymentModal from '../Components/PaymentModal';

const PostVacancy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainer_name: '',
    district: '',
    trade: '',
    qualification: '',
    position: '',
    school_from: '',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentAmount] = useState(50); // Fixed amount for posting a vacancy

  const [createRecruitment, { isLoading: isCreating }] = useCreateRecruitmentMutation();
  const [createPaymentIntent, { isLoading: isPreparingPayment }] = useCreatePaymentIntentMutation();
  const [savePaymentRecord] = useSavePaymentRecordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(formData).some(val => !val)) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await createPaymentIntent({ amount: paymentAmount }).unwrap();
      setClientSecret(result.clientSecret);
      setIsPaymentModalOpen(true);
    } catch (error) {
      toast.error("Failed to initiate payment");
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // 1. Create Recruitment
      const recruitment = await createRecruitment({ ...formData, payment_status: 'paid' }).unwrap();

      // 2. Save Payment Record
      await savePaymentRecord({
        amount: paymentAmount,
        currency: 'usd',
        status: 'succeeded',
        stripePaymentIntentId: paymentIntent.id,
        recruitmentId: recruitment.id
      }).unwrap();

      toast.success("Vacancy posted successfully!");
      setIsPaymentModalOpen(false);
      navigate('/recruitments/vacant-posts');
    } catch (error) {
      toast.error("Payment successful but failed to save vacancy. Please contact support.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Post a New Vacancy</h2>

        <form onSubmit={handleInitiatePayment} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                type="text"
                name="school_from"
                value={formData.school_from}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Trade</label>
              <input
                type="text"
                name="trade"
                value={formData.trade}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Qualification</option>
                <option value="A1">A1</option>
                <option value="A0">A0</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Trainer Name (Contact)</label>
              <input
                type="text"
                name="trainer_name"
                value={formData.trainer_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/recruitments/vacant-posts')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isPreparingPayment}
              className="bg-[#1D5FAD] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPreparingPayment ? 'Preparing...' : 'Proceed to Payment ($50)'}
            </button>
          </div>
        </form>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          clientSecret={clientSecret}
          onSuccess={handlePaymentSuccess}
          amount={paymentAmount}
        />
      </div>
    </div>
  );
};

export default PostVacancy;
