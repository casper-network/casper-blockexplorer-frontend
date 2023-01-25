import { useQuery } from '@tanstack/react-query';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { middleware } from '../api';
import { QueryProps } from './types';

type IUsePeers = QueryProps;

export default function usePeers(props?: IUsePeers) {
  const staleTime = props?.staleTime || REFRESH_TIMER_SECONDS * 1000;
  return useQuery(['peers'], middleware.getPeers.bind(middleware), {
    staleTime,
  });
}
