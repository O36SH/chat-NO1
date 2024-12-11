import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMessageId } from '../utils/messageGenerator';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [directMessages, setDirectMessages] = useState(() => {
    const savedMessages = localStorage.getItem('directMessages');
    return savedMessages ? JSON.parse(savedMessages) : {};
  });

  const [roomMessages, setRoomMessages] = useState(() => {
    const savedRoomMessages = localStorage.getItem('roomMessages');
    return savedRoomMessages ? JSON.parse(savedRoomMessages) : {};
  });

  useEffect(() => {
    localStorage.setItem('directMessages', JSON.stringify(directMessages));
    localStorage.setItem('roomMessages', JSON.stringify(roomMessages));
  }, [directMessages, roomMessages]);

  const sendDirectMessage = (recipientId, messageData) => {
    const newMessage = {
      id: generateMessageId(),
      senderId: '12345678', // Current user ID (hardcoded for demo)
      ...messageData,
      timestamp: new Date().toISOString(),
    };

    setDirectMessages(prev => ({
      ...prev,
      [recipientId]: [...(prev[recipientId] || []), newMessage],
    }));
  };

  const sendRoomMessage = (roomId, messageData) => {
    const newMessage = {
      id: generateMessageId(),
      senderId: '12345678', // Current user ID (hardcoded for demo)
      ...messageData,
      timestamp: new Date().toISOString(),
    };

    setRoomMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage],
    }));
  };

  const deleteMessage = (chatId, messageId, isRoom = false) => {
    const updateMessages = isRoom ? setRoomMessages : setDirectMessages;
    updateMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId].filter(msg => msg.id !== messageId)
    }));
  };

  const editMessage = (chatId, messageId, newContent, isRoom = false) => {
    const updateMessages = isRoom ? setRoomMessages : setDirectMessages;
    updateMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId].map(msg => 
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    }));
  };

  return (
    <ChatContext.Provider value={{
      directMessages,
      roomMessages,
      sendDirectMessage,
      sendRoomMessage,
      deleteMessage,
      editMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}