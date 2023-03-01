import React from 'react';
import { render } from '../../../test-utils';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('should render the Navbar component and contain nav items', () => {
    const { getByTestId } = render(<Navbar />);
    const nav = getByTestId('navigation');

    expect(nav).toBeInTheDocument();
  });
});
