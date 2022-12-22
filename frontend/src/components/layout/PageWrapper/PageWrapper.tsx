import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GradientHeading } from '../../styled';
import { Loader } from '../../utility';

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
    <main className="w-full max-w-1800 mx-auto bg-[#fff] pt-24">
      <div className="w-full h-full px-24 md:px-32 lg:px-88">{children}</div>
    </main>
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
        <p className="break-word" data-testid="error-content">
          {error.message}
        </p>
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
