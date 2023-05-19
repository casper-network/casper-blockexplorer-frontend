import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { lightTheme } from 'src/theme';
import { store } from '../store';
import i18n from './i18n-test-init';

const ProviderWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
          </I18nextProvider>
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
