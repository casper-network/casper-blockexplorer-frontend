import React, { FC } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { lightTheme } from 'src/theme';
import { Store } from '@reduxjs/toolkit';
import { store as reduxStore } from '../store';
// import { store } from '../store';
import i18n from './i18n-test-init';

function customRender(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    store = reduxStore,
    ...renderOptions
  }: { store?: Store; renderOptions?: RenderOptions } = {},
) {
  // const ProviderWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  //   return (
  //     <React.StrictMode>
  //       <BrowserRouter>
  //         <Provider store={store}>
  //           <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
  //         </Provider>
  //       </BrowserRouter>
  //     </React.StrictMode>
  //   );
  // };

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

  return render(ui, { wrapper: ProviderWrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { customRender as render };
