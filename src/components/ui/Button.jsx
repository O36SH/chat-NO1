import React from 'react';
import { cn } from '../../utils/styles';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        isLoading && 'opacity-70 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;