import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import SearchBar from './rooms/SearchBar';
import CategoryFilter from './rooms/CategoryFilter';
import RoomCard from './rooms/RoomCard';
import EmptyResults from './rooms/EmptyResults';
import { useRooms } from '../hooks/useRooms';

function RoomDiscoveryModal({ onClose, onJoinRoom }) {
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { discoveredRooms, categories } = useRooms();

  const filteredRooms = discoveredRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-4xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              اكتشف الغرف
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

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRooms.map((room) => (
              <RoomCard 
                key={room.id}
                room={room}
                onJoin={onJoinRoom}
              />
            ))}
          </div>

          {filteredRooms.length === 0 && <EmptyResults />}
        </div>
      </div>
    </div>
  );
}

export default RoomDiscoveryModal;