import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useChat } from '../contexts/ChatContext';
import PageContainer from '../components/PageContainer';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import RoomMembersList from '../components/RoomMembersList';
import VoiceStage from '../components/VoiceStage';
import VoiceStageSettings from '../components/VoiceStageSettings';
import RoomSettings from '../components/RoomSettings';
import { UserGroupIcon, ChevronRightIcon, MicrophoneIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/styles';

function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { roomMessages, sendRoomMessage } = useChat();
  const messagesEndRef = useRef(null);
  const [showMembers, setShowMembers] = useState(false);
  const [showVoiceStage, setShowVoiceStage] = useState(false);
  const [showStageSettings, setShowStageSettings] = useState(false);
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  const [stageSettings, setStageSettings] = useState({
    layout: 'grid',
    maxSpeakers: '6',
    permissions: 'approved',
    raiseHand: true,
    autoMute: true
  });

  const messages = roomMessages[roomId] || [];
  const dummyUser = {
    id: "12345678",
    name: "المستخدم",
    bio: "نبذة عن المستخدم"
  };

  const room = {
    id: roomId,
    name: "غرفة التقنية",
    isActive: true,
    image: null,
    description: "غرفة للنقاش حول أحدث التقنيات والتطورات التكنولوجية",
    members: [
      { id: "12345678", name: "أحمد", isOnline: true, role: 'admin' },
      { id: "23456789", name: "محمد", isOnline: false, role: 'member' },
      { id: "34567890", name: "سارة", isOnline: true, role: 'member' },
      { id: "45678901", name: "خالد", isOnline: true, role: 'member' },
      { id: "56789012", name: "فاطمة", isOnline: false, role: 'member' }
    ]
  };

  const handleUpdateStageSettings = (key, value) => {
    setStageSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUpdateRoomSettings = (updatedSettings) => {
    console.log('Updated room settings:', updatedSettings);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isRoomOwner = room.members[0].id === "12345678";

  return (
    <PageContainer>
      <div className="h-screen flex flex-col">
        {/* Room Header */}
        <div className={cn(
          'sticky top-0 z-20',
          settings.darkMode ? 'bg-gray-800' : 'bg-white',
          'shadow-md'
        )}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className={cn(
                    'p-2 rounded-full',
                    settings.darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  )}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => isRoomOwner && setShowRoomSettings(true)}
                  className={cn(
                    'w-12 h-12 rounded-lg overflow-hidden mr-2',
                    settings.darkMode ? 'bg-gray-700' : 'bg-gray-200',
                    'flex items-center justify-center',
                    isRoomOwner && 'hover:opacity-80',
                    'transition-opacity'
                  )}
                >
                  {room.image ? (
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserGroupIcon className={cn(
                      'w-8 h-8',
                      settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                    )} />
                  )}
                </button>
                <div>
                  <h2 className={cn(
                    'font-semibold',
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  )}>
                    {room.name}
                  </h2>
                  <div className="flex items-center">
                    <span className={cn(
                      'text-sm flex items-center',
                      room.isActive ? 'text-green-500' : 'text-gray-500'
                    )}>
                      <span className={cn(
                        'w-2 h-2 rounded-full mr-1',
                        room.isActive ? 'bg-green-500' : 'bg-gray-500'
                      )}></span>
                      {room.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {showVoiceStage && isRoomOwner && (
                  <button
                    onClick={() => setShowStageSettings(true)}
                    className={cn(
                      'p-2 rounded-full',
                      settings.darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                    )}
                  >
                    <Cog6ToothIcon className="h-6 w-6" />
                  </button>
                )}
                <button
                  onClick={() => setShowVoiceStage(!showVoiceStage)}
                  className={cn(
                    'p-2 rounded-full',
                    settings.darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600',
                    showVoiceStage && 'bg-blue-500 text-white hover:bg-blue-600'
                  )}
                >
                  <MicrophoneIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setShowMembers(true)}
                  className={cn(
                    'p-2 rounded-full',
                    settings.darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  )}
                >
                  <UserGroupIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-4 pb-32">
            {/* Voice Stage */}
            {showVoiceStage && (
              <div className={cn(
                'border-b mb-4',
                settings.darkMode ? 'border-gray-700' : 'border-gray-200'
              )}>
                <VoiceStage embedded={true} settings={stageSettings} />
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === '12345678'}
                user={dummyUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={(content) => sendRoomMessage(roomId, content)} />
      </div>

      {showMembers && (
        <RoomMembersList
          isOpen={showMembers}
          onClose={() => setShowMembers(false)}
          members={room.members}
        />
      )}

      {showStageSettings && (
        <VoiceStageSettings
          isOpen={showStageSettings}
          onClose={() => setShowStageSettings(false)}
          settings={stageSettings}
          onUpdateSettings={handleUpdateStageSettings}
        />
      )}

      {showRoomSettings && (
        <RoomSettings
          room={room}
          onClose={() => setShowRoomSettings(false)}
          onUpdate={handleUpdateRoomSettings}
        />
      )}
    </PageContainer>
  );
}

export default ChatRoom;