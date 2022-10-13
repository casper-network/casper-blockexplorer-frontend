import React from 'react';
import styled from '@emotion/styled';

import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormValues, SelectOptions } from '../Header.types';

interface MobileSelectProps {
  readonly control: Control<FormValues, any>;
  readonly selectOptions: SelectOptions[];
  readonly currentFilterOption: string;
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

interface DesktopSelectProps {
  readonly control: Control<FormValues, any>;
  readonly selectOptions: SelectOptions[];
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const MobileSelect: React.FC<MobileSelectProps> = ({
  control,
  selectOptions,
  currentFilterOption,
  setCurrentFilterOption,
}) => (
  <Controller
    control={control}
    render={({ field: { onChange } }) => {
      return (
        <MobileSelectContainer>
          {selectOptions.map(option => {
            const handleClick = () => {
              onChange(option.value);
              setCurrentFilterOption(option.value);
            };

            return (
              <li key={option.value}>
                <MobileSelectButton
                  onClick={handleClick}
                  style={{
                    backgroundColor:
                      currentFilterOption === option.value
                        ? '#0325d1'
                        : '#F1F1F4',
                    color:
                      currentFilterOption === option.value ? '#fff' : '#000',
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
);

export const DesktopSelect: React.FC<DesktopSelectProps> = ({
  control,
  selectOptions,
  setCurrentFilterOption,
}) => (
  <Controller
    control={control}
    render={({ field: { onChange, value, name } }) => {
      const currentSelection = selectOptions.find(
        option => option.value === value,
      );

      const handleSelectChange = (selectedOption: SelectOptions | null) => {
        onChange(selectedOption?.value);
        setCurrentFilterOption(selectedOption?.value!);
      };

      return (
        <Select
          defaultValue={selectOptions[0]}
          value={currentSelection}
          name={name}
          options={selectOptions}
          onChange={handleSelectChange}
          isSearchable={false}
          noOptionsMessage={() => null}
          className="custom-select"
          classNamePrefix="react-select"
        />
      );
    }}
    name="filterOptions"
    rules={{
      required: true,
    }}
  />
);

export const MobileSelectContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 20.5rem;
  margin: 0 auto;
`;

export const MobileSelectButton = styled.button`
  font-size: 0.8rem;
  border-style: none;
  font-weight: 500;
  border-radius: 0.938rem;
  padding: 0.3125rem 0.625rem;
`;
