import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SortingState } from '@tanstack/react-table';

import { useBlocks, useLatestBlock, IUseBlocks } from 'src/hooks';
import { BlockTable, GradientHeading, PageWrapper } from 'src/components';
import { useAppSelector } from 'src/store';

const DEFAULT_BLOCKS_COUNT_TO_FETCH = 10;

const initialParam: IUseBlocks = {
  orderByHeight: 'desc',
  numToShow: DEFAULT_BLOCKS_COUNT_TO_FETCH,
};

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

export const Blocks: React.FC = () => {
  const [sort, setSort] = useState<SortingState>(initialSorting);
  const [params, setParams] = useState<IUseBlocks>(initialParam);
  const [shouldRefetchBlocks, setShouldRefetchBlocks] = useState(false);

  const { refreshTimer } = useAppSelector(state => state.app);

  const { t } = useTranslation();
  const { data: latestBlock, refetch: refetchLatestBlock } = useLatestBlock();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchBlocks,
  } = useBlocks(params);

  const blocks = useMemo(() => {
    return data?.pages.reduce((accum, page) => [...accum, ...page], []);
  }, [data]);

  useEffect(() => {
    if (refreshTimer === 0) {
      refetchLatestBlock();
      refetchBlocks();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTimer]);

  useEffect(() => {
    if (sort.length === 0) return;
    const { id, desc } = sort[0];
    if (id === 'height') {
      setParams(prev => ({
        ...prev,
        orderByHeight: desc ? 'desc' : 'asc',
      }));
      setShouldRefetchBlocks(prev => !prev);
    }
  }, [sort]);

  useEffect(() => {
    refetchBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetchBlocks]);

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>
      {blocks && (
        <BlockTable
          latestBlockHeight={latestBlock?.header.height}
          blocks={blocks}
          fetchMore={fetchNextPage}
          isLoadingMoreBlocks={isFetchingNextPage}
          sorting={sort}
          onSortingChange={setSort}
          initialSorting={initialSorting}
        />
      )}
    </PageWrapper>
  );
};
