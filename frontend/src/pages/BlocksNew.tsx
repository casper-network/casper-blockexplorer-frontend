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
  getBlocksPagination,
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

export const BlocksNew: React.FC = () => {
  const { refreshTimer } = useAppSelector(state => state.app);

  // const { setTimer } = useAppRefresh();

  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  // TODO: potentially create useActions hook?
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);
  const blocksPagination = useAppSelector(getBlocksPagination);

  const isLoadingPage =
    blockLoadingStatus !== Loading.Complete && !blocks.length;
  const isLoadingNext = blockLoadingStatus !== Loading.Complete;

  // useEffect(() => {
  //   if (isInitialTimerSet) return;

  //   if (blocks.length) {
  //     const timeNowSeconds = new Date().getTime() / 1000;
  //     const blockCreationSeconds =
  //       new Date(blocks[0].header.timestamp).getTime() / 1000;

  //     setTimer(30);
  //   }
  // }, [blocks]);

  useEffect(() => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks(blocksPagination));
    }
  }, []);

  useEffect(() => {
    if (refreshTimer === 0) {
      dispatch(fetchBlocks(blocksPagination));
    }
  }, [refreshTimer]);

  // TODO: make this more generic -> tie sorting to a store action maybe?
  // possibly create filter/pagination/sorting (table config??) store?
  useEffect(() => {
    dispatch(fetchBlocks(blocksPagination));
  }, [blocksPagination.sorting]);

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
              ...blocksPagination,
              numToShow: blocksPagination.numToShow + DEFAULT_PAGINATION,
            }),
          );
        }}
        isLoadingMoreBlocks={isLoadingNext}
        sorting={[
          {
            id: blocksPagination.sorting.sortBy,
            desc: blocksPagination.sorting.order === 'desc',
          },
        ]}
        onSortingChange={() =>
          dispatch(
            setPagination({
              ...blocksPagination,
              sorting: {
                ...blocksPagination.sorting,
                order:
                  blocksPagination.sorting.order === 'desc' ? 'asc' : 'desc',
              },
            }),
          )
        }
        initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
