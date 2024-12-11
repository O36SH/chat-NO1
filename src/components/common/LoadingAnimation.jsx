import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useSettings } from '../../contexts/SettingsContext';

function LoadingAnimation({ size = 'md' }) {
  const { settings } = useSettings();
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: settings.darkMode 
          ? '/animations/loading-dark.json'
          : '/animations/loading-light.json'
      });

      return () => animationRef.current?.destroy();
    }
  }, [settings.darkMode]);

  return (
    <div 
      ref={containerRef} 
      className={`${sizeClasses[size]} mx-auto`}
    />
  );
}

export default LoadingAnimation;