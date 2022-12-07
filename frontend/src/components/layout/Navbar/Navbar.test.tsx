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

describe('Navbar', () => {
  it('should render without error and display nav items', () => {
    const { getByRole, getByText } = render(<Navbar />);

    const nav = getByRole('navigation', { name: 'navigation' });

    expect(nav).toHaveTextContent('Home');

    const navItem = getByText('Home');

    expect(navItem).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  it('should hide navigation options when screen width is below 1023px', () => {
    const { getByText } = render(<Navbar />);
    const navItem = getByText('Home');

    expect(navItem).not.toBeVisible();
  });
});
