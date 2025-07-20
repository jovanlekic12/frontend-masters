import { useEffect, useState } from "react";

export default function useIsSmallScreen(breakpoint = 1600): boolean {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia(
      `(max-width: ${breakpoint}px)`
    );

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isSmallScreen;
}
