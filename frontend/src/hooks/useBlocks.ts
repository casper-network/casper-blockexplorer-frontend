import { useQuery } from '@tanstack/react-query';
import { SortDirection } from '@tanstack/react-table';
import { useMemo } from 'react';
import { casperApi } from 'src/api';

const BLOCK_UPDATE_TIME = 25_000;

export interface IUseBlocks {
  fromHeight?: number;
  orderByHeight?: SortDirection;
  numToShow?: number;
}

export default function useBlocks(props?: IUseBlocks) {
  const numToShow = props?.numToShow || 20;
  const fromHeight = props?.fromHeight;
  const orderByHeight = props?.orderByHeight || 'desc';

  const { data, ...rest } = useQuery(
    ['blocks', fromHeight, numToShow, orderByHeight],
    () => casperApi.getBlocks(fromHeight, numToShow),
    {
      keepPreviousData: true,
      staleTime: BLOCK_UPDATE_TIME,
      enabled: false,
    },
  );

  const sorted = useMemo(() => {
    return data?.sort((a, b) =>
      orderByHeight === 'asc' ? a.height - b.height : b.height - a.height,
    );
  }, [data, orderByHeight]);

  return { data: sorted, ...rest };
}
