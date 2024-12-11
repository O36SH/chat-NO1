import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { usePosts } from '../contexts/PostContext';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import UserAvatar from '../components/UserAvatar';
import UserLevelDisplay from '../components/UserLevelDisplay';
import PostComments from '../components/PostComments';

function Posts() {
  const { settings } = useSettings();
  const { posts, setPosts, likePost, addComment, sharePost } = usePosts();
  const [activeTab, setActiveTab] = useState('all');
  const [showComments, setShowComments] = useState({});
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.useRef(null);

  const tabs = [
    { id: 'all', label: 'عام' },
    { id: 'personal', label: 'خاص' }
  ];

  const filteredPosts = activeTab === 'personal' 
    ? posts.filter(post => post.author.id === "12345678")
    : posts;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.trim() || selectedImage) {
      const post = {
        id: Date.now().toString(),
        author: { id: "12345678", name: "أحمد", level: 5 },
        content: newPost.trim(),
        image: selectedImage,
        likes: 0,
        likedBy: [],
        comments: [],
        commentCount: 0,
        time: new Date().toISOString()
      };
      setPosts(prev => [post, ...prev]);
      setNewPost('');
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <PageContainer>
      <div className="max-w-screen-xl mx-auto">
        {/* Search Bar */}
        <div className="px-4 py-6">
          <input
            type="text"
            placeholder="ابحث في المنشورات..."
            className={`w-full px-4 py-2 rounded-lg border ${
              settings.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Tabs */}
        <div className={`border-b ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-center transition-colors relative ${
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

        <div className="px-4 py-6">
          {/* Create Post */}
          <ContentCard className="mb-6">
            <form onSubmit={handleCreatePost} className="p-4">
              <textarea
                placeholder="ماذا يدور في ذهنك؟"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className={`w-full p-4 rounded-lg resize-none border ${
                  settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                rows="3"
              />

              {selectedImage && (
                <div className="relative mt-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-h-64 rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="mt-4 flex justify-between items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-full ${
                    settings.darkMode
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <PhotoIcon className="w-6 h-6" />
                </button>

                <button
                  type="submit"
                  disabled={!newPost.trim() && !selectedImage}
                  className={`px-6 py-2 rounded-lg ${
                    newPost.trim() || selectedImage
                      ? settings.darkMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                      : settings.darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-200'
                  } text-white transition-colors`}
                >
                  نشر
                </button>
              </div>
            </form>
          </ContentCard>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <ContentCard key={post.id}>
                <div className="p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <UserAvatar user={post.author} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <UserLevelDisplay level={post.author.level} />
                        <h3 className={`font-semibold ${
                          settings.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {post.author.name}
                        </h3>
                      </div>
                      <p className={`text-sm ${
                        settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {new Date(post.time).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  </div>

                  {post.content && (
                    <p className={`${
                      settings.darkMode ? 'text-gray-300' : 'text-gray-700'
                    } mb-4`}>
                      {post.content}
                    </p>
                  )}

                  {post.image && (
                    <div className="mb-4">
                      <img
                        src={post.image}
                        alt="Post"
                        className="rounded-lg max-h-96 mx-auto"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center space-x-2 ${
                        post.likedBy?.includes("12345678")
                          ? 'text-red-500'
                          : settings.darkMode
                          ? 'text-gray-400 hover:text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      {post.likedBy?.includes("12345678") ? (
                        <HeartIconSolid className="h-5 w-5" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => toggleComments(post.id)}
                      className={`flex items-center space-x-2 ${
                        settings.darkMode
                          ? 'text-gray-400 hover:text-blue-500'
                          : 'text-gray-500 hover:text-blue-500'
                      }`}
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span>{post.commentCount}</span>
                    </button>
                    <button
                      onClick={() => sharePost(post.id)}
                      className={`${
                        settings.darkMode
                          ? 'text-gray-400 hover:text-green-500'
                          : 'text-gray-500 hover:text-green-500'
                      }`}
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <PostComments
                      comments={post.comments}
                      onAddComment={(content) => addComment(post.id, content)}
                    />
                  )}
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Posts;