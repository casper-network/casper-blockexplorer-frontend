import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uniqBy from 'lodash/uniqBy';

import { Block } from 'src/api';
import { useBlocks, useLatestBlockHeight, IUseBlocks } from 'src/hooks';

import { SortingState } from '@tanstack/react-table';
import { BlockTable, GradientHeading, PageWrapper } from '../components';

const DEFAULT_BLOCKS_COUNT_TO_FETCH = 20;

export const Blocks: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [sort, setSort] = useState<SortingState>([]);
  const [params, setParams] = useState<IUseBlocks>({
    orderByHeight: 'desc',
    numToShow: DEFAULT_BLOCKS_COUNT_TO_FETCH,
  });
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const { t } = useTranslation();
  const { data: latestBlockHeight } = useLatestBlockHeight();
  const { data, isLoading, isFetching, refetch: fetchMore } = useBlocks(params);

  useEffect(() => {
    if (sort.length === 0) return;
    const { id, desc } = sort[0];
    if (id === 'height')
      setParams(prev => ({ ...prev, orderByHeight: desc ? 'desc' : 'asc' }));
  }, [sort]);

  useEffect(() => {
    setBlocks([]);
    if (params.orderByHeight === 'desc')
      setParams(prev => ({
        ...prev,
        fromHeight: undefined,
      }));
    else
      setParams(prev => ({
        ...prev,
        fromHeight: (params.numToShow || DEFAULT_BLOCKS_COUNT_TO_FETCH) - 1,
      }));
    // If call `fetchMore` here it will use old `params` so set flag for refetch and run `fetchMore` whenever it changes
    setShouldRefetch(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orderByHeight]);

  useEffect(() => {
    if (!data) return;

    setBlocks(prev => uniqBy([...prev, ...data], 'hash'));

    if (data.length < (params.numToShow || DEFAULT_BLOCKS_COUNT_TO_FETCH))
      return;

    // If there is more blocks to fetch update fetch params
    if (params.orderByHeight === 'desc')
      setParams(prev => ({
        ...prev,
        fromHeight: data[data.length - 1].height - 1,
      }));
    else
      setParams(prev => ({
        ...prev,
        fromHeight:
          data[data.length - 1].height + DEFAULT_BLOCKS_COUNT_TO_FETCH,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetch]);

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>
      {blocks && (
        <BlockTable
          latestBlockHeight={latestBlockHeight}
          blocks={blocks}
          fetchMore={fetchMore}
          isLoadingMoreBlocks={isLoading || isFetching}
          sorting={sort}
          onSortingChange={setSort}
        />
      )}
    </PageWrapper>
  );
};
