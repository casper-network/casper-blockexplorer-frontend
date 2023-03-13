import { MOBILE_BREAKPOINT, SELECT_BREAKPOINT } from '../constants';
import { getBounds, useAppSelector } from '../store';

export const useAppWidth = () => {
  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || window.innerWidth || 0;

  const isMobile = windowWidth < MOBILE_BREAKPOINT;
  const isDropdownMenu = windowWidth > SELECT_BREAKPOINT;

  return { windowWidth, isMobile, isDropdownMenu };
};
