'use client';

import { useState } from 'react';

export function useTaskListToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggleList,
  };
}
