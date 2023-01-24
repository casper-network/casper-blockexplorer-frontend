import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { Block, middleware } from '../api';
import { QueryProps } from './types';

export interface IUseBlock extends QueryProps {
  blockHashOrHeight: string | number;
}

export default function useBlock({
  blockHashOrHeight,
  staleTime = REFRESH_TIMER_SECONDS * 1000,
}: IUseBlock) {
  return useQuery<Block, AxiosError>(
    ['block', blockHashOrHeight],
    () => {
      return middleware.getBlock(blockHashOrHeight);
    },
    {
      staleTime,
    },
  );
}
