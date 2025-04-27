import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import TimeSlotCard from '../components/TimeSlotCard';
import { groupedTimeSlots } from '../data/timeSlots';
import { useCartStore } from '../stores/cartStore';

const TimeSlotsPage = () => {
  const { items, timeSlot } = useCartStore();
  const { morning, afternoon, evening } = groupedTimeSlots();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const hasTimeSlot = timeSlot !== null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (totalItems === 0) {
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
                  Add some delicious items from our menu before selecting a time slot.
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Select a Pickup Time</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Choose a convenient time slot to pick up your order. We'll have it ready for you!
              </p>
            </div>

            <div className="mb-6 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary-500" />
              <span className="font-medium">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Time slots sections */}
            <div className="space-y-8 mb-10">
              {/* Morning slots */}
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-secondary-500 mr-2" />
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Morning</h3>
                </div>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {morning.map((slot) => (
                    <motion.div key={slot.id} variants={itemVariants}>
                      <TimeSlotCard slot={slot} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Afternoon slots */}
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-secondary-500 mr-2" />
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Afternoon</h3>
                </div>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {afternoon.map((slot) => (
                    <motion.div key={slot.id} variants={itemVariants}>
                      <TimeSlotCard slot={slot} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Evening slots */}
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-secondary-500 mr-2" />
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Evening</h3>
                </div>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {evening.map((slot) => (
                    <motion.div key={slot.id} variants={itemVariants}>
                      <TimeSlotCard slot={slot} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <Link 
                to="/menu" 
                className="btn btn-ghost flex items-center"
              >
                <span>Back to Menu</span>
              </Link>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hasTimeSlot ? (
                  <Link 
                    to="/order-summary" 
                    className="btn btn-primary flex items-center"
                  >
                    <span>Continue to Order Summary</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <span className="btn bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed">
                    Select a Time Slot to Continue
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TimeSlotsPage;