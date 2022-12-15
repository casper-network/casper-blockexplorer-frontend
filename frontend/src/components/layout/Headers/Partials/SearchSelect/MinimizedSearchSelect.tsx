import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { FormValues, SelectOptions } from '../partials.types';
import { useAppWidth } from '../../../../../hooks';
import {
  MobileSelectButton,
  MobileSelectContainer,
} from './SearchSelect.styled';
import { MinimizedCustomSelect } from '../CustomSelect';

export interface SearchSelectProps {
  readonly control: Control<FormValues, any>;
  readonly currentFilterOption: string;
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const MinimizedSearchSelect: React.FC<SearchSelectProps> = ({
  control,
  currentFilterOption,
  setCurrentFilterOption,
}) => {
  const { isMobile } = useAppWidth();

  const selectOptions: SelectOptions[] | null = [
    { value: 'account', label: 'Account' },
    { value: 'deploy', label: 'Deploy' },
    { value: 'block', label: 'Block Hash' },
    { value: 'blockHeight', label: 'Block Height' },
  ];

  return (
    <section data-testid="search-select">
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

          return !isMobile ? (
            <MinimizedCustomSelect
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
                      onClick={handleClick}
                      style={{
                        backgroundColor:
                          currentFilterOption === option.value
                            ? '#0325d1'
                            : '#F1F1F4',
                        color:
                          currentFilterOption === option.value
                            ? '#fff'
                            : '#000',
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
