import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import { MobileBlocksCarousel } from 'src/components/cards/MobileBlocksCarousel/MobileBlocksCarousel';
import { BlockTable, PageWrapper } from '../components';

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
  const [isMobile, setIsMobile] = useState(false);

  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  if (!isMobile && windowWidth < 1024) {
    setIsMobile(true);
  }
  if (isMobile && windowWidth > 1024) {
    setIsMobile(false);
  }

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
