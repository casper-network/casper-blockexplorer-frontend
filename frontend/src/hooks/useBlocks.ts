import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { SortDirection } from '@tanstack/react-table';

import { middleware } from '../api';
import { QueryProps } from './types';

export interface IUseBlocks extends QueryProps {
  orderByHeight?: SortDirection;
  numToShow?: number;
}

interface QueryPageParam {
  fromHeight: number;
  numToShow?: number;
}

export default function useBlocks(props?: IUseBlocks) {
  const numToShow = props?.numToShow || 20;
  const orderByHeight = props?.orderByHeight || 'desc';

  return useInfiniteQuery(
    ['blocks'],
    async ({ pageParam }: QueryFunctionContext<QueryKey, QueryPageParam>) => {
      const fromHeight =
        orderByHeight === 'desc'
          ? pageParam?.fromHeight
          : pageParam?.fromHeight || 0;

      const { blocks, total } = await middleware.getBlocks(
        fromHeight,
        'height',
        orderByHeight,
        numToShow,
      );

      return { blocks, total };
    },
    {
      getNextPageParam: ({ blocks }) => {
        const hasMore = blocks.length === numToShow;

        if (!hasMore) return undefined;

        const lastBlockHeight: number = blocks[numToShow - 1].header.height;

        if (orderByHeight === 'desc')
          return {
            fromHeight: lastBlockHeight - 1,
          };
        return {
          fromHeight: lastBlockHeight + 1,
        };
      },
    },
  );
}
