import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    const success = register(formData);
    if (success) {
      // Redirect to login page after successful registration
      navigate('/login');
    } else {
      setError('حدث خطأ أثناء التسجيل');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full mx-4 ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-lg p-8`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إنشاء حساب جديد
          </h2>
          <p className={`mt-2 ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            انضم إلينا اليوم!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              البريد الإلكتروني
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg border ${
                  settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="أدخل بريدك الإلكتروني"
              />
              <EnvelopeIcon className={`absolute left-3 top-3.5 h-5 w-5 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              كلمة المرور
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg border ${
                  settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="أدخل كلمة المرور"
              />
              <LockClosedIcon className={`absolute left-3 top-3.5 h-5 w-5 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${
                settings.darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              تأكيد كلمة المرور
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg border ${
                  settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="أعد إدخال كلمة المرور"
              />
              <LockClosedIcon className={`absolute left-3 top-3.5 h-5 w-5 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg ${
              settings.darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium transition-colors`}
          >
            إنشاء حساب
          </button>

          <p className="text-center text-sm">
            <Link
              to="/login"
              className={`${
                settings.darkMode ? 'text-blue-400' : 'text-blue-600'
              } hover:underline`}
            >
              لديك حساب بالفعل؟ سجل دخولك
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;