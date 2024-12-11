import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import UserAvatar from './UserAvatar';
import UserLevelDisplay from './UserLevelDisplay';
import { formatMessageTime } from '../utils/messageGenerator';

function PostComments({ comments = [], onAddComment }) {
  const { settings } = useSettings();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="اكتب تعليقاً..."
          className={`flex-1 px-4 py-2 rounded-lg border ${
            settings.darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className={`px-4 py-2 rounded-lg ${
            newComment.trim()
              ? settings.darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
              : settings.darkMode
              ? 'bg-gray-700'
              : 'bg-gray-200'
          } text-white transition-colors`}
        >
          تعليق
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`flex space-x-3 ${
              settings.darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <UserAvatar user={comment.author} size="sm" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <UserLevelDisplay level={comment.author.level} />
                <span className="font-medium">{comment.author.name}</span>
                <span className={`text-xs ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatMessageTime(comment.timestamp)}
                </span>
              </div>
              <p className={`mt-1 text-sm ${
                settings.darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostComments;