import { ThemeType } from './types/theme';

export const lightTheme = {
  type: 'light' as ThemeType,
  background: {
    primary: '#fff',
    secondary: '',
  },
  boxShadow: 'rgba(127, 128, 149, 0.2)',
  border: '#4589f6',
  button: '#4589f6',
  text: {
    primary: '#000',
    secondary: '',
    muted: '',
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
  },
  boxShadow: '#0000004D',
  border: '#BCFC07',
  button: '#BCFC07',
  text: {
    primary: '#fff',
    secondary: '',
    muted: '#F4F4F4',
  },
  selected: {
    primary: '#F9AACA',
  },
};
