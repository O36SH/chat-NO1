// Analytics utility for tracking user behavior and app performance
export const analytics = {
  // Track user actions
  trackEvent: (eventName, data = {}) => {
    try {
      console.log(`[Analytics] ${eventName}:`, data);
      // Here you would typically send data to your analytics service
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Track performance metrics
  trackPerformance: (metric) => {
    try {
      const { name, value, rating } = metric;
      console.log(`[Performance] ${name}: ${value}ms (${rating})`);
      // Here you would typically send performance data to your monitoring service
    } catch (error) {
      console.error('Performance tracking error:', error);
    }
  },

  // Track errors
  trackError: (error, context = {}) => {
    try {
      console.error(`[Error] ${error.message}`, {
        stack: error.stack,
        context
      });
      // Here you would typically send error data to your error tracking service
    } catch (err) {
      console.error('Error tracking failed:', err);
    }
  }
};