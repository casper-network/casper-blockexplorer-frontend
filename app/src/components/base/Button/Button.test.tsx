import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('should render a button', () => {
    const { getByRole } = render(<Button type="button">button</Button>);
    const button = getByRole('button', { name: 'button' });

    expect(button).toBeInTheDocument();
  });

  it('should call a clickHandler if not disabled', () => {
    const mockClickHandler = jest.fn();
    const { getByRole } = render(
      <Button type="button" onClick={mockClickHandler}>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);

    expect(button).toBeEnabled();
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent('button');
  });

  it('should not call a clickHandler if it contains disabled prop', () => {
    const mockClickHandler = jest.fn();
    const { getByRole } = render(
      <Button type="button" onClick={mockClickHandler} isDisabled>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);

    expect(button).not.toBeEnabled();
    expect(mockClickHandler).not.toHaveBeenCalled();
    expect(button).toHaveTextContent('button');
  });
});
