import { useQuery } from '@tanstack/react-query';
import { casperApi } from 'src/api';

export default function useLatestBlockHeight() {
  return useQuery(['latest-block-height'], casperApi.getCurrentBlockHeight, {
    initialData: undefined,
  });
}
