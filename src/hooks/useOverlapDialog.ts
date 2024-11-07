import { useState, useRef } from 'react';

export const useOverlapDialog = () => {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState([]);
  const cancelRef = useRef(null);

  return {
    isOverlapDialogOpen,
    setIsOverlapDialogOpen,
    overlappingEvents,
    setOverlappingEvents,
    cancelRef,
  };
};
