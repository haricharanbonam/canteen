import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Flame } from 'lucide-react';
import { MenuItem } from '../data/menu';
import { useCartStore } from '../stores/cartStore';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { items, addItem } = useCartStore();
  const isInCart = items.some((cartItem) => cartItem.id === item.id);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addItem(item);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div 
      className="glass-card glass-card-hover overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageError ? '/fallback-food.jpg' : item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-110"
          onError={handleImageError}
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span 
              key={tag}
              className="inline-block bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm text-xs font-medium rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 line-clamp-1">{item.name}</h3>
          <div className="flex items-center bg-secondary-100 dark:bg-secondary-900 rounded-full px-2 py-1">
            <Flame className="h-3 w-3 text-secondary-500 dark:text-secondary-400 mr-1" />
            <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">{item.calories} cal</span>
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4 flex-grow">{item.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-neutral-800 dark:text-neutral-100">${item.price.toFixed(2)}</span>
          <motion.button
            onClick={handleAddToCart}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition ${
              isInCart 
                ? 'bg-success-500 hover:bg-success-600 text-white' 
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label={isInCart ? "Added to cart" : "Add to cart"}
          >
            {isInCart ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;