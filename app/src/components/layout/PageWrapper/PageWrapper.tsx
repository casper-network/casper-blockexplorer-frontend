import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { defaultTheme, pxToRem, Loader } from 'casper-ui-kit';
import { GradientHeading } from '../../styled';

export interface PageError {
  message: string;
}

interface PageWrapperProps {
  readonly isLoading: boolean;
  readonly error?: PageError;
  readonly children: React.ReactNode;
}

interface BaseContentWrapperProps {
  readonly children: React.ReactNode;
}

const BaseContentWrapper: React.FC<BaseContentWrapperProps> = ({
  children,
}) => {
  return (
    <BaseContentContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </BaseContentContainer>
  );
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  isLoading,
  error,
  children,
}) => {
  const { t } = useTranslation();
  if (error) {
    return (
      <BaseContentWrapper>
        <GradientHeading type="h2">{t('whoops')}</GradientHeading>
        <ErrorMessage data-testid="error-content">{error.message}</ErrorMessage>
        <p>
          {t('go-back-to')} <Link to="/">{t('home')}</Link>
        </p>
      </BaseContentWrapper>
    );
  }

  if (isLoading) {
    return (
      <BaseContentWrapper>
        <Loader />
      </BaseContentWrapper>
    );
  }

  return <BaseContentWrapper>{children}</BaseContentWrapper>;
};

const BaseContentContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  background-color: ${props => props.theme.background.primary};
  padding: ${pxToRem(24)} 0 0 0;
  max-width: ${pxToRem(1800)};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${pxToRem(24)};

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    padding: 0 ${pxToRem(32)};
  }
`;

const ErrorMessage = styled.p`
  overflow-wrap: break-word;
`;
