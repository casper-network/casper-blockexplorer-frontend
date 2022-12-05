import React from 'react';
import { useForm } from 'react-hook-form';
import { Context as ResponsiveContext } from 'react-responsive';
import { render, renderHook } from '../../../../../test-utils';
import { SearchSelect } from './SearchSelect';
import { FormValues } from '../partials.types';

window.resizeTo = function resizeTo(width, height): void {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('SearchSelect', () => {
  it('should render without error', () => {
    const { result } = renderHook(useForm<FormValues>);
    const mockCurrentFilterOption = 'current-option';
    const { getByTestId } = render(
      <SearchSelect
        control={result.current.control}
        currentFilterOption={mockCurrentFilterOption}
        setCurrentFilterOption={jest.fn()}
      />,
    );

    const searchSelectWrapper = getByTestId('search-select');

    expect(searchSelectWrapper).toBeInTheDocument();
  });

  it('should not display react-select component if screen width is less than 1023px', () => {
    const { result } = renderHook(useForm<FormValues>);

    const mockCurrentFilterOption = 'current option';
    const { container: mobile } = render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <ResponsiveContext.Provider value={{ width: 1022 }}>
        <SearchSelect
          control={result.current.control}
          currentFilterOption={mockCurrentFilterOption}
          setCurrentFilterOption={jest.fn()}
        />
      </ResponsiveContext.Provider>,
    );

    expect(mobile).toMatchSnapshot();
  });
});
