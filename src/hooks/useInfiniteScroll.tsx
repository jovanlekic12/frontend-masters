import { useEffect, useRef } from "react";

type Props = {
  callback: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
};

export const useInfiniteScroll = ({
  callback,
  hasMore,
  isLoading,
  threshold = 300,
}: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.current.observe(currentSentinel);

    return () => {
      if (observer.current && currentSentinel)
        observer.current.unobserve(currentSentinel);
    };
  }, [callback, hasMore, isLoading, threshold]);

  return sentinelRef;
};
