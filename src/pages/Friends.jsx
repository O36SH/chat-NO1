import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { PlusIcon } from '@heroicons/react/24/outline';
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import UserAvatar from '../components/UserAvatar';
import UserLevelDisplay from '../components/UserLevelDisplay';
import UserLink from '../components/UserLink';
import AddFriendModal from '../components/AddFriendModal';

function Friends() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState({
    online: [
      { id: "12345678", name: "أحمد", status: "متصل", level: 5 },
      { id: "23456789", name: "سارة", status: "متصل", level: 8 }
    ],
    offline: [
      { id: "34567890", name: "محمد", status: "غير متصل", level: 3 },
      { id: "45678901", name: "فاطمة", status: "غير متصل", level: 6 }
    ]
  });

  const handleChatClick = (userId) => {
    navigate(`/chats/${userId}`);
  };

  const FriendsList = ({ friends, title }) => (
    <div className="mb-6">
      <h3 className={`text-lg font-medium mb-4 ${
        settings.darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {title}
      </h3>
      <ContentCard>
        <div className="divide-y">
          {friends.map((friend) => (
            <div key={friend.id} className={`flex items-center justify-between p-4 ${
              settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4">
                <UserAvatar user={friend} />
                <div>
                  <div className="flex items-center space-x-2">
                    <UserLevelDisplay level={friend.level} />
                    <UserLink
                      userId={friend.id}
                      name={friend.name}
                      className={`font-semibold ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    />
                  </div>
                  <p className={`text-sm ${
                    friend.status === "متصل" ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {friend.status}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChatClick(friend.id)}
                className={`px-4 py-2 rounded-lg ${
                  settings.darkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                محادثة
              </button>
            </div>
          ))}
          {friends.length === 0 && (
            <div className={`p-4 text-center ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              لا يوجد أصدقاء {title === 'متصل' ? 'متصلين' : 'غير متصلين'}
            </div>
          )}
        </div>
      </ContentCard>
    </div>
  );

  return (
    <PageContainer>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddFriend(true)}
            className={`p-2 rounded-full ${
              settings.darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <FriendsList friends={friends.online} title="متصل" />
        <FriendsList friends={friends.offline} title="غير متصل" />

        {showAddFriend && (
          <AddFriendModal onClose={() => setShowAddFriend(false)} />
        )}
      </div>
    </PageContainer>
  );
}

export default Friends;