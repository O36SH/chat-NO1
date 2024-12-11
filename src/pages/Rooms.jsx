import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { 
  PlusIcon, 
  UserGroupIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import RoomInfo from '../components/RoomInfo';
import CreateRoomModal from '../components/CreateRoomModal';
import RoomDiscoveryModal from '../components/RoomDiscoveryModal';
import { formatRoomId } from '../utils/roomGenerator';

function Rooms() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [rooms, setRooms] = useState({
    private: [
      { 
        id: "1234567890", 
        name: "غرفة التقنية", 
        members: 150, 
        isActive: true,
        description: "غرفة للنقاش حول أحدث التقنيات والتطورات التكنولوجية",
        createdAt: "2023-12-01",
        owner: {
          id: "12345678",
          name: "أحمد",
          isOnline: true
        }
      },
      { 
        id: "2345678901", 
        name: "غرفة الرياضة", 
        members: 89, 
        isActive: true,
        description: "مناقشة الأحداث الرياضية والمباريات",
        createdAt: "2023-12-05",
        owner: {
          id: "12345678",
          name: "أحمد",
          isOnline: true
        }
      }
    ],
    public: [
      { 
        id: "3456789012", 
        name: "غرفة الفن", 
        members: 45, 
        isActive: false,
        description: "مساحة للفنانين لمشاركة أعمالهم ومناقشة الفن",
        createdAt: "2023-12-10",
        owner: {
          id: "34567890",
          name: "سارة",
          isOnline: true
        }
      },
      { 
        id: "4567890123", 
        name: "غرفة الأدب", 
        members: 72, 
        isActive: true,
        description: "مناقشة الكتب والأدب العربي والعالمي",
        createdAt: "2023-12-15",
        owner: {
          id: "45678901",
          name: "محمد",
          isOnline: false
        }
      }
    ]
  });

  const handleCreateRoom = (newRoom) => {
    setRooms(prev => ({
      ...prev,
      private: [newRoom, ...prev.private]
    }));
  };

  const handleRoomNameClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  const handleRoomImageClick = (room) => {
    setSelectedRoom(room);
  };

  const handleJoinRoom = (roomId) => {
    navigate(`/rooms/${roomId}`);
    setShowDiscovery(false);
  };

  const RoomsList = ({ rooms, title }) => (
    <div className="mb-8">
      <h2 className={`text-lg font-medium mb-4 ${
        settings.darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <ContentCard key={room.id}>
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => handleRoomImageClick(room)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                    settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } flex items-center justify-center hover:opacity-80 transition-opacity`}
                >
                  {room.image ? (
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserGroupIcon className={`w-10 h-10 ${
                      settings.darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  )}
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => handleRoomNameClick(room.id)}
                    className={`text-right hover:underline ${
                      settings.darkMode ? 'text-white' : 'text-gray-900'
                    } font-semibold`}
                  >
                    {room.name}
                  </button>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {formatRoomId(room.id)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center text-sm ${
                      room.isActive ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${
                        room.isActive ? 'bg-green-500' : 'bg-gray-500'
                      }`}></span>
                      {room.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContentCard>
        ))}
        {rooms.length === 0 && (
          <div className={`col-span-full text-center py-8 ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            لا توجد غرف حالياً
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PageContainer>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-end space-x-2 mb-6">
          <button
            onClick={() => setShowDiscovery(true)}
            className={`p-2 rounded-full ${
              settings.darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowCreateRoom(true)}
            className={`p-2 rounded-full ${
              settings.darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <RoomsList rooms={rooms.private} title="خاص" />
        <RoomsList rooms={rooms.public} title="عام" />
      </div>

      {selectedRoom && (
        <RoomInfo
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {showCreateRoom && (
        <CreateRoomModal
          onClose={() => setShowCreateRoom(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}

      {showDiscovery && (
        <RoomDiscoveryModal
          onClose={() => setShowDiscovery(false)}
          onJoinRoom={handleJoinRoom}
        />
      )}
    </PageContainer>
  );
}

export default Rooms;