/**
 * This is not an actual styled-components theme
 * Emotion recommends that you only use an actual theme if you support multiple
 * https://emotion.sh/docs/best-practices#dont-use-a-theme-unless-your-app-supports-multiple-themes-or-will-eventually-support-multiple-themes
 */

export const colors = {
  black: '#000',
  white: '#FFF',
  offWhite: '#F7F7F7',
  grey: '#828282',
  lightGrey: 'rgb(245, 245, 247)',
  casperBlue: '#03105B',
  casperRed: '#da2f54',
  lightRed: 'rgba(255, 0, 19, 0.125)',
  darkRed: '#BF000E',
  green: '#09A129',
};

export const pxToRem = (px: number, base: number = 16) => {
  return `${px / base}rem`;
};
