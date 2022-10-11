import React from 'react';
import useAsyncEffect from 'use-async-effect';

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
} from '../store';
import { useAppWidth } from '../hooks';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const { isMobile } = useAppWidth();

  const isLoading = blockLoadingStatus !== Loading.Complete;

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
