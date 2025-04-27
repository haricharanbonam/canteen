import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {user ? (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-neutral-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="btn btn-primary"
        >
          Sign In
        </button>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default UserMenu;