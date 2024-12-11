import React from 'react';
import { EyeIcon, UserGroupIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import BackButton from '../components/BackButton';

function PrivacySettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  const privacySettings = [
    {
      title: 'الحساب',
      items: [
        {
          id: 'profileVisibility',
          label: 'ظهور الملف الشخصي',
          description: 'من يمكنه رؤية ملفك الشخصي',
          icon: EyeIcon,
          type: 'select',
          value: settings.profileVisibility || 'public',
          options: [
            { value: 'public', label: 'الجميع' },
            { value: 'friends', label: 'الأصدقاء فقط' },
            { value: 'private', label: 'لا أحد' }
          ]
        },
        {
          id: 'onlineStatus',
          label: 'حالة الاتصال',
          description: 'إظهار حالة اتصالك للآخرين',
          icon: UserGroupIcon,
          type: 'switch',
          value: settings.onlineStatus ?? true
        }
      ]
    },
    {
      title: 'الأمان',
      items: [
        {
          id: 'twoFactorAuth',
          label: 'المصادقة الثنائية',
          description: 'تفعيل المصادقة الثنائية لحماية حسابك',
          icon: ShieldCheckIcon,
          type: 'switch',
          value: settings.twoFactorAuth ?? false
        },
        {
          id: 'loginNotifications',
          label: 'إشعارات تسجيل الدخول',
          description: 'تلقي إشعار عند تسجيل الدخول من جهاز جديد',
          icon: BellIcon,
          type: 'switch',
          value: settings.loginNotifications ?? true
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center h-16">
            <BackButton />
            <h1 className={`text-xl font-bold mr-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
              الخصوصية والأمان
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {privacySettings.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {section.title}
            </h2>
            <div className={`${
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-sm`}>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border-b last:border-b-0 ${
                    settings.darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <item.icon className={`h-6 w-6 ${
                        settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {item.type === 'switch' && (
                      <button
                        onClick={() => updateSettings(item.id, !item.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-blue-600' : settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    {item.type === 'select' && (
                      <select
                        value={item.value}
                        onChange={(e) => updateSettings(item.id, e.target.value)}
                        className={`form-select rounded-md ${
                          settings.darkMode
                            ? 'bg-gray-700 text-white border-gray-600'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {item.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivacySettings;