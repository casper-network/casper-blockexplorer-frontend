import { MOBILE_BREAKPOINT } from '../constants';
import { getBounds, useAppSelector } from '../store';

export const useAppWidth = () => {
  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  return { windowWidth, isMobile };
};
