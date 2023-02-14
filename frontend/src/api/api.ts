// Still a few kinks to be ironed out - TS sees no issue but our linter does
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Response return is read as any by our linter for some reason
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from 'axios';
import { SortDirection } from '@tanstack/react-table';
import { CLValueParsers } from 'casper-js-sdk';
import { formatDate, formatTimeAgo, loadConfig } from 'src/utils';
import { createBaseApi } from './base-api';
import { ApiData, DeployStatus } from './types';
import { determineDeploySessionData, isValidPublicKey } from './utils';
import { JsonDeploySession } from './missing-sdk-types';
import { DEFAULT_PAGINATION } from './rpc-client';

const { webServerUrl } = loadConfig();

const createApi = (baseUrl: string) => {
  const middlewareApi = createBaseApi(baseUrl);

  return {
    block: {
      async getBlocks(
        tableParams: {
          from?: number;
          sort_by?: string;
          order_by?: SortDirection;
          count?: number;
        } = {},
      ) {
        type Response = AxiosResponse<ApiData.Blocks>;

        const response = await middlewareApi.get<Response>('/blocks', {
          params: {
            ...tableParams,
            count: tableParams?.count ?? DEFAULT_PAGINATION,
          },
        });

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
      async getBlock(hashOrHeight: string | number) {
        type Response = AxiosResponse<ApiData.Block>;

        const response = await middlewareApi.get<Response>(
          `/block/${hashOrHeight}`,
        );

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response;

        return data;
      },
      async getLatestBlock() {
        type Response = AxiosResponse<ApiData.Block>;

        const response = await middlewareApi.get<Response>('/latest-block');

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
      async getPeers() {
        type Response = AxiosResponse<ApiData.Peers>;

        const response = await middlewareApi.get<Response>('/peers');

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: { result },
        } = response;

        return result;
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
    },
    validator: {
      async getValidators() {
        type Response = AxiosResponse<ApiData.Validators>;

        const response = await middlewareApi.get<Response>('/validators');

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: { validators },
        } = response;

        return validators;
      },
    },
    /**
     * Retrieve an aggregate of the various states a deploy goes through, given its deploy hash. The node does not emit this event, but the Sidecar computes it and returns it for the given deploy. This endpoint behaves differently than other endpoints, which return the raw event received from the node.
     * @param hash deploy hash to get deploy
     */
    // TODO: should we perform the business logic in the redux action?
    deploy: {
      async getDeploy(hash: string) {
        type Response = AxiosResponse<ApiData.Deploy>;

        const response = await middlewareApi.get<Response>(`/deploy/${hash}`);

        if (response.status !== 200) throw new Error(response.statusText);

        const {
          data: { execution_results: executionResults, ...deploy },
        } = response;

        // @ts-ignore
        const paymentMap = new Map(deploy.payment.ModuleBytes?.args);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const paymentAmount = CLValueParsers.fromJSON(paymentMap.get('amount'))
          .unwrap()
          .value()
          .toString() as string;

        const { timestamp, account: publicKey } = deploy.header;

        const { block_hash: blockHash, result: executionResult } =
          executionResults[0];

        const status = executionResult.Success
          ? DeployStatus.Success
          : DeployStatus.Failed;

        const deploySession = deploy.session as JsonDeploySession;

        const { action, deployType, amount } = determineDeploySessionData(
          deploySession,
          status,
        );

        const cost = executionResult.Success
          ? executionResult.Success.cost
          : executionResult.Failure?.cost ?? 0;

        const dateTime = new Date(timestamp);

        const timeSince = formatTimeAgo(dateTime);
        const readableTimestamp = formatDate(dateTime);

        return {
          timestamp,
          timeSince,
          readableTimestamp,
          deployHash: deploy.hash,
          blockHash,
          publicKey,
          action,
          deployType,
          amount,
          paymentAmount,
          cost: cost.toString(),
          status,
          rawDeploy: JSON.stringify({
            deploy,
            execution_results: executionResults,
          }),
        };
      },
    },
  };
};

export const middlewareServiceApi = createApi(webServerUrl);
