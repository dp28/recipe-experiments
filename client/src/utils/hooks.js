import { useState, useEffect, useCallback } from "react";

export function useElementVisibleHeight() {
  const windowHeight = useWindowHeight();
  const [visibleHeight, setVisibleHeight] = useState(windowHeight - 200);
  const ref = useCallback(
    (element) => {
      if (!element) {
        return null;
      }
      const bounds = element.getBoundingClientRect();
      const bottom = bounds.height + bounds.y;

      setVisibleHeight(
        bottom < windowHeight ? bounds.height : windowHeight - bounds.y
      );
    },
    [windowHeight]
  );
  return [visibleHeight, ref];
}

export function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
}
