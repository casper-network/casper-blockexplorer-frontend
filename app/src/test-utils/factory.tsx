export const mockAppWidth = () => {
  jest.mock('../hooks', () => {
    return {
      useMobileWidth: () => {
        return { isDropdownMenu: true, isMobile: true };
      },
      useDesktopWidth: () => {
        return { isDropdownMenu: false, isMobile: false };
      },
    };
  });
};
