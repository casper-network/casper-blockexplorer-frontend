import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTheme } from '@emotion/react';

import { useTranslation } from 'react-i18next';
import { FormValues, SelectOptions } from '../partials.types';
import { useAppWidth } from '../../../../../hooks';
import {
  MobileSelectButton,
  MobileSelectContainer,
} from './SearchSelect.styled';
import { CustomSelect } from '../CustomSelect';

export interface SearchSelectProps {
  readonly control: Control<FormValues, any>;
  readonly currentFilterOption: string;
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  control,
  currentFilterOption,
  setCurrentFilterOption,
}) => {
  const { isDropdownMenu } = useAppWidth();
  const { t } = useTranslation();
  const theme = useTheme();

  const selectOptions: SelectOptions[] | null = [
    { value: 'account', label: t('account') },
    { value: 'deploy', label: t('deploy') },
    { value: 'block', label: t('block-hash') },
    { value: 'blockHeight', label: t('block-height') },
  ];

  return (
    <section data-testid="search-select" data-cy="custom-select">
      <Controller
        data-testid="controller"
        control={control}
        render={({ field: { onChange, value, name } }) => {
          const currentSelection = selectOptions.find(
            option => option.value === value,
          );

          const handleSelectChange = (selectedOption: SelectOptions | null) => {
            onChange(selectedOption?.value);
            setCurrentFilterOption(selectedOption?.value!);
          };

          return isDropdownMenu ? (
            <CustomSelect
              defaultValue={selectOptions[0]}
              currentSelection={currentSelection}
              name={name}
              options={selectOptions}
              onChange={handleSelectChange}
            />
          ) : (
            <MobileSelectContainer>
              {selectOptions.map((option, index) => {
                const handleClick = () => {
                  onChange(option.value);
                  setCurrentFilterOption(option.value);
                };

                return (
                  <li key={option.value} data-testid={`button-${index + 1}`}>
                    <MobileSelectButton
                      bgColor=""
                      onClick={handleClick}
                      style={{
                        backgroundColor:
                          currentFilterOption === option.value
                            ? theme.border
                            : theme.background.hover,
                        color:
                          currentFilterOption === option.value
                            ? theme.text.contrast
                            : theme.text.primary,
                      }}
                      type="button">
                      {option.label.includes('Block')
                        ? option.label.replace('Block', 'Blk')
                        : option.label}
                    </MobileSelectButton>
                  </li>
                );
              })}
            </MobileSelectContainer>
          );
        }}
        name="filterOptions"
        rules={{
          required: true,
        }}
      />
    </section>
  );
};
