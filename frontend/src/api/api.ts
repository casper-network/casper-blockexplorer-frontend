// Still a few kinks to be ironed out - TS sees no issue but our linter does
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Response return is read as any by our linter for some reason
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from 'axios';
import { createBaseApi } from './base-api';
import { loadConfig } from 'src/utils';
import { ApiData } from './types';
import { SortDirection } from '@tanstack/react-table';
import { isValidPublicKey } from './utils';

const { webServerUrl } = loadConfig();

interface ApiResponse<T> {
  readonly ok: true;
  readonly err: false;
  readonly val: T;
}

const createApi = (baseUrl: string) => {
  const middlewareApi = createBaseApi(baseUrl);

  return {
    block: {
      async getBlocks(tableParams: {
        from?: number;
        sort_by?: string;
        order_by?: SortDirection;
        count: number;
      }) {
        type Response = AxiosResponse<ApiResponse<ApiData.Blocks>>;

        const response = await middlewareApi.get<Response>('/blocks', {
          params: tableParams,
        });

        if (response.status !== 200) throw new Error(response.statusText);

        const { val } = response.data;

        return val;
      },
      async getBlock(hashOrHeight: string | number) {
        type Response = AxiosResponse<ApiResponse<ApiData.Block>>;

        const response = await middlewareApi.get<Response>(
          `/block/${hashOrHeight}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { val } = response.data;

        return val;
      },
      async getLatestBlock() {
        type Response = AxiosResponse<ApiResponse<ApiData.Block>>;

        const response = await middlewareApi.get<Response>('/latest-block');

        if (response.status !== 200) throw new Error(response.statusText);

        const { val } = response.data;

        return val;
      },
    },
    status: {
      async getStatus() {
        type Response = AxiosResponse<ApiResponse<ApiData.Status>>;

        const response = await middlewareApi.get<Response>('/status');

        if (response.status !== 200) throw new Error(response.statusText);

        const { val } = response.data;

        return val;
      },
    },
    peer: {
      async getPeers() {
        type Response = AxiosResponse<ApiResponse<ApiData.Peers>>;

        const response = await middlewareApi.get<Response>('/peers');

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          val: { result },
        } = response.data;

        return result;
      },
    },
    account: {
      async getAccount(hashOrPublicKey: string) {
        type Response = AxiosResponse<ApiResponse<ApiData.Account>>;

        const response = await middlewareApi.get<Response>(
          `/account/${hashOrPublicKey}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { val: account } = response.data;

        return {
          trimmedAccountHash: account._accountHash.slice(13),
          publicKey: isValidPublicKey(hashOrPublicKey)
            ? hashOrPublicKey
            : undefined,
          mainPurse: account.mainPurse,
          rawAccount: JSON.stringify(account),
        };
      },
    },

    // assets: {
    //   async getAssets(assetType?: any, search?: string) {
    //     type Response = AxiosResponse<ApiResponse<ApiData.Asset[]>>;

    //     const response = await middlewareApi.get<Response>('/assets', {
    //       params: { type: assetType, search },
    //     });

    //     if (response.status !== 200) throw new Error(response.statusText);

    //     const { val } = response.data;

    //     return val;
    //   },
    //   async getAsset(assetId: string) {
    //     type Response = AxiosResponse<ApiResponse<ApiData.Asset>>;

    //     const response = await middlewareApi.get<Response>(
    //       `/assets/${assetId}`,
    //     );

    //     if (response.status !== 200) throw new Error(response.statusText);

    //     const { val } = response.data;

    //     return val;
    //   },
    // },
    // sfc: {
    //   async getSFCs(fetchTokenized: boolean) {
    //     type Response = AxiosResponse<ApiResponse<ApiData.SFC[]>>;

    //     const response = await middlewareApi.get<Response>('/sfc', {
    //       params: { tokenized: fetchTokenized },
    //     });

    //     if (response.status !== 200) throw new Error(response.statusText);

    //     const { val } = response.data;

    //     return val;
    //   },
    //   async getSFC(sfcId: string) {
    //     type Response = AxiosResponse<ApiResponse<ApiData.SFC>>;

    //     const response = await middlewareApi.get<Response>(`/sfc/${sfcId}`);

    //     if (response.status !== 200) throw new Error(response.statusText);

    //     const { val } = response.data;

    //     return val;
    //   },
    // },
  };
};

export const coreServiceApi = createApi(webServerUrl);
