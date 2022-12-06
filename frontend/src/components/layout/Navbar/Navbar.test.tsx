import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import { render } from '../../../test-utils';
import { Navbar } from './Navbar';

// https://medium.com/strands-tech-corner/how-to-test-react-responsive-components-with-jest-and-enzyme-e24088355994

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
    const { container: mobile } = render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <ResponsiveContext.Provider value={{ width: 1022 }}>
        <Navbar />
      </ResponsiveContext.Provider>,
    );

    // const navItem = getByText('Home');
    // expect(navItem).not.toBeInTheDocument();

    expect(mobile).toMatchSnapshot();
  });
});
