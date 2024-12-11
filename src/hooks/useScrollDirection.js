import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction === 'down' && currentScrollY > 20) {
        setIsVisible(false);
      } else if (direction === 'up') {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY;

      // If pulling up with enough force
      if (diff < -50) {
        setIsVisible(true);
      }
      // If pulling down with enough force
      else if (diff > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lastScrollY, touchStartY]);

  return isVisible;
}