import React from 'react';
import { 
  MoonIcon, 
  SunIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  LanguageIcon, 
  PaintBrushIcon,
  ChevronLeftIcon,
  SpeakerWaveIcon,
  CogIcon,
  CloudIcon,
  EyeIcon,
  HandRaisedIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import BackButton from '../components/BackButton';
import { cn } from '../utils/styles';

function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings, isDefault } = useSettings();

  const settingsSections = [
    {
      title: 'المظهر',
      items: [
        {
          id: 'darkMode',
          label: 'الوضع الليلي',
          icon: settings.darkMode ? MoonIcon : SunIcon,
          type: 'switch',
          value: settings.darkMode
        },
        {
          id: 'theme',
          label: 'لون التطبيق',
          icon: PaintBrushIcon,
          type: 'select',
          value: settings.theme,
          options: ['أزرق', 'أخضر', 'أرجواني', 'برتقالي']
        },
        {
          id: 'fontSize',
          label: 'حجم الخط',
          icon: HandRaisedIcon,
          type: 'select',
          value: settings.fontSize,
          options: ['صغير', 'متوسط', 'كبير']
        }
      ]
    },
    {
      title: 'إعدادات المحادثة',
      items: [
        {
          id: 'notifications',
          label: 'الإشعارات',
          icon: BellIcon,
          type: 'switch',
          value: settings.notifications
        },
        {
          id: 'soundEffects',
          label: 'المؤثرات الصوتية',
          icon: SpeakerWaveIcon,
          type: 'switch',
          value: settings.soundEffects
        },
        {
          id: 'messagePreview',
          label: 'معاينة الرسائل',
          icon: EyeIcon,
          type: 'switch',
          value: settings.messagePreview
        },
        {
          id: 'readReceipts',
          label: 'إشعار القراءة',
          type: 'switch',
          value: settings.readReceipts
        },
        {
          id: 'typingIndicator',
          label: 'مؤشر الكتابة',
          type: 'switch',
          value: settings.typingIndicator
        }
      ]
    },
    {
      title: 'الخصوصية والأمان',
      items: [
        {
          id: 'privacy',
          label: 'إعدادات الخصوصية',
          icon: ShieldCheckIcon,
          type: 'link',
          onClick: () => navigate('/settings/privacy')
        }
      ]
    },
    {
      title: 'الصوت والفيديو',
      items: [
        {
          id: 'autoPlayVoice',
          label: 'تشغيل الرسائل الصوتية تلقائياً',
          type: 'switch',
          value: settings.autoPlayVoice
        },
        {
          id: 'autoPlayVideo',
          label: 'تشغيل مقاطع الفيديو تلقائياً',
          type: 'switch',
          value: settings.autoPlayVideo
        },
        {
          id: 'noiseCancellation',
          label: 'إلغاء الضوضاء',
          type: 'switch',
          value: settings.noiseCancellation
        }
      ]
    },
    {
      title: 'التخزين والبيانات',
      items: [
        {
          id: 'autoDownload.images',
          label: 'تنزيل الصور تلقائياً',
          icon: CloudIcon,
          type: 'switch',
          value: settings.autoDownload.images
        },
        {
          id: 'autoDownload.videos',
          label: 'تنزيل الفيديو تلقائياً',
          type: 'switch',
          value: settings.autoDownload.videos
        },
        {
          id: 'autoDownload.documents',
          label: 'تنزيل المستندات تلقائياً',
          type: 'switch',
          value: settings.autoDownload.documents
        }
      ]
    },
    {
      title: 'إمكانية الوصول',
      items: [
        {
          id: 'reduceMotion',
          label: 'تقليل الحركة',
          type: 'switch',
          value: settings.reduceMotion
        },
        {
          id: 'highContrast',
          label: 'تباين عالي',
          type: 'switch',
          value: settings.highContrast
        },
        {
          id: 'largeText',
          label: 'نص كبير',
          type: 'switch',
          value: settings.largeText
        }
      ]
    },
    {
      title: 'اللغة',
      items: [
        {
          id: 'language',
          label: 'لغة التطبيق',
          icon: LanguageIcon,
          type: 'select',
          value: settings.language,
          options: ['العربية', 'English']
        }
      ]
    }
  ];

  return (
    <div className={cn(
      'min-h-screen',
      settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <div className={cn(
        'sticky top-0 z-20',
        settings.darkMode ? 'bg-gray-800' : 'bg-white',
        'shadow'
      )}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BackButton />
              <h1 className={cn(
                'text-xl font-bold mr-4',
                settings.darkMode ? 'text-white' : 'text-gray-800'
              )}>
                الإعدادات
              </h1>
            </div>
            {!isDefault && (
              <button
                onClick={resetSettings}
                className={cn(
                  'p-2 rounded-full',
                  settings.darkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className={cn(
              'text-lg font-semibold mb-4',
              settings.darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {section.title}
            </h2>
            <div className={cn(
              'rounded-xl shadow-sm',
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            )}>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center justify-between p-4 border-b last:border-b-0',
                    settings.darkMode ? 'border-gray-700' : 'border-gray-200'
                  )}
                  onClick={item.type === 'link' ? item.onClick : undefined}
                  style={item.type === 'link' ? { cursor: 'pointer' } : undefined}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && React.createElement(item.icon, {
                      className: cn(
                        'h-6 w-6',
                        settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                      )
                    })}
                    <span className={cn(
                      'font-medium',
                      settings.darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      {item.label}
                    </span>
                  </div>
                  {item.type === 'switch' && (
                    <button
                      onClick={() => updateSettings(item.id, !item.value)}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        item.value 
                          ? 'bg-blue-600' 
                          : settings.darkMode 
                          ? 'bg-gray-600' 
                          : 'bg-gray-200'
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  )}
                  {item.type === 'select' && (
                    <select
                      value={item.value}
                      onChange={(e) => updateSettings(item.id, e.target.value)}
                      className={cn(
                        'form-select rounded-md',
                        settings.darkMode
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-white text-gray-700 border-gray-300'
                      )}
                    >
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {item.type === 'link' && (
                    <ChevronLeftIcon className={cn(
                      'h-5 w-5',
                      settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;