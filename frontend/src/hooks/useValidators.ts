import { useQuery } from '@tanstack/react-query';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { casperApi } from '../api';
import { QueryProps } from './types';

type IUsePeers = QueryProps;

export default function useValidators(props?: IUsePeers) {
  const staleTime = props?.staleTime || REFRESH_TIMER_SECONDS * 1000;
  return useQuery(['validators'], casperApi.getValidators.bind(casperApi), {
    staleTime,
  });
}
