import { useQuery } from '@tanstack/react-query';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { middleware } from '../api';
import { QueryProps } from './types';

type IUseLatestBlockHeight = QueryProps;

export default function useLatestBlock(props?: IUseLatestBlockHeight) {
  const staleTime = props?.staleTime || REFRESH_TIMER_SECONDS * 1000;
  return useQuery(
    ['latest-block'],
    middleware.getLatestBlock.bind(middleware),
    {
      staleTime,
    },
  );
}
