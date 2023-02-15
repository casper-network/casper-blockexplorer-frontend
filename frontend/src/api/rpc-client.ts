import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';

import { NetworkStatus } from './types';
import { loadConfig } from '../utils';
import { ApiError } from './api-error';
import { GetStatusResultExtended } from './missing-sdk-types';

const { webServerUrl, defaultPagination } = loadConfig();

export class RpcApi {
  constructor(
    private readonly rpcClient: CasperServiceByJsonRPC,
    private readonly defaultPagination: number = defaultPagination,
  ) {}

  getAccount = async (publicKeyHex: string) => {
    try {
      const stateRootHash = await this.rpcClient.getStateRootHash();
      const accountHash = CLPublicKey.fromHex(publicKeyHex).toAccountHashStr();

      const { Account: account } = await this.rpcClient.getBlockState(
        stateRootHash,
        accountHash,
        [],
      );

      if (!account) {
        throw new ApiError({
          type: RpcApiError.AccountMissing,
          message: 'Unable to find account',
          data: {
            publicKeyHex,
            stateRootHash,
            accountHash,
          },
        });
      }

      return {
        rawAccountHash: accountHash,
        trimmedAccountHash: accountHash.slice(13),
        publicKey: publicKeyHex,
        mainPurse: account.mainPurse,
        rawAccount: JSON.stringify(account),
      };
    } catch (err) {
      if ((err as ApiError).type === RpcApiError.AccountMissing) {
        throw err;
      }

      throw new ApiError({
        type: RpcApiError.AccountFetchFailed,
        message: 'An error occurred while fetching account',
        data: {
          publicKeyHex,
          err,
        },
      });
    }
  };

  getBalance: (uref: string) => Promise<string | null> = async uref => {
    try {
      const stateRootHash = await this.rpcClient.getStateRootHash();
      const balance = await this.rpcClient.getAccountBalance(
        stateRootHash,
        uref,
      );

      if (!!balance) {
        return balance.toString();
      }

      return null;
    } catch (err) {
      throw new ApiError({
        type: RpcApiError.BalanceFetchFailed,
        message: 'An error occurred while fetching account balance',
        data: {
          err,
          uref,
        },
      });
    }
  };

  getStatus: () => Promise<NetworkStatus> = async () => {
    try {
      const {
        api_version: apiVersion,
        build_version: buildVersion,
        chainspec_name: networkName,
      } = (await this.rpcClient.getStatus()) as GetStatusResultExtended;

      const build = buildVersion.slice(0, 5);
      const api = apiVersion;

      return {
        api,
        build,
        networkName,
      };
    } catch (err) {
      throw new ApiError({
        type: RpcApiError.GetStatusFailed,
        message: 'An error occurred while fetching blocks',
        data: {
          err,
        },
      });
    }
  };
}

export enum RpcApiError {
  BlockMissing = 'getBlock/missing',
  AccountMissing = 'getAccount/missing',
  BlockByHeightMissing = 'getBlockByHeight/missing',
  BlockFetchFailed = 'getBlock/fetch-failed',
  AccountFetchFailed = 'getAccount/fetch-failed',
  DeployFetchFailed = 'getDeploy/fetch-failed',
  PeersFetchFailed = 'getPeers/fetch-failed',
  BalanceFetchFailed = 'getBalance/fetch-failed',
  CurrentBlockHeightFailed = 'getCurrentBlockHeight/fetch-failed',
  BlockByHeightFailed = 'getBlockByHeight/fetch-failed',
  GetBlocksFailed = 'getBlocks/fetch-failed',
  GetStatusFailed = 'getStatus/fetch-failed',
}

const casperJsonRpcService = new CasperServiceByJsonRPC(`${webServerUrl}/rpc`);

export const casperApi = new RpcApi(casperJsonRpcService);
