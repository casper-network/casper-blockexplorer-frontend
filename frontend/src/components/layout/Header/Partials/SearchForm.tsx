import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { SubmitHandler, useForm, Resolver } from 'react-hook-form';
import { ButtonIcon } from '../../../icons';

import { useAppSelector, getBounds } from '../../../../store';

import { MobileSelect, DesktopSelect } from './SelectComponent';

import { MOBILE_BREAKPOINT } from '../../../../constants';
import { SelectOptions } from '../Header.types';

interface SearchFormProps {}

export type FormValues = {
  hash: string;
  filterOptions: string;
  path: string;
  blockHeight: string | number;
};

const resolver: Resolver<FormValues> = async values => {
  const isHexadecimal = /^[A-F0-9]+$/i.test(values.hash);
  const isPublicKey = /^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(
    values.hash,
  );
  const formattedBlockHeight = values.hash.split(',').join('').trim();
  const onlyNumbers = /^[0-9]+$/.test(formattedBlockHeight);

  let currentErrorMessage;

  const errorMessage = {
    account: 'Please enter a valid public key.',
    deploy: 'Please enter a valid deploy hash.',
    block: 'Please enter a valid block hash.',
    blockHeight: 'Please enter a valid block height',
  };

  const defaultErrorMessage = 'Please select an option and enter a value';

  const path = {
    account: `/account/${values.hash}`,
    deploy: `/deploy/${values.hash}`,
    block: `/block/${values.hash}`,
    blockHeight: `/block/${formattedBlockHeight}?type=height`,
  };

  switch (values.filterOptions) {
    case 'account':
      if (isPublicKey) {
        values.path = path.account;
      } else currentErrorMessage = errorMessage.account;
      break;
    case 'deploy':
      if (isHexadecimal) {
        values.path = path.deploy;
      } else currentErrorMessage = errorMessage.deploy;
      break;
    case 'block':
      if (isHexadecimal) {
        values.path = path.block;
      } else currentErrorMessage = errorMessage.block;
      break;
    case 'blockHeight':
      if (formattedBlockHeight && onlyNumbers) {
        values.path = path.blockHeight;
      } else currentErrorMessage = errorMessage.blockHeight;
      break;
    default:
      currentErrorMessage = defaultErrorMessage;
  }

  return {
    values: values.filterOptions ? values : {},
    errors: !values.path
      ? {
          hash: {
            type: 'required',
            message: `${currentErrorMessage || defaultErrorMessage}`,
          },
        }
      : {},
  };
};

export const SearchForm: React.FC<SearchFormProps> = () => {
  const navigate = useNavigate();
  const [currentFilterOption, setCurrentFilterOption] = useState('account');

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver,
    defaultValues: { hash: '', filterOptions: 'account' },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ hash: '', filterOptions: currentFilterOption });
    }
  }, [isSubmitSuccessful, reset, currentFilterOption]);

  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  const submitPath: SubmitHandler<FormValues> = data => navigate(data.path);

  const selectOptions: SelectOptions[] = [
    { value: 'account', label: 'Account' },
    { value: 'deploy', label: 'Deploy' },
    { value: 'block', label: 'Block Hash' },
    { value: 'blockHeight', label: 'Block Height' },
  ];

  return (
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
};

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3.55rem;
  padding-bottom: 2.7rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    padding: 5rem 0rem 8.5rem 0rem;
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
