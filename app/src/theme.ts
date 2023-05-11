import { darkColors, lightColors } from './styled-theme';
import { ThemeType } from './types/theme';

export const lightTheme = {
  type: 'light' as ThemeType,
  background: {
    primary: lightColors.white,
    secondary: lightColors.secondary,
    hover: lightColors.mediumSupporting,
  },
  boxShadow: lightColors.boxShadow,
  border: lightColors.primary,
  button: lightColors.primary,
  text: {
    primary: lightColors.black,
    secondary: lightColors.darkSupporting,
    muted: lightColors.darkSupporting,
    contrast: lightColors.white,
    hash: lightColors.lightWarning,
    success: lightColors.success,
    warning: lightColors.mediumWarning,
  },
  selected: {
    primary: lightColors.lightSupporting,
  },
};

export const darkTheme = {
  type: 'dark' as ThemeType,
  background: {
    primary: darkColors.black,
    secondary: darkColors.secondary,
    hover: darkColors.mediumSupporting,
  },
  boxShadow: darkColors.boxShadow,
  border: darkColors.primary,
  button: darkColors.primary,
  text: {
    primary: darkColors.white,
    secondary: darkColors.darkSupporting,
    muted: darkColors.darkWarning,
    contrast: darkColors.black,
    hash: darkColors.lightWarning,
    warning: darkColors.mediumWarning,
    success: darkColors.success,
  },
  selected: {
    primary: darkColors.lightSupporting,
  },
};
