import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const { settings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className={`fixed bottom-20 left-4 p-3 rounded-full shadow-lg z-50 ${
            settings.darkMode
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-50'
          }`}
        >
          <ArrowUpIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;