import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { TimeSlot } from '../data/timeSlots';
import { useCartStore } from '../stores/cartStore';

interface TimeSlotCardProps {
  slot: TimeSlot;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ slot }) => {
  const { timeSlot, setTimeSlot } = useCartStore();
  const isSelected = timeSlot === slot.id;

  const handleSelectTimeSlot = () => {
    if (slot.available) {
      setTimeSlot(slot.id);
    }
  };

  return (
    <motion.div
      className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
        !slot.available
          ? 'bg-neutral-100 dark:bg-neutral-800/50 opacity-50 cursor-not-allowed'
          : isSelected
          ? 'bg-primary-100 dark:bg-primary-950 border border-primary-300 dark:border-primary-700'
          : 'glass-card hover:shadow-lg'
      }`}
      whileHover={slot.available && !isSelected ? { y: -2 } : {}}
      whileTap={slot.available ? { scale: 0.98 } : {}}
      onClick={handleSelectTimeSlot}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className={`h-5 w-5 mr-3 ${
            isSelected 
              ? 'text-primary-500' 
              : 'text-neutral-500 dark:text-neutral-400'
          }`} />
          <span className={`font-medium ${
            isSelected 
              ? 'text-primary-700 dark:text-primary-300' 
              : 'text-neutral-700 dark:text-neutral-300'
          }`}>
            {slot.time}
          </span>
        </div>
        {isSelected && (
          <CheckCircle className="h-5 w-5 text-primary-500" />
        )}
      </div>
    </motion.div>
  );
};

export default TimeSlotCard;