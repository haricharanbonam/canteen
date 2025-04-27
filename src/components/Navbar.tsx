import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCartStore } from '../stores/cartStore';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { items } = useCartStore();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Time Slots', path: '/time-slots' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Canteen<span className="text-primary-500">Buddy</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium text-sm transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-primary-500'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-neutral-700" />
            )}
          </button>

          <Link 
            to="/order-summary" 
            className="relative p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-primary-500 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <UserMenu />
        </div>

        <div className="flex items-center md:hidden space-x-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-neutral-700" />
            )}
          </button>

          <Link 
            to="/order-summary" 
            className="relative p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-primary-500 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-0 left-0 w-full h-screen bg-white dark:bg-neutral-950 z-50"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                      Canteen<span className="text-primary-500">Buddy</span>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 py-8">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-2xl font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-500'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <UserMenu />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;