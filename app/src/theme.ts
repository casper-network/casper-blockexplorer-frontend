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
    hover: lightColors.primary,
  },
  rawData: {
    keyValString: lightColors.black,
    background: lightColors.secondary,
    svgNestVal: lightColors.mediumWarning,
    itemsArrayIndices: lightColors.primary,
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
    hover: darkColors.primary,
  },
  rawData: {
    keyValString: darkColors.white,
    background: darkColors.secondary,
    svgNestVal: darkColors.mediumWarning,
    itemsArrayIndices: darkColors.primary,
  },
  selected: {
    primary: darkColors.lightSupporting,
  },
};
