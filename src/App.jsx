import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Chats from './pages/Chats';
import DirectChat from './pages/DirectChat';
import Rooms from './pages/Rooms';
import ChatRoom from './pages/ChatRoom';
import Posts from './pages/Posts';
import Settings from './pages/Settings';
import PrivacySettings from './pages/PrivacySettings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import { useNotifications } from './contexts/NotificationContext';
import NotificationToast from './components/common/NotificationToast';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import PageTransition from './components/common/PageTransition';
import LoadingAnimation from './components/common/LoadingAnimation';

function App() {
  const { user, isLoading } = useAuth();
  const { notifications, clearNotification } = useNotifications();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingAnimation size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <main>
            <div className="container mx-auto">
              <AnimatePresence mode="wait">
                <PageTransition>
                  <Routes>
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                    <Route path="/" element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    } />
                    <Route path="/friends" element={
                      <PrivateRoute>
                        <Friends />
                      </PrivateRoute>
                    } />
                    <Route path="/chats" element={
                      <PrivateRoute>
                        <Chats />
                      </PrivateRoute>
                    } />
                    <Route path="/chats/:userId" element={
                      <PrivateRoute>
                        <DirectChat />
                      </PrivateRoute>
                    } />
                    <Route path="/rooms" element={
                      <PrivateRoute>
                        <Rooms />
                      </PrivateRoute>
                    } />
                    <Route path="/rooms/:roomId" element={
                      <PrivateRoute>
                        <ChatRoom />
                      </PrivateRoute>
                    } />
                    <Route path="/posts" element={
                      <PrivateRoute>
                        <Posts />
                      </PrivateRoute>
                    } />
                    <Route path="/settings" element={
                      <PrivateRoute>
                        <Settings />
                      </PrivateRoute>
                    } />
                    <Route path="/settings/privacy" element={
                      <PrivateRoute>
                        <PrivacySettings />
                      </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    } />
                  </Routes>
                </PageTransition>
              </AnimatePresence>
            </div>
          </main>
          {user && <Navbar />}
          
          <AnimatePresence>
            {notifications.map(notification => (
              <NotificationToast
                key={notification.id}
                notification={notification}
                onClose={() => clearNotification(notification.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;