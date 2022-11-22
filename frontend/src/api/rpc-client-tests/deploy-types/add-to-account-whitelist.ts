/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const addToAccountWhitelist = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    'a6db3fbbbefb3d5e0ce0cc19c0e2405907dba819f566f0e9782e54f20a91f78b';
  const mockBlockHash =
    '45e6e5fbc905b47a54374bc566764384a3305947c8009b331bc6aea5a5fa3730';
  const mockPublicKey =
    '01ad8be701328b146b525ef81731de43ef898bc1e957babc44c1c1029f2c15506b';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '01ad8be701328b146b525ef81731de43ef898bc1e957babc44c1c1029f2c15506b',
      body_hash:
        '9c47b67e923f2e758da5a65e1b46fff8b72b1b383cabbe8056743e9b775bd9cc',
      gas_price: 1,
      timestamp: dateTimeString,
      chain_name: 'casper-test',
      dependencies: [],
    },
    payment: {
      ModuleBytes: {
        args: [
          [
            'amount',
            {
              bytes: '04804a5d05',
              parsed: '90000000',
              cl_type: 'U512',
            },
          ],
        ],
        module_bytes: '',
      },
    },
    session: {
      StoredContractByHash: {
        args: [
          [
            'account_whitelist',
            {
              bytes:
                '00cd108b67ad506ef767d2ddd0da063e29f3e5167a1693b4ad9899ae74c440b3c8',
              parsed: {
                Account:
                  'account-hash-cd108b67ad506ef767d2ddd0da063e29f3e5167a1693b4ad9899ae74c440b3c8',
              },
              cl_type: 'Key',
            },
          ],
        ],
        hash: 'dae190a32c92bc6aefb70931f3c50f2af165f04646036f5ce10d19ac04438870',
        entry_point: 'add_to_account_whitelist',
      },
      approvals: [
        {
          signer:
            '01ad8be701328b146b525ef81731de43ef898bc1e957babc44c1c1029f2c15506b',
          signature: mockPublicKey,
        },
      ],
    },
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Failure: {
          cost: '90000000',
          effect: {
            operations: [],
            transforms: [
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-624dbe2395b9d9503fbee82162f1714ebff6b639f96d2084d26d944c354ec4c5',
                transform: 'Identity',
              },
              {
                key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                transform: 'Identity',
              },
              {
                key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                transform: 'Identity',
              },
              {
                key: 'balance-83d4446204402d482ddd057ad3aac45047d22b42202d3ac6aedafc8f42e9b328',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-83d4446204402d482ddd057ad3aac45047d22b42202d3ac6aedafc8f42e9b328',
                transform: {
                  WriteCLValue: {
                    bytes: '0500c140719b',
                    parsed: '667620000000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '90000000',
                },
              },
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-624dbe2395b9d9503fbee82162f1714ebff6b639f96d2084d26d944c354ec4c5',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                transform: 'Identity',
              },
              {
                key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-bb9f47c30ddbe192438fad10b7db8200247529d6592af7159d92c5f3aa7716a1',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  WriteCLValue: {
                    bytes: '00',
                    parsed: '0',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-bb9f47c30ddbe192438fad10b7db8200247529d6592af7159d92c5f3aa7716a1',
                transform: {
                  AddUInt512: '90000000',
                },
              },
            ],
          },
          transfers: [],
          error_message: 'Out of gas error',
        },
      },
    },
  ];

  const mockJsonRpc = {
    getDeployInfo: jest.fn().mockResolvedValue({
      deploy: mockRawDeploy,
      execution_results: mockRawExecutionResults,
    }),
  };

  const mockRpcClient = new RpcApi(mockJsonRpc as any);

  const deploy = await mockRpcClient.getDeploy(mockDeployHash);

  const mockDeploy = {
    timestamp: dateTimeString,
    timeSince: deploy?.timeSince,
    readableTimestamp: formatDate(dateTime),
    deployHash: mockDeployHash,
    blockHash: mockBlockHash,
    publicKey: mockPublicKey,
    action: 'add_to_account_whitelist',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '90000000',
    cost: '90000000',
    status: DeployStatus.Failed,
    rawDeploy: JSON.stringify({
      deploy: mockRawDeploy,
      execution_results: mockRawExecutionResults,
    }),
  };

  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
  expect(deploy).toEqual(mockDeploy);
};
