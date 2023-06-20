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
  const navItems = [
    {
      title: 'home',
      path: '/',
      key: 'home',
    },
    {
      title: 'blocks',
      path: '/blocks',
      key: 'blocks',
    },
    {
      title: 'peers',
      path: '/peers',
      key: 'peers',
    },
    {
      title: 'validators',
      path: '/validators',
      key: 'validators',
    },
  ];

  const mockProps = {
    isOpened: false,
    openNav: jest.fn,
    closeNav: jest.fn,
    windowWidth: window.innerWidth || 0,
    isFirstVisit: false,
    navItems,
  };

  it('should render the Navbar component and contain nav items', () => {
    const { getByTestId } = render(<Navbar {...mockProps} />);

    const nav = getByTestId('navigation');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Blocks');
    expect(nav).toHaveTextContent('Peers');
  });

  it('should hide navigation text content when screen width is below 1023px', () => {
    const { getByText } = render(<Navbar {...mockProps} />);
    const navItem1 = getByText('Home');
    const navItem2 = getByText('Blocks');
    const navItem3 = getByText('Peers');

    expect(navItem1).not.toBeVisible();
    expect(navItem2).not.toBeVisible();
    expect(navItem3).not.toBeVisible();
  });
});
