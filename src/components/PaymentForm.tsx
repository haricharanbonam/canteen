import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useCartStore } from '../stores/cartStore';
import { stripePromise } from '../lib/stripe';

interface PaymentFormProps {
  amount: number;
}

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed. Please try again.');
        toast.error(submitError.message || 'Payment failed');
      } else {
        toast.success('Payment successful!');
        clearCart();
        navigate('/confirmation');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-6 flex items-center justify-center text-primary-500">
        <Lock className="h-6 w-6 mr-2" />
        <span className="text-sm font-medium">Secure Payment</span>
      </div>

      <motion.div 
        className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-neutral-400 mr-2" />
          <span className="font-medium">Card Details</span>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg"
            >
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-error-500 mt-0.5 mr-2" />
                <p className="text-sm text-error-700 dark:text-error-300">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PaymentElement 
          className="mb-6"
          options={{
            layout: 'tabs',
            fields: {
              billingDetails: 'never'
            }
          }}
        />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={!stripe || loading}
          className="w-full mt-6 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </motion.button>

        <p className="mt-4 text-xs text-center text-neutral-500">
          This is a test payment. Use card number 4242 4242 4242 4242, any future date, and any CVC.
        </p>
      </motion.div>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ amount }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to initialize payment');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
        toast.error('Failed to initialize payment. Please try again.');
      }
    };

    createPaymentIntent();
  }, [amount]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full p-4 bg-error-50 dark:bg-error-900/20 rounded-lg text-center"
      >
        <AlertCircle className="h-8 w-8 text-error-500 mx-auto mb-2" />
        <p className="text-error-700 dark:text-error-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-error-600 dark:text-error-400 hover:underline"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2da269',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '8px',
            spacingUnit: '4px',
          },
          rules: {
            '.Input': {
              border: '1px solid #e5e7eb',
              boxShadow: 'none',
              fontSize: '14px',
            },
            '.Input:focus': {
              border: '2px solid #2da269',
              boxShadow: '0 0 0 1px #2da269',
            },
          },
        },
      }}
    >
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default PaymentForm;