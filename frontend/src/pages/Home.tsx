import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { MOBILE_BREAKPOINT } from 'src/constants';

import { PageWrapper, LatestBlocks, MobileBlocksCarousel } from '../components';

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
      <h2 className="text-24 mb-25 bg-clip-text text-transparent bg-gradient-to-r from-casper-blue to-casper-red">
        Home
      </h2>
      {isMobile ? (
        <MobileBlocksCarousel blocks={blocks} />
      ) : (
        <LatestBlocks blocks={blocks} />
      )}
    </PageWrapper>
  );
};
