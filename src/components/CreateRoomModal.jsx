import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  XMarkIcon, 
  PhotoIcon,
  HashtagIcon,
  TagIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import { generateRoomId } from '../utils/roomGenerator';

function CreateRoomModal({ onClose, onCreateRoom }) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general',
    tags: [],
    newTag: '',
    isPrivate: false,
    maxMembers: '500',
    allowVoiceStage: true,
    autoApproveMembers: true,
    allowChat: true,
    allowFiles: true,
    allowLinks: true,
    moderation: 'auto',
    notifications: 'all',
    language: 'ar',
    ageRestriction: false,
    minAge: '13',
    welcomeMessage: '',
    rules: '',
    customization: {
      theme: 'default',
      allowCustomColors: true,
      allowCustomEmojis: true
    }
  });

  const categories = [
    { value: 'general', label: 'عام' },
    { value: 'gaming', label: 'ألعاب' },
    { value: 'technology', label: 'تقنية' },
    { value: 'education', label: 'تعليم' },
    { value: 'art', label: 'فن وإبداع' },
    { value: 'music', label: 'موسيقى' },
    { value: 'sports', label: 'رياضة' },
    { value: 'business', label: 'أعمال' },
    { value: 'social', label: 'اجتماعي' }
  ];

  const themes = [
    { value: 'default', label: 'الافتراضي' },
    { value: 'modern', label: 'عصري' },
    { value: 'classic', label: 'كلاسيكي' },
    { value: 'dark', label: 'داكن' },
    { value: 'light', label: 'فاتح' },
    { value: 'custom', label: 'مخصص' }
  ];

  const moderationLevels = [
    { value: 'auto', label: 'تلقائي' },
    { value: 'manual', label: 'يدوي' },
    { value: 'strict', label: 'صارم' },
    { value: 'relaxed', label: 'مرن' }
  ];

  const notificationSettings = [
    { value: 'all', label: 'جميع الإشعارات' },
    { value: 'mentions', label: 'الإشارات فقط' },
    { value: 'important', label: 'المهم فقط' },
    { value: 'none', label: 'بدون إشعارات' }
  ];

  const languages = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'all', label: 'كل اللغات' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      ...formData,
      id: generateRoomId(),
      createdAt: new Date().toISOString(),
      members: 1,
      isActive: true,
      owner: {
        id: "12345678",
        name: "أحمد",
        isOnline: true
      }
    };
    onCreateRoom(newRoom);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const renderSection = (title, children) => (
    <div className="space-y-4">
      <h4 className={`text-lg font-medium ${
        settings.darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h4>
      {children}
    </div>
  );

  const renderSwitch = (label, name, description = '') => (
    <div className="flex items-center justify-between">
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

  const renderSelect = (label, name, options, description = '') => (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium mb-2 ${
          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        {label}
      </label>
      {description && (
        <p className={`text-xs mb-2 ${
          settings.darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {description}
        </p>
      )}
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border ${
          settings.darkMode
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        } focus:ring-2 focus:ring-blue-500`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-4xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      } max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className={`sticky top-4 left-4 p-2 rounded-full ${
            settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h3 className={`text-2xl font-bold mb-8 ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إنشاء غرفة جديدة
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                {renderSection('المعلومات الأساسية', (
                  <>
                    {/* Room Image */}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className={`w-32 h-32 rounded-lg ${
                          settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        } flex items-center justify-center hover:opacity-80 transition-opacity`}
                      >
                        <PhotoIcon className={`w-12 h-12 ${
                          settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      </button>
                    </div>

                    {/* Room Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 ${
                          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        اسم الغرفة
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          settings.darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>

                    {/* Category */}
                    {renderSelect('التصنيف', 'category', categories)}

                    {/* Tags */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        الوسوم
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map(tag => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              settings.darkMode
                                ? 'bg-gray-700 text-white'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 hover:text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="newTag"
                          value={formData.newTag}
                          onChange={handleChange}
                          placeholder="أضف وسماً جديداً"
                          className={`flex-1 px-4 py-2 rounded-lg border ${
                            settings.darkMode
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-blue-500`}
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          إضافة
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className={`block text-sm font-medium mb-2 ${
                          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        وصف الغرفة
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          settings.darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </>
                ))}

                {renderSection('الإعدادات الأساسية', (
                  <>
                    {renderSwitch('غرفة خاصة', 'isPrivate', 'تحكم في من يمكنه الانضمام إلى الغرفة')}
                    {renderSelect('الحد الأقصى للأعضاء', 'maxMembers', [
                      { value: '500', label: '500 عضو' },
                      { value: '1000', label: '1000 عضو' },
                      { value: '2000', label: '2000 عضو' },
                      { value: '3000', label: '3000 عضو' }
                    ])}
                    {renderSelect('اللغة', 'language', languages)}
                  </>
                ))}
              </div>

              {/* Advanced Settings */}
              <div className="space-y-6">
                {renderSection('إعدادات متقدمة', (
                  <>
                    {renderSwitch('المنصة الصوتية', 'allowVoiceStage', 'السماح بالمحادثات الصوتية المباشرة')}
                    {renderSwitch('المحادثات النصية', 'allowChat', 'السماح بالمحادثات النصية')}
                    {renderSwitch('مشاركة الملفات', 'allowFiles', 'السماح بمشاركة الملفات والوسائط')}
                    {renderSwitch('مشاركة الروابط', 'allowLinks', 'السماح بمشاركة الروابط')}
                    {renderSelect('نظام الإشراف', 'moderation', moderationLevels)}
                    {renderSelect('الإشعارات', 'notifications', notificationSettings)}
                  </>
                ))}

                {renderSection('التخصيص', (
                  <>
                    {renderSelect('المظهر', 'customization.theme', themes)}
                    {renderSwitch('السماح بالألوان المخصصة', 'customization.allowCustomColors')}
                    {renderSwitch('السماح بالرموز التعبيرية المخصصة', 'customization.allowCustomEmojis')}
                  </>
                ))}

                {renderSection('قيود وقواعد', (
                  <>
                    {renderSwitch('تقييد العمر', 'ageRestriction')}
                    {formData.ageRestriction && (
                      <div>
                        <label
                          htmlFor="minAge"
                          className={`block text-sm font-medium mb-2 ${
                            settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        >
                          الحد الأدنى للعمر
                        </label>
                        <select
                          id="minAge"
                          name="minAge"
                          value={formData.minAge}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            settings.darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500`}
                        >
                          {[13, 16, 18, 21].map(age => (
                            <option key={age} value={age.toString()}>
                              {age} سنة
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="rules"
                        className={`block text-sm font-medium mb-2 ${
                          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        قواعد الغرفة
                      </label>
                      <textarea
                        id="rules"
                        name="rules"
                        rows="3"
                        value={formData.rules}
                        onChange={handleChange}
                        placeholder="أدخل قواعد الغرفة..."
                        className={`w-full px-4 py-2 rounded-lg border ${
                          settings.darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="welcomeMessage"
                        className={`block text-sm font-medium mb-2 ${
                          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        رسالة الترحيب
                      </label>
                      <textarea
                        id="welcomeMessage"
                        name="welcomeMessage"
                        rows="2"
                        value={formData.welcomeMessage}
                        onChange={handleChange}
                        placeholder="رسالة ترحيب للأعضاء الجدد..."
                        className={`w-full px-4 py-2 rounded-lg border ${
                          settings.darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
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
                إنشاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomModal;