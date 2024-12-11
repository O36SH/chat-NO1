import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      // User preferences
      notifications: true,
      soundEffects: true,
      language: 'ar',
      
      // App state
      isLoading: false,
      error: null,
      
      // Actions
      setNotifications: (enabled) => set({ notifications: enabled }),
      setSoundEffects: (enabled) => set({ soundEffects: enabled }),
      setLanguage: (lang) => set({ language: lang }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'app-storage',
    }
  )
);

export default useAppStore;