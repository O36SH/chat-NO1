import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import PageContainer from '../components/PageContainer';
import UserAvatar from '../components/UserAvatar';
import UserLevelDisplay from '../components/UserLevelDisplay';

function Chats() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState('all');
  const [chats, setChats] = useState({
    direct: [
      { id: 1, name: "أحمد", lastMessage: "مرحباً، كيف حالك؟", time: "10:30", unread: 2, level: 5 },
      { id: 2, name: "محمد", lastMessage: "هل أنت جاهز للاجتماع؟", time: "09:15", unread: 0, level: 8 }
    ],
    rooms: [
      { id: 3, name: "غرفة التقنية", lastMessage: "شكراً جزيلاً", time: "أمس", unread: 0, level: 3 }
    ]
  });

  const tabs = [
    { id: 'all', label: 'عام' },
    { id: 'rooms', label: 'غرف' },
    { id: 'direct', label: 'خاص' }
  ];

  const getFilteredChats = () => {
    switch (activeTab) {
      case 'rooms':
        return chats.rooms;
      case 'direct':
        return chats.direct;
      default:
        return [...chats.direct, ...chats.rooms];
    }
  };

  const handleChatClick = (chatId, isRoom) => {
    navigate(isRoom ? `/rooms/${chatId}` : `/chats/${chatId}`);
  };

  return (
    <PageContainer>
      <div className="h-screen flex flex-col">
        {/* Tabs Header */}
        <div className={`flex-none ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 text-center transition-colors relative ${
                    activeTab === tab.id
                      ? settings.darkMode
                        ? 'text-white'
                        : 'text-blue-600'
                      : settings.darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      settings.darkMode ? 'bg-blue-500' : 'bg-blue-600'
                    }`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className={`divide-y ${
              settings.darkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {getFilteredChats().map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id, activeTab === 'rooms')}
                  className={`flex items-center justify-between p-4 cursor-pointer ${
                    settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <UserAvatar user={chat} />
                      {chat.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <UserLevelDisplay level={chat.level} />
                        <h3 className={`font-semibold ${
                          settings.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {chat.name}
                        </h3>
                      </div>
                      <p className={`text-sm ${
                        settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {chat.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Chats;