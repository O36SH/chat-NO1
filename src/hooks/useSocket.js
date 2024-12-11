import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

export function useSocket(url) {
  const socket = useRef(null);
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    socket.current = io(url, {
      auth: {
        userId: user.id
      }
    });

    socket.current.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.current.on('message', (message) => {
      addNotification({
        type: 'message',
        title: 'رسالة جديدة',
        content: message.content,
        sender: message.sender
      });
    });

    socket.current.on('roomActivity', (data) => {
      addNotification({
        type: 'room',
        title: 'نشاط في الغرفة',
        content: data.message,
        roomId: data.roomId
      });
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, url, addNotification]);

  return socket.current;
}