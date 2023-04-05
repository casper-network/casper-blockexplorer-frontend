// Still a few kinks to be ironed out - TS sees no issue but our linter does
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Response return is read as any by our linter for some reason
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from 'axios';
import { SortDirection } from '@tanstack/react-table';
import { loadConfig } from 'src/utils';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { createBaseApi } from './base-api';
import { ApiData } from './types';
import { isValidPublicKey } from './utils';

const { webServerUrl } = loadConfig();

const createApi = (baseUrl: string) => {
  const middlewareApi = createBaseApi(baseUrl);

  return {
    block: {
      async getBlocks(
        tableParams: {
          sortBy?: string;
          orderBy?: SortDirection;
          count?: number;
          pageNum?: number;
        } = {},
      ) {
        type Response = AxiosResponse<ApiData.Blocks>;

        const response = await middlewareApi.get<Response>('/blocks', {
          params: {
            ...tableParams,
            count: tableParams?.count ?? DEFAULT_PAGESIZE,
          },
        });

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
      async getBlock(hashOrHeight: string | number) {
        type Response = AxiosResponse<ApiData.Block>;

        const response = await middlewareApi.get<Response>(
          `/blocks/${hashOrHeight}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
      async getLatestBlock() {
        type Response = AxiosResponse<ApiData.Block>;

        const response = await middlewareApi.get<Response>(
          '/blocks/latest-block',
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
    },
    status: {
      async getStatus() {
        type Response = AxiosResponse<ApiData.Status>;

        const response = await middlewareApi.get<Response>('/status');

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
    },
    peer: {
      async getPeers(
        tableParams: {
          sortBy?: string;
          orderBy?: SortDirection;
          count?: number;
          pageNum?: number;
        } = {},
      ) {
        type Response = AxiosResponse<ApiData.Peers>;

        const response = await middlewareApi.get<Response>('/peers', {
          params: {
            pageNum: tableParams.pageNum,
            count: tableParams?.count ?? DEFAULT_PAGESIZE,
          },
        });

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: { paginatedResult, totalPeers },
        } = response;

        return { paginatedResult, totalPeers };
      },
    },
    account: {
      async getAccount(hashOrPublicKey: string) {
        type Response = AxiosResponse<ApiData.Account>;

        const response = await middlewareApi.get<Response>(
          `/account/${hashOrPublicKey}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data: account } = response;

        return {
          trimmedAccountHash: account._accountHash.slice(13),
          publicKey: isValidPublicKey(hashOrPublicKey)
            ? hashOrPublicKey
            : undefined,
          mainPurse: account.mainPurse,
          rawAccount: JSON.stringify(account),
        };
      },
      async getBalance(uref: string) {
        type Response = AxiosResponse<{ balance: string }>;

        const response = await middlewareApi.get<Response>(
          `/account/balance/${uref}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: { balance },
        } = response;

        return {
          balance,
        };
      },
    },
    validator: {
      async getValidators(
        tableParams: {
          sortBy?: string;
          orderBy?: SortDirection;
          count?: number;
          pageNum?: number;
        } = {},
      ) {
        type Response = AxiosResponse<ApiData.Validators>;

        const response = await middlewareApi.get<Response>(
          '/validators/current-era-validators',
          {
            params: {
              ...tableParams,
              count: tableParams?.count ?? DEFAULT_PAGESIZE,
            },
          },
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: {
            validators: { validators },
          },
        } = response;

        return validators;
      },
      async getCurrentEraValidatorStatus() {
        type Response = AxiosResponse<ApiData.CurrentEraValidatorStatus>;

        const response = await middlewareApi.get<Response>(
          '/validators/current-era-validators-status',
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
    },
    /**
     * Retrieve an aggregate of the various states a deploy goes through, given its deploy hash. The node does not emit this event, but the Sidecar computes it and returns it for the given deploy. This endpoint behaves differently than other endpoints, which return the raw event received from the node.
     * @param hash deploy hash to get deploy
     */
    deploy: {
      async getDeploy(hash: string) {
        type Response = AxiosResponse<ApiData.ProcessedDeploy>;

        const response = await middlewareApi.get<Response>(`/deploys/${hash}`);

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
    },
  };
};

export const middlewareServiceApi = createApi(webServerUrl);
