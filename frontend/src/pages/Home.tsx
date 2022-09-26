import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { MOBILE_BREAKPOINT } from 'src/constants';

import { BlockTable, PageWrapper, MobileBlocksCarousel } from '../components';

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
      <h2 className="text-24 mb-25">Blocks</h2>
      {isMobile ? (
        <MobileBlocksCarousel blocks={blocks} />
      ) : (
        <BlockTable blocks={blocks} />
      )}
    </PageWrapper>
  );
};
