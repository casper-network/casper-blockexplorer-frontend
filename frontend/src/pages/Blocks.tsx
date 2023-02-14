import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  getBlocksLoadingStatus,
  fetchBlocks,
  getTotalBlocks,
  getBlocksTableOptions,
  setTableOptions,
} from 'src/store';
import { SortingState } from '@tanstack/react-table';
import { DEFAULT_PAGINATION } from 'src/api';

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

export const Blocks: React.FC = () => {
  const [isSorting, setIsSorting] = useState(false);

  const { refreshTimer } = useAppSelector(state => state.app);

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlocksLoadingStatus);
  const blocksTableOptions = useAppSelector(getBlocksTableOptions);

  const isLoadingPage =
    blockLoadingStatus !== Loading.Complete && !blocks.length;
  const isLoadingNext = blockLoadingStatus !== Loading.Complete;

  useEffect(() => {
    if (refreshTimer === 0) {
      dispatch(fetchBlocks(blocksTableOptions));
    }
  }, [refreshTimer]);

  useEffect(() => {
    dispatch(fetchBlocks(blocksTableOptions));
  }, [blocksTableOptions.sorting]);

  useEffect(() => {
    if (isSorting) {
      setIsSorting(false);
    }
  }, [blocks]);

  return (
    <PageWrapper isLoading={isLoadingPage}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>

      <BlockTable
        total={totalBlocks}
        blocks={blocks}
        fetchMore={() => {
          dispatch(
            fetchBlocks({
              ...blocksTableOptions,
              pagination: {
                numToShow:
                  blocksTableOptions.pagination.numToShow + DEFAULT_PAGINATION,
              },
            }),
          );
        }}
        isLoadingMoreBlocks={isLoadingNext}
        isSorting={isSorting}
        sorting={[
          {
            id: blocksTableOptions.sorting.sortBy,
            desc: blocksTableOptions.sorting.order === 'desc',
          },
        ]}
        onSortingChange={() => {
          setIsSorting(true);
          // TODO: will probably have a setOrdering/setSorting method that's less verbose
          dispatch(
            setTableOptions({
              ...blocksTableOptions,
              sorting: {
                ...blocksTableOptions.sorting,
                order:
                  blocksTableOptions.sorting.order === 'desc' ? 'asc' : 'desc',
              },
            }),
          );
        }}
        initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
