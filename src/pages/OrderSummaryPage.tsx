import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar, ShoppingBag, Trash2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import CartItem from '../components/CartItem';
import PaymentForm from '../components/PaymentForm';
import { useCartStore } from '../stores/cartStore';
import { timeSlots } from '../data/timeSlots';

const OrderSummaryPage = () => {
  const { items, timeSlot, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax for demo
  const total = subtotal + tax;
  
  // Get selected time slot details
  const selectedTimeSlot = timeSlot
    ? timeSlots.find((slot) => slot.id === timeSlot)
    : null;

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-28 pb-16">
          <div className="container-custom">
            <div className="text-center py-16 max-w-lg mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag className="h-20 w-20 text-neutral-300 dark:text-neutral-700 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Your cart is empty</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  Add some delicious items from our menu to proceed.
                </p>
                <Link to="/menu" className="btn btn-primary">
                  Browse Menu
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Order Summary</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Review your order details and proceed to payment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left section - Order items */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Your Items</h3>
                  <button
                    onClick={clearCart}
                    className="flex items-center text-error-500 hover:text-error-600 dark:hover:text-error-400 transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                </div>

                <AnimatePresence>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              {timeSlot ? (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Pickup Details</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                      <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                      <Clock className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {selectedTimeSlot?.time}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-warning-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-warning-700 dark:text-warning-300">Time Slot Required</h3>
                      <p className="text-warning-600 dark:text-warning-400">
                        Please select a pickup time before proceeding.
                      </p>
                      <Link 
                        to="/time-slots" 
                        className="mt-3 inline-flex items-center text-sm font-medium text-warning-700 dark:text-warning-300 hover:text-warning-800 dark:hover:text-warning-200"
                      >
                        <span>Select Time Slot</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Form */}
              {timeSlot && (
                <div className="glass-card p-6 mt-6">
                  <h3 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">Payment</h3>
                  <PaymentForm amount={total} />
                </div>
              )}
            </div>

            {/* Right section - Order summary */}
            <div className="lg:col-span-1">
              <motion.div 
                className="glass-card p-6 sticky top-28"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                    <span className="text-neutral-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Tax (10%)</span>
                    <span className="text-neutral-800 dark:text-neutral-200">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">Total</span>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link 
                    to={timeSlot ? "/time-slots" : "/menu"} 
                    className="flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span>Back to {timeSlot ? "Time Slots" : "Menu"}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrderSummaryPage;