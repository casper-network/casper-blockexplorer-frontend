import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { Deploy, middleware } from '../api';
import { QueryProps } from './types';

export interface IUseDeploy extends QueryProps {
  hash: string;
}

export default function useDeploy({
  hash,
  staleTime = REFRESH_TIMER_SECONDS * 1000,
}: IUseDeploy) {
  return useQuery<Deploy, AxiosError>(
    ['deploy', hash],
    () => {
      return middleware.getDeploy(hash);
    },
    {
      staleTime,
    },
  );
}
