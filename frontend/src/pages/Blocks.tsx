import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { BlockTable, PageWrapper } from '../components';

import {
  getBlocks,
  getBlockLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
} from '../store';

export const Blocks: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <h2 className="text-24 mb-25 bg-clip-text text-transparent bg-gradient-to-r from-casper-blue to-casper-red">
        Blocks
      </h2>
      <BlockTable blocks={blocks} />
    </PageWrapper>
  );
};
