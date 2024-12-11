import React from 'react';
import { cn, glassmorphism } from '../../utils/styles';

function Card({
  children,
  className,
  glass = false,
  hover = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-xl',
        glass ? glassmorphism.light : 'bg-white dark:bg-gray-800',
        hover && 'transition-transform hover:scale-[1.02]',
        'shadow-md dark:shadow-gray-900/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;