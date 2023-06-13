import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { getIsFirstVisit, useAppSelector } from 'src/store';

import { SubmitHandler, useForm, Resolver } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { Icon } from 'casper-ui-kit';
import {
  FormContainer,
  Form,
  FormComponentsContainer,
  InputAndButtonContainer,
  SearchInput,
  ErrorMessageContainer,
  ErrorSvgContainer,
  ErrorMessage,
  SearchLabel,
  SubmitButton,
} from './SearchForm.styled';

import { ButtonIconDark, ButtonIconLight } from '../../../../icons';

import { SearchSelect } from '../SearchSelect/SearchSelect';
import { FormValues } from '../partials.types';

interface SearchFormProps {}

export const resolver: Resolver<FormValues> = async values => {
  const isHexadecimal = /^[A-F0-9]+$/i.test(values.hash);
  const isPublicKey = /^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(
    values.hash,
  );

  const formattedBlockHeight = values.hash.split(',').join('').trim();
  const onlyNumbers = /^[0-9]+$/.test(formattedBlockHeight);

  let currentErrorMessage;

  const errorMessage = {
    account: 'enter-valid-public-key',
    deploy: 'enter-valid-deploy-hash',
    block: 'enter-valid-block-hash',
    blockHeight: 'enter-valid-block-height',
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
  const { type: themeType } = useTheme();
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

  const submitPath: SubmitHandler<FormValues> = data => navigate(data.path);

  const { t } = useTranslation();
  const currentMessage = errors.hash?.message || '';

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <FormContainer isFirstVisit={isFirstVisit}>
      <Form onSubmit={handleSubmit(submitPath)}>
        <SearchLabel htmlFor="default-search">{t('search')}</SearchLabel>
        <FormComponentsContainer>
          <SearchSelect
            control={control}
            currentFilterOption={currentFilterOption}
            setCurrentFilterOption={setCurrentFilterOption}
          />
          <InputAndButtonContainer>
            <SearchInput
              {...register('hash', { required: true })}
              type="search"
              id="search"
              data-cy="search-input"
              placeholder={t('select-search-criteria') || ''}
              required
            />
            <SubmitButton type="submit" data-cy="submit-button" bgColor="">
              {themeType === 'light' ? <ButtonIconLight /> : <ButtonIconDark />}
            </SubmitButton>
          </InputAndButtonContainer>
        </FormComponentsContainer>
        {errors.hash && (
          <ErrorMessageContainer>
            <ErrorSvgContainer>
              <Icon
                icon="ErrorIcon"
                stroke="red"
                color="none"
                height={25}
                width={25}
              />
            </ErrorSvgContainer>
            <ErrorMessage data-cy="search-form-error-message">
              {t(currentMessage)}
            </ErrorMessage>
          </ErrorMessageContainer>
        )}
      </Form>
    </FormContainer>
  );
};
