import React from 'react';
import { render } from '../../../test-utils';
import { Navbar } from './Navbar';

jest.mock('../../../hooks', () => {
  return {
    useAppWidth: () => {
      return { windowWidth: 1022, isMobile: false };
    },
  };
});

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../../../../public/locales/en/translation.json',
  );

  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
});

describe('Navbar', () => {
  it('should render the Navbar component and contain nav items', () => {
    const { getByTestId } = render(<Navbar />);

    const nav = getByTestId('navigation');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Blocks');
    expect(nav).toHaveTextContent('Peers');
  });

  it('should hide navigation text content when screen width is below 1023px', () => {
    const { getByText } = render(<Navbar />);
    const navItem1 = getByText('Home');
    const navItem2 = getByText('Blocks');
    const navItem3 = getByText('Peers');

    expect(navItem1).not.toBeVisible();
    expect(navItem2).not.toBeVisible();
    expect(navItem3).not.toBeVisible();
  });
});
