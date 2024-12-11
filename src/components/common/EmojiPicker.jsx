import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { cn } from '../../utils/styles';

const emojiCategories = [
  {
    id: 'recent',
    label: 'الأخيرة',
    emojis: ['😊', '❤️', '👍', '🎉', '🔥', '😂', '🥰', '✨']
  },
  {
    id: 'smileys',
    label: 'الوجوه',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥳']
  },
  {
    id: 'emotions',
    label: 'المشاعر',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️']
  },
  {
    id: 'gestures',
    label: 'الإيماءات',
    emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐']
  },
  {
    id: 'nature',
    label: 'الطبيعة',
    emojis: ['🌺', '🌸', '💐', '🌷', '🌹', '🌻', '🌼', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🌍', '🌎', '🌏', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖']
  }
];

function EmojiPicker({ onEmojiSelect, isOpen, onClose }) {
  const { settings } = useSettings();
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0].id);
  const [recentEmojis, setRecentEmojis] = useState(() => {
    const saved = localStorage.getItem('recentEmojis');
    return saved ? JSON.parse(saved) : emojiCategories[0].emojis;
  });
  const pickerRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleEmojiSelect = (emoji) => {
    // Update recent emojis
    const newRecent = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 8);
    setRecentEmojis(newRecent);
    localStorage.setItem('recentEmojis', JSON.stringify(newRecent));
    
    // Call the parent handler
    onEmojiSelect(emoji);
    onClose();
  };

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`emoji-category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={pickerRef}
      className={cn(
        'absolute bottom-full mb-2 right-0',
        'w-80 rounded-lg shadow-xl',
        settings.darkMode ? 'bg-gray-800' : 'bg-white',
        'border overflow-hidden',
        settings.darkMode ? 'border-gray-700' : 'border-gray-200'
      )}
      style={{ height: '350px' }}
    >
      {/* Header */}
      <div className={cn(
        'p-3 border-b sticky top-0 z-10',
        settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <h3 className={cn(
          'text-sm font-medium text-center',
          settings.darkMode ? 'text-white' : 'text-gray-900'
        )}>
          الرموز التعبيرية
        </h3>
      </div>

      {/* Categories Navigation */}
      <div 
        ref={categoriesRef}
        className={cn(
          'flex overflow-x-auto sticky top-12 z-10 p-2 border-b',
          settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
          'scrollbar-hide'
        )}
      >
        {emojiCategories.map(category => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              'px-4 py-2 mx-1 rounded-md text-sm whitespace-nowrap transition-colors',
              activeCategory === category.id
                ? settings.darkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
                : settings.darkMode
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Emojis Grid */}
      <div className="overflow-y-auto h-[calc(100%-108px)]">
        {emojiCategories.map(category => (
          <div
            key={category.id}
            id={`emoji-category-${category.id}`}
            className="p-2"
          >
            <div className={cn(
              'text-xs font-medium px-2 py-1 sticky top-0',
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              {category.label}
            </div>
            <div className="grid grid-cols-8 gap-1 mt-1">
              {(category.id === 'recent' ? recentEmojis : category.emojis).map((emoji, index) => (
                <button
                  key={`${category.id}-${index}`}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={cn(
                    'w-9 h-9 flex items-center justify-center rounded-lg text-xl',
                    'hover:scale-110 transition-all duration-150',
                    settings.darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmojiPicker;