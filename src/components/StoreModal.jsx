import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  XMarkIcon, 
  CurrencyDollarIcon, 
  CreditCardIcon,
  CommandLineIcon,
  SparklesIcon,
  GiftIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

function StoreModal({ onClose }) {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState('points');

  const pointsPackages = [
    { id: 1, points: 1000, price: 10, bonus: '10% إضافي' },
    { id: 2, points: 2500, price: 20, bonus: '15% إضافي' },
    { id: 3, points: 5000, price: 35, bonus: '20% إضافي' },
    { id: 4, points: 10000, price: 60, bonus: '25% إضافي' }
  ];

  const roomBots = [
    { 
      id: 1, 
      name: 'بوت الموسيقى',
      description: 'تشغيل الموسيقى في الغرف الصوتية',
      features: ['دعم يوتيوب وسبوتيفاي', 'قوائم تشغيل مخصصة', 'جودة صوت عالية'],
      price: 5000,
      icon: '🎵'
    },
    { 
      id: 2, 
      name: 'بوت الألعاب',
      description: 'ألعاب تفاعلية للغرف',
      features: ['تحديات جماعية', 'نظام نقاط', 'ترتيب المتصدرين'],
      price: 3000,
      icon: '🎮'
    },
    { 
      id: 3, 
      name: 'بوت المسابقات',
      description: 'إدارة المسابقات والفعاليات',
      features: ['أسئلة متنوعة', 'جوائز تلقائية', 'إحصائيات مفصلة'],
      price: 4000,
      icon: '🏆'
    }
  ];

  const tabs = [
    { id: 'points', label: 'شراء النقاط', icon: CurrencyDollarIcon },
    { id: 'bots', label: 'بوتات الغرف', icon: CommandLineIcon },
    { id: 'special', label: 'عروض خاصة', icon: SparklesIcon }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-4xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="w-8 h-8 text-blue-500" />
              <h3 className={`text-2xl font-bold ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                المتجر
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${
                settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? settings.darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : settings.darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'points' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pointsPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-6 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <CurrencyDollarIcon className="w-10 h-10 text-yellow-500" />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {pkg.bonus}
                        </div>
                      </div>
                      <span className={`text-2xl font-bold mr-3 ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {pkg.points.toLocaleString()}
                      </span>
                    </div>
                    <span className={`text-xl font-medium ${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      ${pkg.price}
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg ${
                      settings.darkMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white flex items-center justify-center text-lg font-medium transition-colors`}
                  >
                    <CreditCardIcon className="w-6 h-6 mr-2" />
                    شراء
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bots' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roomBots.map((bot) => (
                <div
                  key={bot.id}
                  className={`rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl">{bot.icon}</span>
                      <h4 className={`text-xl font-bold mt-2 ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {bot.name}
                      </h4>
                      <p className={`text-sm mt-2 ${
                        settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {bot.description}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {bot.features.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-center text-sm ${
                            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          <span className="mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-lg font-bold ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {bot.price.toLocaleString()}
                      </span>
                      <CurrencyDollarIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-b-lg ${
                      settings.darkMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white font-medium transition-colors`}
                  >
                    شراء
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'special' && (
            <div className="text-center py-12">
              <GiftIcon className={`w-16 h-16 mx-auto mb-4 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <h4 className={`text-xl font-bold ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                قريباً!
              </h4>
              <p className={`mt-2 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ترقبوا العروض الخاصة والمميزات الحصرية
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreModal;