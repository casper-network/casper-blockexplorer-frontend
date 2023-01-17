import {
  CLValueParsers,
  CasperServiceByJsonRPC,
  CLPublicKey,
} from 'casper-js-sdk';

import { Deploy, DeployStatus, NetworkStatus } from './types';
import { formatDate, formatTimeAgo, loadConfig } from '../utils';
import { ApiError } from './api-error';
import {
  GetStatusResultExtended,
  JsonDeploySession,
} from './missing-sdk-types';
import { determineDeploySessionData } from './utils';

export const DEFAULT_NUM_TO_SHOW = 10;

const { webServerUrl } = loadConfig();

export class RpcApi {
  constructor(
    private readonly rpcClient: CasperServiceByJsonRPC,
    private readonly defaultPagination: number = DEFAULT_NUM_TO_SHOW,
  ) {}

  async getValidators() {
    const latestBlock = await this.rpcClient.getLatestBlockInfo();
    const latestEraId = latestBlock.block?.header.era_id;

    const validtorsInfo = await this.rpcClient.getValidatorsInfo();

    const currentValidators = validtorsInfo.auction_state.era_validators.find(
      ({ era_id }) => era_id === latestEraId,
    );

    return currentValidators?.validator_weights;
  }

  getDeploy: (deployHash: string) => Promise<Deploy | undefined> =
    async deployHash => {
      try {
        const { deploy, execution_results: executionResults } =
          await this.rpcClient.getDeployInfo(deployHash);

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
          deployHash,
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
      } catch (err) {
        throw new ApiError({
          type: RpcApiError.DeployFetchFailed,
          message: 'An error occurred while fetching deploy with hash',
          data: {
            deployHash,
            err,
          },
        });
      }
    };

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
