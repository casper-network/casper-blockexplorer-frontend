import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { REFRESH_TIMER_SECONDS } from 'src/constants';
import { middleware } from '../api';
import { QueryProps } from './types';

export interface IUseBlock extends QueryProps {
  accountHashOrPublicKey: string;
}

export default function useAccount({
  accountHashOrPublicKey,
  staleTime = REFRESH_TIMER_SECONDS * 1000,
}: IUseBlock) {
  return useQuery<
    {
      trimmedAccountHash: string;
      publicKey: string | undefined;
      mainPurse: string;
      rawAccount: string;
    },
    AxiosError
  >(
    ['account', accountHashOrPublicKey],
    () => {
      return middleware.getAccount(accountHashOrPublicKey);
    },
    {
      staleTime,
    },
  );
}
