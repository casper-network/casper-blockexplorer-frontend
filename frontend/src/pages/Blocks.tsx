import React, { useEffect } from 'react';
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
  getBlockLoadingStatus,
  fetchBlocks,
  getTotalBlocks,
  getBlocksTableOptions,
  setPagination,
} from 'src/store';
import { SortingState } from '@tanstack/react-table';
import { DEFAULT_PAGINATION } from 'src/api';
// import { useAppRefresh } from 'src/hooks';

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

export const Blocks: React.FC = () => {
  const { refreshTimer } = useAppSelector(state => state.app);

  // const { setTimer } = useAppRefresh();

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  // TODO: potentially create useActions hook?
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);
  const blocksTableOptions = useAppSelector(getBlocksTableOptions);

  const isLoadingPage =
    blockLoadingStatus !== Loading.Complete && !blocks.length;
  const isLoadingNext = blockLoadingStatus !== Loading.Complete;

  // TODO: blocks are created every 32.768 seconds??
  useEffect(() => {
    const blockTimes = [];
    let last: undefined | number;
    for (const block of blocks) {
      const blockCreationSeconds =
        new Date(block.header.timestamp).getTime() / 1000;
      if (last !== undefined) {
        blockTimes.push(last - blockCreationSeconds);
      }
      last = blockCreationSeconds;
    }

    console.log({ blockTimes });
  }, [blocks]);

  useEffect(() => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks(blocksTableOptions));
    }
  }, []);

  useEffect(() => {
    if (refreshTimer === 0) {
      dispatch(fetchBlocks(blocksTableOptions));
    }
  }, [refreshTimer]);

  // TODO: make this more generic -> tie sorting to a store action maybe?
  // possibly create filter/pagination/sorting (table config??) store?
  useEffect(() => {
    // TODO: should I add an if check here?
    dispatch(fetchBlocks(blocksTableOptions));
  }, [blocksTableOptions.sorting]);

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
        sorting={[
          {
            id: blocksTableOptions.sorting.sortBy,
            desc: blocksTableOptions.sorting.order === 'desc',
          },
        ]}
        onSortingChange={() =>
          // TODO: will probably have a setOrdering/setSorting method that's less verbose
          dispatch(
            setPagination({
              ...blocksTableOptions,
              sorting: {
                ...blocksTableOptions.sorting,
                order:
                  blocksTableOptions.sorting.order === 'desc' ? 'asc' : 'desc',
              },
            }),
          )
        }
        initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
