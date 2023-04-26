import { ThemeType } from './types/theme';

export const lightTheme = {
  type: 'light' as ThemeType,
  background: {
    primary: '#fff',
    secondary: '#f4f4f4',
    hover: '#e3e3e9',
  },
  boxShadow: 'rgba(127, 128, 149, 0.2)',
  border: '#4589f6',
  button: '#4589f6',
  text: {
    primary: '#000',
    secondary: '#64748b',
    muted: '',
    contrast: '#fff',
  },
  selected: {
    primary: '#BCFC07',
  },
};

export const darkTheme = {
  type: 'dark' as ThemeType,
  background: {
    primary: '#000',
    secondary: '#202020',
    hover: '#3a3a3a',
  },
  boxShadow: '#0000004D',
  border: '#BCFC07',
  button: '#BCFC07',
  text: {
    primary: '#fff',
    secondary: '#D6D6D6',
    muted: '#F4F4F4',
    contrast: '#000',
  },
  selected: {
    primary: '#F9AACA',
  },
};
