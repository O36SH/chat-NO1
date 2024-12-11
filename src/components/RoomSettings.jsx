import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  XMarkIcon,
  MicrophoneIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import ImageUpload from './common/ImageUpload';

function RoomSettings({ room, onClose, onUpdate }) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: room.name,
    description: room.description || '',
    image: room.image || null,
    maxMembers: '3000',
    isPrivate: false,
    allowVoiceStage: true,
    autoApproveMembers: true,
    allowChat: true,
    allowFiles: true,
    allowLinks: true,
    moderation: 'auto',
    notifications: 'all',
    language: 'ar',
    customization: {
      theme: 'default',
      allowCustomColors: true,
      allowCustomEmojis: true
    },
    voiceStage: {
      layout: 'grid',
      maxSpeakers: 6,
      permissions: 'approved',
      raiseHand: true,
      autoMute: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVoiceStageChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      voiceStage: {
        ...prev.voiceStage,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  const renderSection = (title, icon, children) => (
    <div className="border-b last:border-b-0 pb-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        {icon && React.createElement(icon, {
          className: `w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`
        })}
        <h3 className={`text-lg font-medium ${
          settings.darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  const renderSwitch = (label, name, description = '') => (
    <div className="flex items-center justify-between py-2">
      <div>
        <label className={`text-sm font-medium ${
          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {label}
        </label>
        {description && (
          <p className={`text-xs mt-1 ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleChange({
          target: { name, type: 'checkbox', checked: !formData[name] }
        })}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          formData[name]
            ? 'bg-blue-600'
            : settings.darkMode
            ? 'bg-gray-600'
            : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            formData[name] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      } max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إعدادات الغرفة
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderSection('المعلومات الأساسية', null, (
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(image) => setFormData(prev => ({ ...prev, image }))}
                  onImageRemove={() => setFormData(prev => ({ ...prev, image: null }))}
                  size="lg"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  اسم الغرفة
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  وصف الغرفة
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          ))}

          {renderSection('إعدادات المنصة الصوتية', MicrophoneIcon, (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  تخطيط المنصة
                </label>
                <select
                  name="voiceStage.layout"
                  value={formData.voiceStage.layout}
                  onChange={(e) => handleVoiceStageChange('layout', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="grid">شبكة</option>
                  <option value="theater">مسرح</option>
                  <option value="circle">دائري</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  عدد المايكات
                </label>
                <select
                  name="voiceStage.maxSpeakers"
                  value={formData.voiceStage.maxSpeakers}
                  onChange={(e) => handleVoiceStageChange('maxSpeakers', parseInt(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="6">6 مايكات</option>
                  <option value="8">8 مايكات</option>
                  <option value="12">12 مايك</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  صلاحيات التحدث
                </label>
                <select
                  name="voiceStage.permissions"
                  value={formData.voiceStage.permissions}
                  onChange={(e) => handleVoiceStageChange('permissions', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    settings.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all">الجميع</option>
                  <option value="approved">موافقة المشرف</option>
                  <option value="members">الأعضاء فقط</option>
                </select>
              </div>

              <div className="space-y-2">
                {renderSwitch('طلب التحدث', 'voiceStage.raiseHand')}
                {renderSwitch('كتم تلقائي للمايك', 'voiceStage.autoMute')}
              </div>
            </div>
          ))}

          {renderSection('الصلاحيات', ShieldCheckIcon, (
            <div className="space-y-2">
              {renderSwitch('غرفة خاصة', 'isPrivate', 'التحكم في من يمكنه الانضمام للغرفة')}
              {renderSwitch('الموافقة التلقائية', 'autoApproveMembers', 'قبول طلبات الانضمام تلقائياً')}
              {renderSwitch('المحادثات النصية', 'allowChat', 'السماح بالمحادثات النصية')}
              {renderSwitch('مشاركة الملفات', 'allowFiles', 'السماح بمشاركة الملفات والوسائط')}
              {renderSwitch('مشاركة الروابط', 'allowLinks', 'السماح بمشاركة الروابط')}
            </div>
          ))}

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                settings.darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                settings.darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomSettings;