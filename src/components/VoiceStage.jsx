import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { MicrophoneIcon, SpeakerWaveIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';

function VoiceStage({ embedded = false, settings: stageSettings = {} }) {
  const { settings } = useSettings();
  const [slots, setSlots] = useState(Array(Number(stageSettings.maxSpeakers || 6)).fill(null));
  const [localStream, setLocalStream] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [listenerCount, setListenerCount] = useState(12);

  const handleJoinStage = async (slotIndex) => {
    try {
      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
      }
      
      setSlots(prev => {
        const newSlots = [...prev];
        newSlots[slotIndex] = {
          userId: "12345678",
          name: "أنت",
          isSpeaking: true,
          isMuted: stageSettings.autoMute
        };
        return newSlots;
      });
      setActiveSlot(slotIndex);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const handleLeaveStage = (slotIndex) => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    setSlots(prev => {
      const newSlots = [...prev];
      newSlots[slotIndex] = null;
      return newSlots;
    });
    setActiveSlot(null);
  };

  const getLayoutClasses = () => {
    switch (stageSettings.layout) {
      case 'theater':
        return 'grid-cols-3';
      case 'circle':
        return 'grid-cols-4';
      default:
        return 'grid-cols-6';
    }
  };

  const content = (
    <div className="w-full">
      {/* Voice Stage Grid */}
      <div className={`grid ${getLayoutClasses()} gap-2 px-2 py-2`}>
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              settings.darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {slot ? (
              <div className="relative group w-full">
                <div className={`relative aspect-square rounded-lg overflow-hidden ${
                  slot.isSpeaking 
                    ? 'ring-2 ring-green-500 ring-offset-2' 
                    : settings.darkMode 
                    ? 'ring-1 ring-gray-600' 
                    : 'ring-1 ring-gray-200'
                } ${settings.darkMode ? 'ring-offset-gray-800' : 'ring-offset-white'}`}>
                  <UserAvatar user={{ id: slot.userId, name: slot.name }} size="lg" />
                  {slot.isSpeaking && !slot.isMuted && (
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent" />
                  )}
                </div>
                {slot.isSpeaking && !slot.isMuted && (
                  <div className="absolute -bottom-1 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <SpeakerWaveIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                {activeSlot === index && (
                  <button
                    onClick={() => handleLeaveStage(index)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleJoinStage(index)}
                className={`w-full aspect-square flex items-center justify-center rounded-lg transition-all transform hover:scale-105 ${
                  settings.darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  settings.darkMode 
                    ? 'shadow-[0_0_15px_rgba(0,0,0,0.3)]' 
                    : 'shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                <MicrophoneIcon className={`w-6 h-6 ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </button>
            )}
            {slot && (
              <span className={`mt-1 text-xs font-medium truncate w-full text-center ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {slot.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Listener Count */}
      <div className={`flex items-center justify-center px-4 py-2 mt-2 ${
        settings.darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <UserGroupIcon className="w-5 h-5 mr-2" />
        <span className="text-sm">{listenerCount}</span>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {content}
      </div>
    </div>
  );
}

export default VoiceStage;