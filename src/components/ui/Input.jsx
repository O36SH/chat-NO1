import React from 'react';
import { cn } from '../../utils/styles';

function Input({
  className,
  error,
  icon: Icon,
  ...props
}) {
  return (
    <div className="relative">
      <input
        className={cn(
          'w-full px-4 py-2 rounded-lg border transition-colors',
          'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          Icon && 'pl-11',
          error
            ? 'border-red-500 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-700',
          'text-gray-900 dark:text-white',
          className
        )}
        {...props}
      />
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Input;