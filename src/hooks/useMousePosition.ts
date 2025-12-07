import { useEffect, useState, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  isInside: boolean;
}

export const useMousePosition = (ref: RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isInside: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      setMousePosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
        isInside: true,
      });
    };

    const handleMouseEnter = () => {
      setMousePosition(prev => ({ ...prev, isInside: true }));
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0, isInside: false });
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      
      const rect = element.getBoundingClientRect();
      const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      setMousePosition({
        x: Math.max(-1, Math.min(1, x)) * 0.5, // Reduced effect on mobile
        y: Math.max(-1, Math.min(1, y)) * 0.5,
        isInside: true,
      });
    };

    const handleTouchEnd = () => {
      setMousePosition({ x: 0, y: 0, isInside: false });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref]);

  return mousePosition;
};
