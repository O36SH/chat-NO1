import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const gradients = {
  primary: 'bg-gradient-to-r from-primary-600 to-secondary-600',
  secondary: 'bg-gradient-to-r from-secondary-600 to-primary-600',
  subtle: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
};

export const transitions = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
};

export const animations = {
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  pulse: 'animate-pulse',
  float: 'animate-float',
  gradient: 'animate-gradient',
};

export const glassmorphism = {
  light: 'bg-white/80 backdrop-blur-lg',
  dark: 'bg-gray-900/80 backdrop-blur-lg',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  inner: 'shadow-inner',
  none: 'shadow-none',
};

export const borders = {
  none: 'border-0',
  sm: 'border border-gray-200 dark:border-gray-700',
  md: 'border-2 border-gray-200 dark:border-gray-700',
  lg: 'border-4 border-gray-200 dark:border-gray-700',
};

export const focus = {
  primary: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none',
  secondary: 'focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:outline-none',
};

export const hover = {
  scale: 'hover:scale-105',
  brightness: 'hover:brightness-110',
  opacity: 'hover:opacity-80',
};