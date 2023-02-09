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
  getBlocksPagination,
  setPagination,
  // fetchMoreBlocks,
  // refreshBlocks,
} from 'src/store';
import { SortingState } from '@tanstack/react-table';
// import { Block } from 'src/api';

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

export const BlocksNew: React.FC = () => {
  const [sort, setSort] = useState<SortingState>(initialSorting);

  const { refreshTimer } = useAppSelector(state => state.app);
  // console.log({ refreshTimer });

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  // TODO: potentially create useActions hook?
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);
  const blocksPagination = useAppSelector(getBlocksPagination);

  const isLoading = blockLoadingStatus !== Loading.Complete && !blocks.length;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks(blocksPagination));
    }
  }, []);

  useAsyncEffect(() => {
    if (refreshTimer === 0) {
      console.log('zerooo');
      // TODO: consider being more optimal and only fetching first new block (and deleting last old)
      dispatch(fetchBlocks(blocksPagination));
    }
  }, [refreshTimer]);

  // TODO: consider creating pagination state on this slice (or maybe create own slice??)
  useEffect(() => {
    dispatch(setPagination({ ...blocksPagination, numToShow: blocks.length }));
  }, [blocks]);

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>

      <BlockTable
        total={totalBlocks}
        blocks={blocks}
        fetchMore={() => {
          // TODO: 1) fetch more blocks should use getBlocks, not getBlock over and over
          dispatch(fetchBlocks(blocksPagination));
          console.log({ blocks });
        }}
        isLoadingMoreBlocks={isLoading}
        sorting={sort}
        onSortingChange={setSort}
        initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
