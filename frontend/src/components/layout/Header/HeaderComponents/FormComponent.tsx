import React from 'react';
import styled from '@emotion/styled';

import { ButtonIcon } from 'src/components/icons';
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { MobileSelect, DesktopSelect } from './SelectComponent';

import { MOBILE_BREAKPOINT } from '../../../../constants';
import { SelectOptions, FormValues } from '../Header.types';

interface FormProps {
  readonly handleSubmit: UseFormHandleSubmit<FormValues>;
  readonly submitPath: SubmitHandler<FormValues>;
  readonly register: UseFormRegister<FormValues>;
  readonly errors: any /* this needs some love */;
  readonly windowWidth: number;
  readonly control: any /* this as well */;
  readonly selectOptions: SelectOptions[];
  readonly currentFilterOption: string;
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const FormComponent: React.FC<FormProps> = ({
  handleSubmit,
  submitPath,
  register,
  windowWidth,
  control,
  selectOptions,
  currentFilterOption,
  setCurrentFilterOption,
  errors,
}) => (
  <FormContainer>
    <Form onSubmit={handleSubmit(submitPath)}>
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <FormComponentsContainer>
        {windowWidth > MOBILE_BREAKPOINT ? (
          <DesktopSelect
            control={control}
            selectOptions={selectOptions}
            setCurrentFilterOption={setCurrentFilterOption}
          />
        ) : (
          <MobileSelect
            control={control}
            selectOptions={selectOptions}
            currentFilterOption={currentFilterOption}
            setCurrentFilterOption={setCurrentFilterOption}
          />
        )}
        <InputAndButtonContainer>
          <SearchInput
            {...register('hash', { required: true })}
            type="search"
            id="search"
            placeholder="Select search criteria"
            required
          />
          <SubmitButton type="submit">
            <ButtonIcon />
          </SubmitButton>
        </InputAndButtonContainer>
      </FormComponentsContainer>
      {errors.hash && (
        <ErrorMessageContainer>
          <ErrorSvgContainer>
            <svg>
              <path
                viewBox="0 0 30 16"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </ErrorSvgContainer>
          <ErrorMessage>{errors.hash.message}</ErrorMessage>
        </ErrorMessageContainer>
      )}
    </Form>
  </FormContainer>
);

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3.55rem;
  padding-bottom: 2.7rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    padding: 5rem 0rem 8.5rem 0rem;
    /* padding-left: 4rem; */
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 92%;
  @media (min-width: 768px) {
    width: 63%;
    min-width: 40rem;
  }

  @media (min-width: 1024px) {
    min-width: 42.4rem;
    width: 100%;
    max-width: 48rem;
  }
`;

export const FormComponentsContainer = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    width: 100%;
  }
`;

export const InputAndButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.4rem;
  margin: 0 auto;
  width: 91%;

  @media (min-width: 1024px) {
    padding-top: 0;
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  display: block;
  color: black;
  background-color: #fff;
  height: 2.8125rem;
  width: 100%;
  font-size: clamp(0.9rem, 1.1vw, 1.4rem);
  border-radius: 0.375rem 0 0 0.375rem;
  padding: 0 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: inset 0px 1px 7px rgba(127, 128, 149, 0.2);
  border-style: none;
  appearance: none;
  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  @media (min-width: 1024px) {
    height: 3.2rem;
    border-radius: 0;
  }
`;

export const SubmitButton = styled.button`
  font-weight: 500;
  background-color: #0325d1;
  height: 2.8125rem;
  width: 3.4rem;
  padding-top: 0.5rem;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  position: relative;
  right: 0.0625rem;
  border-style: none;
  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  @media (min-width: 1024px) {
    height: 3.2rem;
    width: 3.9rem;
  }
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 0.3125rem;
  position: relative;
  margin: 0 auto;
`;

export const ErrorSvgContainer = styled.div`
  height: 1.875rem;
  width: 1.25rem;
  stroke: #da2f54;
  stroke-width: 2;
  fill: #fff;
  padding-top: 0.75rem;
  position: absolute;
`;

export const ErrorMessage = styled.p`
  color: #da2f54;
  font-size: clamp(0.9rem, 1.3vw, 1.4rem);
  padding-top: 2rem;
  position: absolute;
`;
