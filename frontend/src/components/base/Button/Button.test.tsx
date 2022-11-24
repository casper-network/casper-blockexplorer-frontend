import React from 'react';
import { fireEvent, render } from '../../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('should produce an event on click if not disabled', () => {
    const { getByRole } = render(<Button type="button">button</Button>);
    const button = getByRole('button', { name: 'button' });

    fireEvent.click(button);

    expect(button).toHaveTextContent('button');
    expect(button).toBeEnabled();
  });

  it('should not produce an event on click if it contains disabled prop', () => {
    const { getByRole } = render(
      <Button type="button" isDisabled>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    fireEvent.click(button);
    expect(button).not.toBeEnabled();
  });
});
