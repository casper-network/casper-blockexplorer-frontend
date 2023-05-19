import { defaultTheme } from 'casper-ui-kit';
import { loadConfig } from './utils';
/**
 * This is not an actual styled-components theme
 * Emotion recommends that you only use an actual theme if you support multiple
 * https://emotion.sh/docs/best-practices#dont-use-a-theme-unless-your-app-supports-multiple-themes-or-will-eventually-support-multiple-themes
 */
const { lightTheme, darkTheme, primaryFontName, secondaryFontName } =
  loadConfig();

export const lightColors = {
  black: lightTheme.BLACK || defaultTheme.colors.primary.Black,
  white: lightTheme.WHITE || defaultTheme.colors.secondary.White,
  primary:
    lightTheme.PRIMARY ||
    defaultTheme.colors.lowContrastSecondary.CasperLightBlue,
  secondary:
    lightTheme.SECONDARY ||
    defaultTheme.colors.lowContrastSecondary.CasperLightGrey,
  lightSupporting:
    lightTheme.LIGHTSUPPORTING || defaultTheme.colors.secondary.CasperYellow,
  boxShadow: lightTheme.BOXSHADOW || defaultTheme.colors.secondary.BoxShadow,
  mediumSupporting:
    lightTheme.MEDIUMSUPPORTING || defaultTheme.colors.secondary.Whisper,
  darkSupporting:
    lightTheme.DARKSUPPORTING || defaultTheme.colors.secondary.SlateGrey,
  mediumWarning:
    lightTheme.MEDIUMWARNING || defaultTheme.colors.primary.CasperRed,
  lightWarning:
    lightTheme.LIGHTWARNING || defaultTheme.colors.secondary.CasperBlue,
  darkWarning: lightTheme.DARKWARNING || '',
  success: lightTheme.SUCCESS || defaultTheme.colors.secondary.CasperGreen,
};
export const darkColors = {
  black: darkTheme.BLACK || defaultTheme.colors.primary.Black,
  white: darkTheme.WHITE || defaultTheme.colors.secondary.White,
  primary: darkTheme.PRIMARY || defaultTheme.colors.secondary.CasperYellow,
  secondary: darkTheme.SECONDARY || defaultTheme.colors.secondary.Nero,
  lightSupporting:
    darkTheme.LIGHTSUPPORTING || defaultTheme.colors.secondary.CasperPalePink,
  boxShadow: darkTheme.BOXSHADOW || defaultTheme.colors.secondary.DarkBoxShadow,
  mediumSupporting:
    darkTheme.MEDIUMSUPPORTING || defaultTheme.colors.secondary.Eclipse,
  darkSupporting:
    darkTheme.DARKSUPPORTING || defaultTheme.colors.secondary.Grey84,
  mediumWarning:
    darkTheme.MEDIUMWARNING || defaultTheme.colors.primary.CasperRed,
  lightWarning:
    darkTheme.LIGHTWARNING || defaultTheme.colors.secondary.CasperPalePink,
  darkWarning: darkTheme.DARKWARNING || defaultTheme.colors.primary.CasperWhite,
  success: darkTheme.SUCCESS || defaultTheme.colors.secondary.CasperGreen,
};

export const fonts = {
  primaryFont: primaryFontName,
  secondaryFont: secondaryFontName,
};
