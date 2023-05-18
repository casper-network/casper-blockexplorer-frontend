export const mockI18 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../public/locales/en/translation.json',
  );
  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
};

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
