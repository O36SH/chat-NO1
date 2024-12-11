import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const likePost = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedBy?.includes("12345678");
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            likedBy: isLiked 
              ? post.likedBy.filter(id => id !== "12345678")
              : [...(post.likedBy || []), "12345678"]
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: Date.now().toString(),
      author: { id: "12345678", name: "أحمد", level: 5 },
      content,
      timestamp: new Date().toISOString()
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
            commentCount: (post.commentCount || 0) + 1
          };
        }
        return post;
      })
    );
  };

  const sharePost = (postId) => {
    // Here you would typically implement sharing functionality
    console.log(`Sharing post ${postId}`);
  };

  return (
    <PostContext.Provider value={{
      posts,
      setPosts,
      likePost,
      addComment,
      sharePost
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}