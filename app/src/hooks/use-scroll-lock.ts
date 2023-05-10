import { useCallback } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
