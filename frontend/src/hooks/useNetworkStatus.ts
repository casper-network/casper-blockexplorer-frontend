import { useQuery } from '@tanstack/react-query';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { middleware } from '../api';
import { QueryProps } from './types';

type IUseNetworkStatus = QueryProps;

export default function useNetworkStatus(props?: IUseNetworkStatus) {
  const staleTime = props?.staleTime || REFRESH_TIMER_SECONDS * 1000;
  return useQuery(['status'], middleware.getStatus.bind(middleware), {
    staleTime,
  });
}
