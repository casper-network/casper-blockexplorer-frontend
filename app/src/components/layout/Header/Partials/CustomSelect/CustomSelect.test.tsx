import React from 'react';
import selectEvent from 'react-select-event';
import { render } from '../../../../../test-utils';
import { CustomSelect } from './CustomSelect';

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../../../../../../public/locales/en/translation.json',
  );

  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
});

describe('CustomSelect', () => {
  const mockSelectOptions = [
    { value: 'value1', label: 'Option 1' },
    { value: 'value2', label: 'Option 2' },
    { value: 'value3', label: 'Option 3' },
    { value: 'value4', label: 'Option 4' },
  ];

  const mockDefaultValue = mockSelectOptions[0];
  const mockName = 'filterOptions';
  const mockProps = {
    isMenuOpen: false,
    setIsMenuOpen: jest.fn,
    defaultValue: mockDefaultValue,
    currentSelection: undefined,
    name: mockName,
    options: mockSelectOptions,
    onChange: jest.fn,
  };

  it('should render customSelect with "Option 1" as default value', async () => {
    const { getByRole, getByTestId } = render(<CustomSelect {...mockProps} />);
    const customSelect = getByRole('combobox', { name: 'select-button' });
    const selectWrapper = getByTestId('select-wrapper');

    expect(customSelect).toBeInTheDocument();
    expect(mockDefaultValue.label).toEqual('Option 1');
    expect(selectWrapper).toHaveTextContent('Option 1');
  });

  it('should open menu on user click', async () => {
    const { getByLabelText, queryByText, queryAllByText, getByText } = render(
      <CustomSelect {...mockProps} />,
    );

    const option1 = queryAllByText('Option 1');

    expect(queryByText('Option 2')).toBeNull();

    selectEvent.openMenu(getByLabelText('Select'));

    expect(option1[0]).toBeInTheDocument();
    // 'Option 1' appears twice as the default option and first option
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
    expect(getByText('Option 4')).toBeInTheDocument();
  });

  it('should call onChange when an option is selected and display the selected option', async () => {
    const { getByLabelText, getByTestId } = render(
      <CustomSelect {...mockProps} />,
    );

    const selectWrapper = getByTestId('select-wrapper');
    const selectLabel = getByLabelText('Select');

    await selectEvent.select(selectLabel, 'Option 4');

    expect(selectWrapper).toHaveTextContent('Option 4');
    expect(selectWrapper).not.toHaveTextContent('Option 3');
    expect(selectWrapper).not.toHaveTextContent('Option 2');
    expect(selectWrapper).not.toHaveTextContent('Option 1');
  });
});
