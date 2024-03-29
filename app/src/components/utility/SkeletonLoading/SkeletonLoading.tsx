import React from 'react';
import Skeleton, { SkeletonStyleProps } from 'react-loading-skeleton';

export const withSkeletonLoading = (
  child: React.ReactNode,
  isLoading: boolean,
  skeletonStyleOverride?: SkeletonStyleProps,
) => {
  if (isLoading) {
    return (
      <Skeleton containerTestId="skeleton-loader" {...skeletonStyleOverride} />
    );
  }

  return child;
};
