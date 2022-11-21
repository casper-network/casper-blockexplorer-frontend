/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const claim = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '3462f410a45eea748c1093de6256a396d395069066126e2c8bb6ee4de1ba37f0';
  const mockBlockHash =
    'fb41c98ec311fbab556d1bb59f281476135ec1b519f3126fee40c9169f7fe336';
  const mockPublicKey =
    '0202b2a13f20e71016aa8bbca5fbc1cca56af4092c926490e65dcfab2168ab051c92';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '0202b2a13f20e71016aa8bbca5fbc1cca56af4092c926490e65dcfab2168ab051c92',
      body_hash:
        '344e4ba198e3ebe44ce5edf48e0d564bb0f0b91812732ffddc3319cd3b683efb',
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
              bytes: '05008d380c01',
              parsed: '4500000000',
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
            'signature',
            {
              bytes:
                '8200000064386133373234363936336462306663643732343938346563633930393936643163636163653435366566383661613935653261333530636531396662623165353533313732383963326661303165643535633262353031373034666131353763343439343137386530656461313134333663386464393965346437383538333162',
              parsed:
                'd8a37246963db0fcd724984ecc90996d1ccace456ef86aa95e2a350ce19fbb1e55317289c2fa01ed55c2b501704fa157c4494178e0eda11436c8dd99e4d785831b',
              cl_type: 'String',
            },
          ],
          [
            'token_id',
            {
              bytes: '0b00000000000000',
              parsed: 11,
              cl_type: 'U64',
            },
          ],
        ],
        hash: '1d2f5eed581e3750fa3d2fd15ef782aa66a55a679346c0a339c485c78fc9fe68',
        entry_point: 'claim',
      },
      approvals: [
        {
          signer:
            '0202b2a13f20e71016aa8bbca5fbc1cca56af4092c926490e65dcfab2168ab051c92',
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
          cost: '3773563480',
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
                key: 'balance-1daccd82932cae4b20cc40d432b5201374aa44f572c4f25b23a119ba42fd9d40',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-1daccd82932cae4b20cc40d432b5201374aa44f572c4f25b23a119ba42fd9d40',
                transform: {
                  WriteCLValue: {
                    bytes: '0500542379e1',
                    parsed: '968400000000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '4500000000',
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
                  AddUInt512: '4500000000',
                },
              },
            ],
          },
          transfers: [],
          error_message: 'User error: 5',
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
    action: 'claim',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '4500000000',
    cost: '3773563480',
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
