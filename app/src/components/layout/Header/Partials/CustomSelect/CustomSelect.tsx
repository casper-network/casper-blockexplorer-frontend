import { Theme } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import React, { useState } from 'react';
import Select, { PropsValue } from 'react-select';
import { pxToRem } from '../../../../../styled-theme';
import { SelectOptions } from '../partials.types';

export interface CustomSelectProps {
  readonly currentSelection: SelectOptions | undefined;
  readonly name: string;
  readonly defaultValue: PropsValue<SelectOptions>;
  readonly options: SelectOptions[];
  readonly onChange: (selectedOption: SelectOptions | null) => void;
  readonly customSelectWrapper?: StyledComponent<
    {
      theme?: Theme | undefined;
      as?: React.ElementType<any> | undefined;
    } & {
      isMenuOpen: boolean;
    },
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    {}
  >;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  currentSelection,
  name,
  defaultValue,
  options,
  onChange,
  customSelectWrapper,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Wrapper = customSelectWrapper ?? SelectWrapper;

  return (
    <Wrapper isMenuOpen={isMenuOpen} data-testid="select-wrapper">
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
    </Wrapper>
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
    background-color: ${props => props.theme.background.secondary};
    width: ${pxToRem(182)};
    box-shadow: none;
    border: none;
    transition: none;
  }

  .react-select__value-container {
    height: ${pxToRem(72)};
    padding: 0.65rem 0rem 0.65rem 0rem;
    margin: 0;
    border-radius: 0.375rem 0 0 0.375rem;
    box-shadow: inset 0px 1px 7px ${props => props.theme.boxShadow};
    position: relative;

    /* Firefox Version 110.0b3 (Versions 69+) */
    @supports selector(:-moz-is-html) {
      height: 2.25rem;
    }
  }

  .react-select__indicators {
    display: block;
    position: absolute;
    top: 1.1rem;
    left: 8.5rem;
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
    color: ${props => props.theme.text.primary};
    font-weight: 500;
    font-size: 1rem;
    text-align: left;
    margin: 0 2rem;

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
    color: ${props => props.theme.text.primary};
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
    color: ${props => props.theme.text.primary};
    width: 5px;
    padding: 0.5rem 0.4rem 0.5rem 0;
  }

  .react-select__menu-list {
    color: ${props => props.theme.text.primary};
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    margin: 0;
    border-radius: 0.375rem;
  }

  .react-select__menu {
    text-align: center;
    background-color: ${props => props.theme.background.secondary};
    border-radius: 0.375rem;
    width: 9.9rem;
  }

  .react-select__option:hover,
  .react-select__option:focus {
    color: ${props => props.theme.border};
    transition: ease-in-out, color, 400ms;
  }

  .react-select__option {
    background-color: transparent;
  }

  .react-select__option--is-selected {
    display: none;
  }
`;
