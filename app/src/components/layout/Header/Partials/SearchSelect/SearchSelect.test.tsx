import React from 'react';
import { useForm } from 'react-hook-form';
import { render, renderHook } from '../../../../../test-utils';
import { SearchSelect } from './SearchSelect';
import { FormValues } from '../partials.types';

jest.mock('../../../../../hooks', () => {
  return {
    useAppWidth: () => {
      return { windowWidth: 1024, isDropdownMenu: true };
    },
  };
});

describe('SearchSelect', () => {
  it('should render the SearchSelect component', () => {
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

  it('should display the react-select component if screen width is greater than 1023px', () => {
    const { result } = renderHook(useForm<FormValues>);

    const mockCurrentFilterOption = 'current option';
    const { getByLabelText, queryByTestId } = render(
      <SearchSelect
        control={result.current.control}
        currentFilterOption={mockCurrentFilterOption}
        setCurrentFilterOption={jest.fn()}
      />,
    );

    const selectButton = getByLabelText('select-button');
    const fourthButton = queryByTestId('button-4');

    expect(selectButton).toBeInTheDocument();
    expect(fourthButton).not.toBeInTheDocument();
  });
});
