import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../stores/cartStore';
import { useCartStore } from '../stores/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <motion.div 
      className="flex items-center bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-neutral-800 dark:text-neutral-200">{item.name}</h4>
        <p className="text-primary-600 dark:text-primary-400 font-medium">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <motion.button
          className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={handleDecrease}
          whileTap={{ scale: 0.95 }}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </motion.button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <motion.button
          className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={handleIncrease}
          whileTap={{ scale: 0.95 }}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
        <motion.button
          className="h-8 w-8 rounded-full ml-4 bg-error-100 dark:bg-error-900/30 flex items-center justify-center text-error-500 hover:bg-error-200 dark:hover:bg-error-800/50 transition-colors"
          onClick={handleRemove}
          whileTap={{ scale: 0.95 }}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;