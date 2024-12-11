import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { ChatProvider } from './contexts/ChatContext'
import { PostProvider } from './contexts/PostContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <NotificationProvider>
            <ChatProvider>
              <PostProvider>
                <App />
              </PostProvider>
            </ChatProvider>
          </NotificationProvider>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)