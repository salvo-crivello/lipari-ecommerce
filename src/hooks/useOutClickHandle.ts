import React, { useEffect } from "react";

export default function useOutClickHandle(
  refElement: React.RefObject<HTMLElement | null>,
  action: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!refElement) return;
      if (
        refElement.current &&
        !refElement.current.contains(event.target as Node)
      ) {
        action();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refElement, action]);
}
