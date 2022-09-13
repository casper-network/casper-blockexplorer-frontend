import React from 'react';
import { Loader } from '../../utility/Loader';

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
    <main className="w-full max-w-1600 mx-auto bg-light-grey py-24">
      <div className="w-full h-full px-24 md:px-32 xl:px-48">{children}</div>
    </main>
  );
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  isLoading,
  error,
  children,
}) => {
  if (error) {
    return (
      <BaseContentWrapper>
        <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
        <p>{error.message}</p>
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
