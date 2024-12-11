import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  MicrophoneIcon, 
  SpeakerWaveIcon,
  UserGroupIcon,
  LockClosedIcon,
  HandRaisedIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

function VoiceStageSettings({ isOpen, onClose, settings: stageSettings, onUpdateSettings }) {
  const { settings } = useSettings();

  const settingsOptions = [
    {
      id: 'layout',
      label: 'تخطيط المنصة',
      icon: PaintBrushIcon,
      type: 'select',
      options: [
        { value: 'grid', label: 'شبكة' },
        { value: 'theater', label: 'مسرح' },
        { value: 'circle', label: 'دائري' }
      ]
    },
    {
      id: 'maxSpeakers',
      label: 'الحد الأقصى للمتحدثين',
      icon: MicrophoneIcon,
      type: 'select',
      options: [
        { value: '6', label: '6 متحدثين' },
        { value: '8', label: '8 متحدثين' },
        { value: '12', label: '12 متحدث' }
      ]
    },
    {
      id: 'permissions',
      label: 'صلاحيات المتحدثين',
      icon: LockClosedIcon,
      type: 'select',
      options: [
        { value: 'all', label: 'الجميع' },
        { value: 'approved', label: 'موافقة المشرف' },
        { value: 'members', label: 'الأعضاء فقط' }
      ]
    },
    {
      id: 'raiseHand',
      label: 'طلب التحدث',
      icon: HandRaisedIcon,
      type: 'switch',
      description: 'السماح للمستخدمين بطلب الإذن للتحدث'
    },
    {
      id: 'autoMute',
      label: 'كتم تلقائي',
      icon: SpeakerWaveIcon,
      type: 'switch',
      description: 'كتم صوت المتحدثين الجدد تلقائياً'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-6 ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إعدادات المنصة الصوتية
          </h3>

          <div className="space-y-6">
            {settingsOptions.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <option.icon className={`w-5 h-5 ${
                      settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <label className={`font-medium ${
                      settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </label>
                  </div>
                  {option.type === 'select' && (
                    <select
                      value={stageSettings[option.id]}
                      onChange={(e) => onUpdateSettings(option.id, e.target.value)}
                      className={`rounded-md border ${
                        settings.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } px-3 py-1.5 focus:ring-2 focus:ring-blue-500`}
                    >
                      {option.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {option.type === 'switch' && (
                    <button
                      onClick={() => onUpdateSettings(option.id, !stageSettings[option.id])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        stageSettings[option.id]
                          ? 'bg-blue-600'
                          : settings.darkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          stageSettings[option.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                </div>
                {option.description && (
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {option.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                settings.darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceStageSettings;