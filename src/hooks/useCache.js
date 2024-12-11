import { useState, useEffect } from 'react';

const CACHE_PREFIX = 'app_cache_';
const DEFAULT_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useCache(key, initialData = null, expiryTime = DEFAULT_EXPIRY) {
  const cacheKey = `${CACHE_PREFIX}${key}`;
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { value, expiry } = JSON.parse(cached);
        if (expiry > Date.now()) {
          return value;
        }
        localStorage.removeItem(cacheKey);
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    return initialData;
  });

  useEffect(() => {
    if (data !== null) {
      try {
        const cacheData = {
          value: data,
          expiry: Date.now() + expiryTime
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch (error) {
        console.error('Cache write error:', error);
      }
    }
  }, [data, cacheKey, expiryTime]);

  const clearCache = () => {
    try {
      localStorage.removeItem(cacheKey);
      setData(initialData);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  };

  return [data, setData, clearCache];
}