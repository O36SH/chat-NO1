import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatUserId } from '../utils/idGenerator';
import ImageUpload from './common/ImageUpload';

function EditProfileForm({ profile, onSave, onCancel }) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: profile.name,
    userId: profile.userId,
    bio: profile.bio,
    location: profile.location,
    gender: profile.gender || '',
    birthDate: profile.birthDate || '',
    interests: profile.interests || [],
    newInterest: '',
    avatar: profile.avatar || null,
    coverImage: profile.coverImage || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (formData.newInterest.trim() && !formData.interests.includes(formData.newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.newInterest.trim()],
        newInterest: ''
      }));
    }
  };

  const handleRemoveInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    delete submitData.newInterest;
    onSave(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600">
          <ImageUpload
            currentImage={formData.coverImage}
            onImageChange={(image) => setFormData(prev => ({ ...prev, coverImage: image }))}
            onImageRemove={() => setFormData(prev => ({ ...prev, coverImage: null }))}
            className="absolute left-4 top-4"
            size="sm"
          />
        </div>
        <div className="flex justify-center">
          <div className="-mt-16 relative">
            <ImageUpload
              currentImage={formData.avatar}
              onImageChange={(image) => setFormData(prev => ({ ...prev, avatar: image }))}
              onImageRemove={() => setFormData(prev => ({ ...prev, avatar: null }))}
              size="lg"
              shape="round"
              className="border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/* Rest of the form remains the same */}
      {/* ... */}
    </form>
  );
}

export default EditProfileForm;