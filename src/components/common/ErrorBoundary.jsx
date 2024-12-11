import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً، حدث خطأ ما</h2>
            <p className="text-gray-600 mb-4">يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;