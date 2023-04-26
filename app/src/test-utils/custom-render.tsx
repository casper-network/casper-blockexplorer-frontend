import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lightTheme } from 'src/theme';
import { store } from '../store';

const ProviderWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: ProviderWrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
