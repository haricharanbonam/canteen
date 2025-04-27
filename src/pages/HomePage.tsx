import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Coffee, UtensilsCrossed } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { menuItems } from '../data/menu';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const HomePage = () => {
  // Get trending items (first 4 items for demo)
  const trendingItems = menuItems.slice(0, 4);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="College canteen"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/fallback-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 to-secondary-950/60 backdrop-blur-sm"></div>
        </div>

        <div className="container-custom relative z-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <motion.h1 
              className="text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Skip the Line. <br />
              <span className="text-primary-400">Eat On Time.</span>
            </motion.h1>
            <motion.p 
              className="text-white/80 text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Pre-order your meals from the college canteen and pick up without waiting. Smart eating for busy students.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/menu" className="btn btn-primary">
                View Menu
              </Link>
              <Link to="/time-slots" className="btn btn-ghost border-white/30 text-white hover:bg-white/10">
                Time Slots
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              className="w-1 h-3 rounded-full bg-white"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-neutral-800 dark:text-neutral-100">How It Works</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
              Get your favorite canteen food in three simple steps
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="glass-card p-8 text-center"
              variants={itemVariants}
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">1. Choose your meal</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Browse our daily menu and select your favorite dishes
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 text-center"
              variants={itemVariants}
            >
              <div className="bg-secondary-100 dark:bg-secondary-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">2. Pick a time slot</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Choose when you want to pick up your order
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 text-center"
              variants={itemVariants}
            >
              <div className="bg-accent-100 dark:bg-accent-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">3. Skip the line</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Show your QR code at pickup and enjoy your meal
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Today Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-neutral-800 dark:text-neutral-100">Trending Today</h2>
            <Link 
              to="/menu" 
              className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              View All
            </Link>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {trendingItems.map((item) => (
              <motion.div 
                key={item.id}
                className="glass-card glass-card-hover overflow-hidden"
                variants={itemVariants}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={imageError[item.id] ? '/fallback-food.jpg' : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    onError={() => handleImageError(item.id)}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{item.name}</h3>
                    <div className="bg-secondary-100 dark:bg-secondary-900/30 rounded-full px-2 py-1">
                      <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <Link 
                    to="/menu" 
                    className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white mb-6">Ready to skip the line?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Pre-order your favorite meals now and save time for what matters most.
            </p>
            <Link to="/menu" className="btn bg-white text-primary-600 hover:bg-neutral-100">
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;