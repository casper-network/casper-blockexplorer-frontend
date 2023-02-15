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
import { loadConfig } from 'src/utils';

const { defaultPagination } = loadConfig();

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
  }, [refreshTimer, dispatch, blocksTableOptions]);

  useEffect(() => {
    dispatch(fetchBlocks(blocksTableOptions));
  }, [blocksTableOptions.sorting, dispatch, blocksTableOptions]);

  useEffect(() => {
    if (isSorting) {
      setIsSorting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  blocksTableOptions.pagination.numToShow +
                  (defaultPagination ?? 10),
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
