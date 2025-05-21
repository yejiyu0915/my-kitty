'use client';

import { useState, useCallback } from 'react';

export function useTaskListToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    toggleList,
  };
}
