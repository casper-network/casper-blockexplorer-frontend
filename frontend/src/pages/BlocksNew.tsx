import React, { useEffect, useState } from 'react';
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
  // refreshBlocks,
} from 'src/store';
import { IUseBlocks } from 'src/hooks';
// import { Block } from 'src/api';

const DEFAULT_BLOCKS_COUNT_TO_FETCH = 10;

const initialParam: IUseBlocks = {
  orderByHeight: 'desc',
  numToShow: DEFAULT_BLOCKS_COUNT_TO_FETCH,
};

// const initialSorting: SortingState = [
//   {
//     id: 'height',
//     desc: true,
//   },
// ];

export const BlocksNew: React.FC = () => {
  const [params, setParams] = useState<IUseBlocks>(initialParam);

  const { refreshTimer } = useAppSelector(state => state.app);
  // console.log({ refreshTimer });

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  // TODO: potentially create useActions hook?
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete && !blocks.length;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks(params));
    }
  }, []);

  useAsyncEffect(() => {
    if (refreshTimer === 0) {
      console.log('zerooo');
      dispatch(fetchBlocks(params));
    }
  }, [refreshTimer]);

  // TODO: consider creating pagination state on this slice (or maybe create own slice??)
  useEffect(() => {
    setParams(prev => ({
      ...prev,
      numToShow: blocks.length,
    }));
  }, [blocks]);

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>

      <BlockTable
        total={totalBlocks}
        blocks={blocks}
        fetchMore={() => {
          dispatch(fetchMoreBlocks(blocks[blocks.length - 1]?.header.height));
          console.log({ blocks });
        }}
        isLoadingMoreBlocks={isLoading}
        // sorting={}
        // onSortingChange={setSort}
        // initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
