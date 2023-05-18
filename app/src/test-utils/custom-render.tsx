import React, { FC } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lightTheme } from 'src/theme';
import { Store } from '@reduxjs/toolkit';
import { store as reduxStore } from '../store';

function customRender(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    store = reduxStore,
    ...renderOptions
  }: { store?: Store; renderOptions?: RenderOptions } = {},
) {
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

  return render(ui, { wrapper: ProviderWrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { customRender as render };
