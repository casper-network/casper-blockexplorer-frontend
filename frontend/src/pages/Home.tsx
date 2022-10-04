import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { MOBILE_BREAKPOINT } from '../constants';

import {
  PageWrapper,
  LatestBlocks,
  MobileBlocksCarousel,
  GradientHeading,
} from '../components';

import {
  getBlocks,
  getBlockLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
  getBounds,
} from '../store';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  const bounds = useAppSelector(getBounds);
  const windowWidth = bounds?.width || 0;
  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">Home</GradientHeading>
      {isMobile ? (
        <MobileBlocksCarousel blocks={blocks} />
      ) : (
        <LatestBlocks blocks={blocks} />
      )}
    </PageWrapper>
  );
};
