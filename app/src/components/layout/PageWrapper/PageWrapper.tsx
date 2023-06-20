import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { defaultTheme, pxToRem, Loader } from 'casper-ui-kit';
import { Heading } from 'src/components/base';

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
        <ErrorPageHeading type="h2">{t('whoops')}</ErrorPageHeading>
        <ErrorMessage data-testid="error-content" data-cy="error-content">
          {error.message}
        </ErrorMessage>
        <LinkWrapper>
          {t('return-to')} <Link to="/">{t('home-page')}</Link>
        </LinkWrapper>
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
  max-width: ${pxToRem(1800)};

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    padding-top: ${pxToRem(30)};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${pxToRem(24)};

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    padding: 0 ${pxToRem(32)};
  }
`;

const ErrorPageHeading = styled(Heading)`
  margin-top: 1.5rem;
  font-weight: ${defaultTheme.typography.fontWeights.light};
  color: ${props => props.theme.text.primary};
  line-height: 1;

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    margin: 0;
  }
`;

const ErrorMessage = styled.p`
  overflow-wrap: break-word;
  color: ${props => props.theme.text.primary};
`;

const LinkWrapper = styled.p`
  color: ${props => props.theme.text.primary};
`;
