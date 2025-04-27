import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FoodCard from '../components/FoodCard';
import { menuItems, categories } from '../data/menu';
import { useCartStore } from '../stores/cartStore';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCartStore();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Filter menu items based on category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 dark:bg-neutral-950">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Our Menu</h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl">
              Discover our delicious range of freshly prepared meals, snacks, and beverages. 
              Pre-order now and pick up at your selected time slot.
            </p>
          </div>

          <div className="mb-10">
            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white dark:bg-primary-600'
                      : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileTap={{ scale: 0.97 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FoodCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300 dark:text-neutral-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-200">No items found</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try different search terms or categories
              </p>
            </div>
          )}

          {/* Cart CTA Button (Shown if cart has items) */}
          {totalItems > 0 && (
            <motion.div
              className="fixed bottom-8 right-8"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/time-slots"
                className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg transition-colors"
              >
                <span>Continue to Time Slots</span>
                <span className="flex items-center justify-center bg-white text-primary-500 h-6 w-6 rounded-full font-medium text-sm">
                  {totalItems}
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MenuPage;