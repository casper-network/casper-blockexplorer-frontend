import styled from '@emotion/styled';
import React, { useState } from 'react';
import Select, { PropsValue } from 'react-select';
import { pxToRem, colors } from '../../../../../styled-theme';
import { SelectOptions } from '../partials.types';

export interface CustomSelectProps {
  readonly currentSelection: SelectOptions | undefined;
  readonly name: string;
  readonly defaultValue: PropsValue<SelectOptions>;
  readonly options: SelectOptions[];
  readonly onChange: (selectedOption: SelectOptions | null) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  currentSelection,
  name,
  defaultValue,
  options,
  onChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SelectWrapper isMenuOpen={isMenuOpen} data-testid="select-wrapper">
      <SelectLabel htmlFor="select">Select</SelectLabel>
      <Select
        aria-label="select-button"
        inputId="select"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        defaultValue={defaultValue}
        value={currentSelection}
        name={name}
        options={options}
        onChange={onChange}
        isSearchable={false}
        noOptionsMessage={() => null}
        classNamePrefix="react-select"
      />
    </SelectWrapper>
  );
};
const SelectLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const SelectWrapper = styled.div<{ isMenuOpen: boolean }>`
  .react-select__control {
    width: 9.9rem;
    box-shadow: none;
    border: none;
  }

  .react-select__value-container {
    height: 2.5rem;
    background-color: #fff;
    padding: 0.65rem 0rem 0.65rem 0rem;
    background-color: ${colors.white};
    margin: 0;
    border-radius: 0.375rem 0 0 0.375rem;
    box-shadow: inset 0px 1px 7px ${colors.boxShadow};
    position: relative;

    /* Firefox Version 110.0b3 (Versions 69+) */
    @supports selector(:-moz-is-html) {
      height: 2.25rem;
    }
  }

  .react-select__indicators {
    display: block;
    position: absolute;
    top: 0.1rem;
    left: 7.5rem;
    padding: 0;

    /* Firefox Version 110.0b3 (Versions 69+) */
    @supports selector(:-moz-is-html) {
      top: 0.05rem;
    }
  }

  .react-select__value-container:hover {
    cursor: pointer;
  }

  .react-select__single-value {
    color: ${colors.black};
    font-weight: 500;
    font-size: 1rem;
    text-align: left;
    padding: 0 2.3rem 0.35rem 1.5rem;
    margin: 0 auto;

    /* Firefox Version 110.0b3 (Versions 69+) */
    @supports selector(:-moz-is-html) {
      padding: 0 2.3rem 0.6rem 1.5rem;
    }
  }

  /* Safari Version 15.4 (11-15 up to Monterey)*/
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .react-select__single-value {
        padding: 0 2.3rem 0.5rem 1.5rem;
      }
    }
  }

  .react-select__dropdown-indicator svg {
    color: ${colors.black};
    width: ${pxToRem(25)};
    transition: all 200ms ease-in;
    transform: ${({ isMenuOpen }) => (isMenuOpen ? 'rotate(180deg)' : null)};

    :focus,
    :hover {
      cursor: pointer;
    }
  }

  .react-select__indicator {
    display: block;
    color: ${colors.black};
    width: 5px;
    padding: 0.5rem 0.4rem 0.5rem 0;
  }

  .react-select__menu-list {
    color: ${colors.black};
    font-size: clamp(1rem, 1.2vw, 1.4rem);
    padding: 0;
    margin: 0;
    border-radius: 0.375rem;
  }

  .react-select__menu {
    /* color: ${colors.white}; */
    text-align: center;
    background-color: ${colors.white};
    border-radius: 0.375rem;
    width: 9.9rem;
  }

  .react-select__option:hover,
  .react-select__option:focus {
    color: ${colors.black};
    transition: ease-in-out, font-weight, color, 400ms;
    font-weight: 700;
    background: linear-gradient(
      95.02deg,
      #1c1e90 0.62%,
      #693590 48.99%,
      #d81d54 70.51%,
      #d81e54 70.85%,
      #fd6b52 116.85%
    );
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-color: transparent;
  }

  .react-select__option {
    background-color: transparent;
  }

  .react-select__option--is-selected {
    display: none;
  }
`;
