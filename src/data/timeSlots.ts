export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  // Start at 8:00 AM
  let hour = 8;
  let minute = 0;
  
  // Generate slots until 8:00 PM (20:00)
  while (hour < 20) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    const formattedMinute = minute === 0 ? '00' : minute;
    
    // Random availability but with more slots available than not
    const random = Math.random();
    const isAvailable = random > 0.3; // 70% chance of being available
    
    slots.push({
      id: `slot-${hour}-${minute}`,
      time: `${formattedHour}:${formattedMinute} ${amPm}`,
      available: isAvailable
    });
    
    // Move to next 30-minute slot
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }
  
  return slots;
};

export const timeSlots = generateTimeSlots();

// Group time slots by morning, afternoon, and evening
export const groupedTimeSlots = () => {
  const morning: TimeSlot[] = [];
  const afternoon: TimeSlot[] = [];
  const evening: TimeSlot[] = [];
  
  timeSlots.forEach(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    const amPm = slot.time.split(' ')[1];
    
    if (amPm === 'AM') {
      morning.push(slot);
    } else if (hour < 5) {
      afternoon.push(slot);
    } else {
      evening.push(slot);
    }
  });
  
  return { morning, afternoon, evening };
};