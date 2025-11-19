import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

// Initialize Stripe with your publishable key
// IMPORTANT: Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51Qk4eWJ4y3j4y3j4y3j4y3j4y3j4y3j4y3j4y3j4y3j4y3j4');

const CheckoutForm = ({ clientSecret, onSuccess, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
        <div className="p-3 border rounded-md bg-white">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#1D5FAD] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, clientSecret, onSuccess, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">Complete Payment</h2>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
