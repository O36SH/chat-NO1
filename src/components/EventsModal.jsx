import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { XMarkIcon, CalendarIcon, TrophyIcon } from '@heroicons/react/24/outline';

function EventsModal({ onClose }) {
  const { settings } = useSettings();

  const events = [
    {
      id: 1,
      title: 'مسابقة التفاعل',
      description: 'شارك في المحادثات واربح نقاط إضافية',
      reward: 1000,
      endDate: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'تحدي المستوى',
      description: 'اصل إلى المستوى 10 واربح مكافآت خاصة',
      reward: 2000,
      endDate: '2024-01-20',
      progress: 45
    },
    {
      id: 3,
      title: 'حدث خاص',
      description: 'شارك في الغرف الصوتية واربح هدايا قيمة',
      reward: 1500,
      endDate: '2024-01-25',
      progress: 30
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              الأحداث الجارية
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${
                settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg ${
                  settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className={`font-medium ${
                      settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.title}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {event.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <TrophyIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className={`font-medium ${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {event.reward.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      التقدم
                    </span>
                    <span className={settings.darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {event.progress}%
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${
                    settings.darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${event.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center mt-3 text-sm">
                  <CalendarIcon className={`h-4 w-4 ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`mr-1 ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ينتهي في {new Date(event.endDate).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsModal;