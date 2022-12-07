import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  const mockCallBack = jest.fn();

  it('should render', () => {
    const { getByRole } = render(<Button type="button">button</Button>);
    const button = getByRole('button', { name: 'button' });

    expect(button).toBeInTheDocument();
  });

  it('should produce an event on click if not disabled', () => {
    const { getByRole } = render(
      <Button type="button" onClick={mockCallBack}>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);
    expect(button).toBeEnabled();
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(button).toHaveTextContent('button');
  });

  it('should not produce an event on click if it contains disabled prop', () => {
    const { getByRole } = render(
      <Button type="button" onClick={mockCallBack} isDisabled>
        button
      </Button>,
    );
    const button = getByRole('button', { name: 'button' });

    userEvent.click(button);
    expect(button).not.toBeEnabled();
    expect(mockCallBack.mock.calls.length).toEqual(0);
    expect(button).toHaveTextContent('button');
  });
});
