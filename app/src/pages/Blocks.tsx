import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper, PageHead, BlocksTable } from 'src/components';
import {
  useAppDispatch,
  useAppSelector,
  Loading,
  getBlocks,
  getBlocksLoadingStatus,
  fetchBlocks,
  getTotalBlocks,
  getBlocksTableOptions,
  updateBlocksSorting,
  updateBlocksWithLatest,
  getLatestBlock,
} from 'src/store';
import { SortingState } from '@tanstack/react-table';
import { PageTableHeader } from '../components/layout/Header/Header.styled';

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

export const Blocks: React.FC = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);

  const { refreshTimer } = useAppSelector(state => state.app);

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const latestBlock = useAppSelector(getLatestBlock);
  const blockLoadingStatus = useAppSelector(getBlocksLoadingStatus);
  const blocksTableOptions = useAppSelector(getBlocksTableOptions);

  const isLoadingPage =
    blockLoadingStatus !== Loading.Complete && !blocks.length;

  useEffect(() => {
    // updated from WS
    if (latestBlock) {
      dispatch(updateBlocksWithLatest({ latestBlock }));
    }
  }, [latestBlock]);

  useEffect(() => {
    if (refreshTimer === 0) {
      dispatch(fetchBlocks(blocksTableOptions));
    }
  }, [refreshTimer, dispatch, blocksTableOptions]);

  useEffect(() => {
    dispatch(fetchBlocks(blocksTableOptions));
  }, [
    blocksTableOptions.sorting,
    blocksTableOptions.pagination,
    dispatch,
    blocksTableOptions,
  ]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('blocks')}</PageTableHeader>
      <BlocksTable
        total={totalBlocks}
        blocks={blocks}
        isTableLoading={isTableLoading || isLoadingPage}
        sorting={[
          {
            id: blocksTableOptions.sorting.sortBy,
            desc: blocksTableOptions.sorting.order === 'desc',
          },
        ]}
        onSortingChange={() => {
          setIsTableLoading(true);
          dispatch(
            updateBlocksSorting({
              sortBy: 'height',
              order:
                blocksTableOptions.sorting.order === 'desc' ? 'asc' : 'desc',
            }),
          );
        }}
        setIsTableLoading={setIsTableLoading}
        initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
