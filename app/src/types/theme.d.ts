import '@emotion/react';

export type ThemeType = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    // TODO: add these below as part of #264, 265, 266 and 277
    // just for testing purposes for now
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
      secondary: string;
      muted: string;
    };
    selected: {
      primary: string;
      // secondary: string;
    };
  }
}
