import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, QrCode } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useCartStore } from '../stores/cartStore';
import { timeSlots } from '../data/timeSlots';

const orderStatuses = ['Processing', 'Preparing', 'Ready for Pickup'];

const ConfirmationPage = () => {
  const { items, timeSlot, clearCart } = useCartStore();
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderId, setOrderId] = useState('');
  
  const selectedTimeSlot = timeSlot
    ? timeSlots.find((slot) => slot.id === timeSlot)
    : null;
  
  // Calculate order total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Generate random order ID
  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(id);
    
    // Simulate order status change
    const timer1 = setTimeout(() => setOrderStatus(1), 3000);
    const timer2 = setTimeout(() => setOrderStatus(2), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearCart(); // Clear cart when leaving confirmation page
    };
  }, [clearCart]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-16">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
              className="mx-auto w-20 h-20 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mb-6"
            >
              <CheckCircle className="h-10 w-10 text-success-500" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              Order Confirmed!
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl mx-auto">
              Your order has been received and is being prepared. Please pick up your order at the selected time.
            </p>
          </motion.div>

          {/* Order Status */}
          <div className="glass-card p-8 mb-10">
            <h2 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">
              Order Status
            </h2>
            <div className="relative mb-10">
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/4 left-0 h-1 bg-primary-500 -translate-y-1/2 z-10 transition-all duration-1000"
                style={{ width: `${(orderStatus / (orderStatuses.length - 1)) * 100}%` }}
              ></div>
              <div className="relative z-20 flex justify-between">
                {orderStatuses.map((status, index) => (
                  <div key={status} className="flex flex-col items-center">
                    <motion.div 
                      className={`h-8 w-8 rounded-full ${
                        index <= orderStatus 
                          ? 'bg-primary-500' 
                          : 'bg-neutral-200 dark:bg-neutral-700'
                      } flex items-center justify-center mb-2`}
                      animate={index <= orderStatus ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {index < orderStatus ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <span className={`text-sm font-medium ${
                          index <= orderStatus ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'
                        }`}>
                          {index + 1}
                        </span>
                      )}
                    </motion.div>
                    <span className={`text-sm font-medium ${
                      index <= orderStatus 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <QrCode className="h-5 w-5 text-neutral-700 dark:text-neutral-300 mr-2" />
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200">Order ID</h4>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 font-mono">{orderId}</p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-neutral-700 dark:text-neutral-300 mr-2" />
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200">Pickup Time</h4>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Today at {selectedTimeSlot?.time || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="glass-card p-8 mb-10 text-center">
            <h2 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">
              Your Pickup QR Code
            </h2>
            <div className="max-w-xs mx-auto mb-6">
              <div className="bg-white p-4 rounded-xl">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CANTEENBUDDY-${orderId}`}
                  alt="QR Code" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
              Show this QR code to the canteen staff when picking up your order. 
              No need to wait in line!
            </p>
          </div>

          {/* Order Summary */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{item.name}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between">
              <span className="font-semibold text-neutral-800 dark:text-neutral-100">Total</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ConfirmationPage;