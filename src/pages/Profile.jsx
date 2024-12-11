import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import BackButton from '../components/BackButton';
import EditProfileForm from '../components/EditProfileForm';
import StatusUpdate from '../components/StatusUpdate';
import { formatUserId } from '../utils/idGenerator';

function Profile() {
  const { settings } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "أحمد محمد",
    userId: "12345678",
    bio: "مطور تطبيقات ومهتم بالتكنولوجيا",
    location: "الرياض، المملكة العربية السعودية",
    joinDate: "انضم في يناير 2023",
    friends: 245,
    posts: 123,
    rooms: 5,
    status: "",
    gender: "",
    birthDate: "",
    interests: ["البرمجة", "التكنولوجيا", "القراءة", "السفر"]
  });

  const stats = [
    { label: 'الأصدقاء', value: userProfile.friends },
    { label: 'المنشورات', value: userProfile.posts },
    { label: 'الغرف', value: userProfile.rooms },
  ];

  const handleSaveProfile = (updatedData) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedData
    }));
    setIsEditing(false);
  };

  const handleUpdateStatus = (newStatus) => {
    setUserProfile(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BackButton />
              <h1 className={`text-xl font-bold mr-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                الملف الشخصي
              </h1>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-full ${
                  settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
          {isEditing ? (
            <EditProfileForm 
              profile={userProfile}
              onSave={handleSaveProfile}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              
              <div className="px-6 pb-6">
                <div className="flex justify-center">
                  <div className="-mt-16 relative">
                    <UserCircleIcon className={`h-32 w-32 ${
                      settings.darkMode ? 'text-gray-600' : 'text-gray-400'
                    } bg-white rounded-full p-1`} />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h2 className={`text-2xl font-bold ${
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {userProfile.name}
                  </h2>
                  <p className={`${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formatUserId(userProfile.userId)}
                  </p>
                </div>

                <div className="mt-6">
                  <StatusUpdate 
                    currentStatus={userProfile.status}
                    onUpdateStatus={handleUpdateStatus}
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className={`${
                    settings.darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {userProfile.bio}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className={`${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-sm`}>
                      {userProfile.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <span className={`${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-sm`}>
                      {userProfile.joinDate}
                    </span>
                  </div>
                </div>

                {userProfile.interests.length > 0 && (
                  <div className="mt-6">
                    <h3 className={`text-center text-sm font-medium mb-3 ${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      الاهتمامات
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {userProfile.interests.map((interest) => (
                        <span
                          key={interest}
                          className={`px-3 py-1 rounded-full text-sm ${
                            settings.darkMode
                              ? 'bg-gray-700 text-white'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className={`text-xl font-bold ${
                        settings.darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${
                        settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;