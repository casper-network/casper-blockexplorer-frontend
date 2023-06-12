import '@emotion/react';

export type ThemeType = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    type: ThemeType;
    background: {
      primary: string;
      secondary: string;
      hover: string;
    };
    boxShadow: string;
    border: string;
    button: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
      contrast: string;
      hash: string;
      warning: string;
      success: string;
      hover: string;
    };
    rawData: {
      keyValString: string;
      background: string;
      svgNestVal: string;
      itemsArrayIndices: string;
    };
    selected: {
      primary: string;
    };
  }
}
