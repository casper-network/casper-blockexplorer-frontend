import React from 'react';
import { useTranslation } from 'react-i18next';
import useAsyncEffect from 'use-async-effect';
// import { SortingState } from '@tanstack/react-table';
// import { useBlocks, IUseBlocks } from 'src/hooks';
import {
  BlockTable,
  GradientHeading,
  PageWrapper,
  PageHead,
} from 'src/components';
import {
  useAppDispatch,
  useAppSelector,
  Loading,
  getBlocks,
  getBlockLoadingStatus,
  fetchBlocks,
  getTotalBlocks,
  fetchMoreBlocks,
} from 'src/store';
// import { Block } from 'src/api';

// const DEFAULT_BLOCKS_COUNT_TO_FETCH = 10;

// const initialParam: IUseBlocks = {
//   orderByHeight: 'desc',
//   numToShow: DEFAULT_BLOCKS_COUNT_TO_FETCH,
// };

// const initialSorting: SortingState = [
//   {
//     id: 'height',
//     desc: true,
//   },
// ];

export const BlocksNew: React.FC = () => {
  // const { refreshTimer } = useAppSelector(state => state.app);

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  // TODO: potentially create useActions hook?
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>

      <BlockTable
        total={totalBlocks}
        blocks={blocks}
        fetchMore={() =>
          dispatch(fetchMoreBlocks(blocks[blocks.length - 1]?.header.height))
        }
        isLoadingMoreBlocks={isLoading}
        // sorting={}
        // onSortingChange={setSort}
        // initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};

/*
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
*/
