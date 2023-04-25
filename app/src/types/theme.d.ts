import '@emotion/react';

export type ThemeType = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    type: ThemeType;
    background: {
      primary: string;
      secondary: string;
    };
    boxShadow: string;
    border: string;
    button: string;
    text: {
      primary: string;
      muted: string;
      contrast: string;
    };
    selected: {
      primary: string;
    };
  }
}
