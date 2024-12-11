import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  const { settings } = useSettings();

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === category.id
              ? settings.darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : settings.darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;