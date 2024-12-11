import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

export function useInfiniteScroll(loadMore, hasMore, isLoading = false) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  });

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore, isLoading]);

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView, handleLoadMore]);

  return { ref };
}