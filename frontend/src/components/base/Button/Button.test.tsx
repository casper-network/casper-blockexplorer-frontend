import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  const mockClickHandler = jest.fn();

  it('should render', () => {
    const { getByRole } = render(<Button type="button">button</Button>);
    const button = getByRole('button', { name: 'button' });

    expect(button).toBeInTheDocument();
  });

  it('should call a clickHandler if not disabled', () => {
    const { getByRole } = render(
      <Button type="button" onClick={mockClickHandler}>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);

    expect(button).toBeEnabled();
    expect(mockClickHandler.mock.calls.length).toEqual(1);
    expect(button).toHaveTextContent('button');
  });

  it('should not call a clickHandler if it contains disabled prop', () => {
    const { getByRole } = render(
      <Button type="button" onClick={mockClickHandler} isDisabled>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);

    expect(button).not.toBeEnabled();
    expect(mockClickHandler.mock.calls.length).toEqual(0);
    expect(button).toHaveTextContent('button');
  });
});
