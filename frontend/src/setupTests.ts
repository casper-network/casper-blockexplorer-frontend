// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('./utils/load-config', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { mockLoadConfig } = jest.requireActual('./test-utils/mock-config');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...jest.requireActual('./utils/load-config'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadConfig: mockLoadConfig,
  };
});
