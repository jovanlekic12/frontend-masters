import { useEffect, useRef } from "react";
type InfiniteScrollOptions = {
  callback: () => void;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
};

export const useInfiniteScroll = ({
  callback,
  isLoading,
  hasMore,
  threshold = 100,
}: InfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px`,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [callback, isLoading, hasMore, threshold]);

  return sentinelRef;
};
