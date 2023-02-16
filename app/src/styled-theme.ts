import { loadConfig } from './utils';

/**
 * This is not an actual styled-components theme
 * Emotion recommends that you only use an actual theme if you support multiple
 * https://emotion.sh/docs/best-practices#dont-use-a-theme-unless-your-app-supports-multiple-themes-or-will-eventually-support-multiple-themes
 */
const { theme, primaryFontName, secondaryFontName } = loadConfig();
const {
  BLACK,
  WHITE,
  PRIMARY,
  SECONDARY,
  LIGHTSUPPORTING,
  BOXSHADOW,
  MEDIUMSUPPORTING,
  DARKSUPPORTING,
  MEDIUMWARNING,
  LIGHTWARNING,
  DARKWARNING,
  SUCCESS,
  GRADIENT1,
  GRADIENT2,
  GRADIENT3,
  GRADIENT4,
  GRADIENT5,
} = theme;

export const colors = {
  black: BLACK || '#000',
  white: WHITE || '#FFF',
  primary: PRIMARY || '#0325D1',
  secondary: SECONDARY || '#f2f3f5',
  lightSupporting: LIGHTSUPPORTING || 'rgb(245, 245, 247)',
  boxShadow: BOXSHADOW || 'rgba(127, 128, 149, 0.2)',
  mediumSupporting: MEDIUMSUPPORTING || '#e3e3e9',
  darkSupporting: DARKSUPPORTING || '#64748b',
  mediumWarning: MEDIUMWARNING || '#da2f54',
  lightWarning: LIGHTWARNING || 'rgba(255, 0, 19, 0.125)',
  darkWarning: DARKWARNING || '#BF000E',
  success: SUCCESS || '#09A129',
  gradient1: GRADIENT1 || '#1C1E90',
  gradient2: GRADIENT2 || '#693590',
  gradient3: GRADIENT3 || '#D81D54',
  gradient4: GRADIENT4 || '#D81E54',
  gradient5: GRADIENT5 || '#FD6B52',
};

export const breakpoints = {
  xxs: '420px',
  xs: '480px',
  sm: '640px',
  md: '768px',
  xmd: '992px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1440px',
  xxxl: '1600px',
};

export const fonts = {
  primaryFont: primaryFontName,
  secondaryFont: secondaryFontName,
};

export const fontWeight = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

export const pxToRem = (px: number, base: number = 16) => {
  return `${px / base}rem`;
};