import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useChat } from '../contexts/ChatContext';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import PageContainer from '../components/PageContainer';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import UserAvatar from '../components/UserAvatar';
import { cn } from '../utils/styles';

function DirectChat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { directMessages, sendDirectMessage } = useChat();
  const messagesEndRef = useRef(null);

  const messages = directMessages[userId] || [];
  const recipient = {
    id: userId,
    name: "أحمد محمد",
    status: "متصل",
    bio: "مطور تطبيقات ومهتم بالتكنولوجيا"
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <PageContainer>
      <div className="h-screen flex flex-col">
        {/* Chat Header */}
        <div className={cn(
          'sticky top-0 z-20',
          settings.darkMode ? 'bg-gray-800' : 'bg-white',
          'shadow-md'
        )}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center h-16 px-4">
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
              <UserAvatar user={recipient} size="md" />
              <div className="mr-4">
                <h2 className={cn(
                  'font-semibold',
                  settings.darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {recipient.name}
                </h2>
                <p className={cn(
                  'text-sm',
                  recipient.status === 'متصل' ? 'text-green-500' : 'text-gray-500'
                )}>
                  {recipient.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-4 pb-32">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === '12345678'}
                user={recipient}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={(content) => sendDirectMessage(userId, content)} />
      </div>
    </PageContainer>
  );
}

export default DirectChat;