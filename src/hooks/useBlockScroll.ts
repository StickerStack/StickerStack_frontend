import { useCallback } from 'react';

export const useBlockScroll = () => {
  const blockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const unblockScroll = useCallback(() => {
    document.body.style.overflow = '';
  }, []);
  return { blockScroll, unblockScroll };
};
