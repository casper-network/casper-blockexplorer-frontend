/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const delegate = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '1b67aca31c016bb97c0d3b4bc5a83d75e370eeafeb3c726b313da08b4e93132f';
  const mockBlockHash =
    '56f71784b297aa03d244c629251a6e73e7a0f7befd6806a70306a893c8ca95c6';
  const mockPublicKey =
    '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7',
      body_hash:
        '8ec82a872f45248c324e074e2f8d6d82b341da0ec3876ad12056e357c873db7e',
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
              bytes: '0400f90295',
              parsed: '2500000000',
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
            'delegator',
            {
              bytes:
                '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7',
              parsed:
                '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7',
              cl_type: 'PublicKey',
            },
          ],
          [
            'validator',
            {
              bytes:
                '017a684f6787e78e68c0063aad5a4fb26448b340d36c0e8aa79d67d82ce03dad28',
              parsed:
                '017a684f6787e78e68c0063aad5a4fb26448b340d36c0e8aa79d67d82ce03dad28',
              cl_type: 'PublicKey',
            },
          ],
          [
            'amount',
            {
              bytes: '0500e288c006',
              parsed: '29000000000',
              cl_type: 'U512',
            },
          ],
        ],
        hash: '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
        entry_point: 'delegate',
      },
      approvals: [
        {
          signer:
            '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7',
          signature: mockPublicKey,
        },
      ],
    },
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Success: {
          cost: '2500000000',
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
                key: 'balance-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b',
                transform: {
                  WriteCLValue: {
                    bytes: '05b0ab4c534f',
                    parsed: '340699950000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '2500000000',
                },
              },
              {
                key: 'hash-93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
                transform: 'Identity',
              },
              {
                key: 'hash-e375d42c29c0e4b2baefa63cf2d70af34439eda851e08129d8515515d63bd6a9',
                transform: 'Identity',
              },
              {
                key: 'bid-2ff11f85e93bcd297bb605200f76a274086d5a71db95c7499ea30aa78db02eb2',
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
                key: 'balance-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b',
                transform: 'Identity',
              },
              {
                key: 'balance-be16cc52bfbe5c1a017b65b31a92214b90c8a59877f5a9a23140135d286cb483',
                transform: 'Identity',
              },
              {
                key: 'balance-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b',
                transform: {
                  WriteCLValue: {
                    bytes: '05b0c9c39248',
                    parsed: '311699950000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-be16cc52bfbe5c1a017b65b31a92214b90c8a59877f5a9a23140135d286cb483',
                transform: {
                  AddUInt512: '29000000000',
                },
              },
              {
                key: 'transfer-f713c730a5629586866e1fa74008195e547fdbaaa50fbb51457d24d651dfed92',
                transform: {
                  WriteTransfer: {
                    id: null,
                    to: 'account-hash-6174cf2e6f8fed1715c9a3bace9c50bfe572eecb763b0ed3f644532616452008',
                    gas: '0',
                    from: 'account-hash-92f3359730c9b6e0a0db5dcbba164dd5250c6d0e5712a968267bdf575c6acdde',
                    amount: '29000000000',
                    source:
                      'uref-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b-007',
                    target:
                      'uref-be16cc52bfbe5c1a017b65b31a92214b90c8a59877f5a9a23140135d286cb483-007',
                    deploy_hash:
                      '1b67aca31c016bb97c0d3b4bc5a83d75e370eeafeb3c726b313da08b4e93132f',
                  },
                },
              },
              {
                key: 'bid-2ff11f85e93bcd297bb605200f76a274086d5a71db95c7499ea30aa78db02eb2',
                transform: {
                  WriteBid: {
                    inactive: false,
                    delegators: {
                      '0124c673e74f3c62c81abc4d35fc171c2e06fe38462c076087121bca6cdff85545':
                        {
                          bonding_purse:
                            'uref-c5633074950d4e36a5b69b564299be89938274fa72a7fd7dedfc203a6eef34b0-007',
                          staked_amount: '53610146848',
                          vesting_schedule: null,
                          delegator_public_key:
                            '0124c673e74f3c62c81abc4d35fc171c2e06fe38462c076087121bca6cdff85545',
                          validator_public_key:
                            '017a684f6787e78e68c0063aad5a4fb26448b340d36c0e8aa79d67d82ce03dad28',
                        },
                      '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7':
                        {
                          bonding_purse:
                            'uref-be16cc52bfbe5c1a017b65b31a92214b90c8a59877f5a9a23140135d286cb483-007',
                          staked_amount: '561686437402',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01cc03dc746892d42f8a7c498511f7d4e66c5423216131c1f43b01e4eabf78a8c7',
                          validator_public_key:
                            '017a684f6787e78e68c0063aad5a4fb26448b340d36c0e8aa79d67d82ce03dad28',
                        },
                    },
                    bonding_purse:
                      'uref-56aef0a3865f3bcb3f35e9cc7b0d36aa574d715f800a05449470aa78d2145778-007',
                    staked_amount: '140720054898222',
                    delegation_rate: 10,
                    vesting_schedule: null,
                    validator_public_key:
                      '017a684f6787e78e68c0063aad5a4fb26448b340d36c0e8aa79d67d82ce03dad28',
                  },
                },
              },
              {
                key: 'deploy-1b67aca31c016bb97c0d3b4bc5a83d75e370eeafeb3c726b313da08b4e93132f',
                transform: {
                  WriteDeployInfo: {
                    gas: '2500000000',
                    from: 'account-hash-92f3359730c9b6e0a0db5dcbba164dd5250c6d0e5712a968267bdf575c6acdde',
                    source:
                      'uref-05bd18e83b91a3a02438d523ff2e68b21ff88c4778b867d10680d7bdf91e4f3b-007',
                    transfers: [
                      'transfer-f713c730a5629586866e1fa74008195e547fdbaaa50fbb51457d24d651dfed92',
                    ],
                    deploy_hash:
                      '1b67aca31c016bb97c0d3b4bc5a83d75e370eeafeb3c726b313da08b4e93132f',
                  },
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
                key: 'balance-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a',
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
                key: 'balance-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a',
                transform: {
                  AddUInt512: '2500000000',
                },
              },
            ],
          },
          transfers: [
            'transfer-f713c730a5629586866e1fa74008195e547fdbaaa50fbb51457d24d651dfed92',
          ],
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
    action: 'delegate',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '2500000000',
    cost: '2500000000',
    status: DeployStatus.Success,
    rawDeploy: JSON.stringify({
      deploy: mockRawDeploy,
      execution_results: mockRawExecutionResults,
    }),
  };

  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
  expect(deploy).toEqual(mockDeploy);
};
