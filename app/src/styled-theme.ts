import { defaultTheme } from 'casper-ui-kit';
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

export const lightColors = {
  black: BLACK || defaultTheme.colors.primary.Black,
  white: WHITE || defaultTheme.colors.secondary.White,
  primary: PRIMARY || defaultTheme.colors.lowContrastSecondary.CasperLightBlue,
  secondary:
    SECONDARY || defaultTheme.colors.lowContrastSecondary.CasperLightGrey,
  lightSupporting:
    LIGHTSUPPORTING || defaultTheme.colors.secondary.CasperYellow,
  boxShadow: BOXSHADOW || defaultTheme.colors.secondary.BoxShadow,
  mediumSupporting: MEDIUMSUPPORTING || defaultTheme.colors.secondary.Whisper,
  darkSupporting: DARKSUPPORTING || defaultTheme.colors.secondary.SlateGrey,
  mediumWarning: MEDIUMWARNING || defaultTheme.colors.primary.CasperRed,
  lightWarning: LIGHTWARNING || defaultTheme.colors.secondary.CasperBlue, // TODO: consider changing name to hash?
  darkWarning: DARKWARNING || '', // TODO: consider changing name to muted?
  success: SUCCESS || defaultTheme.colors.secondary.CasperGreen,
  gradient1: GRADIENT1 || '#1C1E90',
  gradient2: GRADIENT2 || '#693590',
  gradient3: GRADIENT3 || '#D81D54',
  gradient4: GRADIENT4 || '#D81E54',
  gradient5: GRADIENT5 || '#FD6B52',
};
export const darkColors = {
  black: BLACK || defaultTheme.colors.primary.Black,
  white: WHITE || defaultTheme.colors.secondary.White,
  primary: PRIMARY || defaultTheme.colors.secondary.CasperYellow,
  secondary: SECONDARY || defaultTheme.colors.secondary.Nero,
  lightSupporting:
    LIGHTSUPPORTING || defaultTheme.colors.secondary.CasperPalePink,
  boxShadow: BOXSHADOW || defaultTheme.colors.secondary.DarkBoxShadow,
  mediumSupporting: MEDIUMSUPPORTING || defaultTheme.colors.secondary.Eclipse,
  darkSupporting: DARKSUPPORTING || defaultTheme.colors.secondary.Grey84,
  mediumWarning: MEDIUMWARNING || defaultTheme.colors.primary.CasperRed,
  lightWarning: LIGHTWARNING || defaultTheme.colors.secondary.CasperBlue,
  darkWarning: DARKWARNING || defaultTheme.colors.primary.CasperWhite,
  success: SUCCESS || defaultTheme.colors.secondary.CasperGreen,
  gradient1: GRADIENT1 || '#1C1E90',
  gradient2: GRADIENT2 || '#693590',
  gradient3: GRADIENT3 || '#D81D54',
  gradient4: GRADIENT4 || '#D81E54',
  gradient5: GRADIENT5 || '#FD6B52',
};

export const fonts = {
  primaryFont: primaryFontName,
  secondaryFont: secondaryFontName,
};
