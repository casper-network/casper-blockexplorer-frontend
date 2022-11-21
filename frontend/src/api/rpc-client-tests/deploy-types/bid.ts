/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const bid = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    'a75b0cb859efdcba04228e22867ae8a6b286ec4a7a7d28f8f786ec2b131a93ca';
  const mockBlockHash =
    'f0e9c9af0b17988c2b4ee1c9ae090a767068442f8bbe82d8c6b86793515f0b0f';
  const mockPublicKey =
    '017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5',
      body_hash:
        '6d08bcf54cebd97ecbd0cb711497292c274d05583189775db8c167c732c7ada3',
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
              bytes: '0400ca9a3b',
              parsed: '1000000000',
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
            'token_id',
            {
              bytes: '0300000000000000',
              parsed: 3,
              cl_type: 'U64',
            },
          ],
          [
            'nft_contract_hash',
            {
              bytes:
                '0197ec1fdd4281b3ea73039f749fc784d80c3a7c562eba5a6a9adca223e3b5aca2',
              parsed: {
                Hash: 'hash-97ec1fdd4281b3ea73039f749fc784d80c3a7c562eba5a6a9adca223e3b5aca2',
              },
              cl_type: 'Key',
            },
          ],
          [
            'bidding_offer',
            {
              bytes: '0500e40b5402',
              parsed: '10000000000',
              cl_type: 'U256',
            },
          ],
          [
            'identifier_mode',
            {
              bytes: '00',
              parsed: 0,
              cl_type: 'U8',
            },
          ],
        ],
        hash: 'a1b6e284312a6dd8eea114f03000afeb5a5a674c8eb6033d27464f009ea46267',
        entry_point: 'bid',
      },
    },
    approvals: [
      {
        signer:
          '01b426de500f84ff4f2d765928fb8053539cf10dd917fb1ff6104eda48a2759e10',
        signature: mockPublicKey,
      },
    ],
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Failure: {
          cost: '327107450',
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
                key: 'balance-beba664d16798fd6f33c8867d7c81706bab79ef2408be9ed31b81657a1dcec59',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-beba664d167 98fd6f33c88 6 7d7c81706bab79ef2408be9ed31b81657a1dcec59',
                transform: {
                  WriteCLValue: {
                    bytes: '06e3518f97ad0b',
                    parsed: '12840199999971',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '1000000000',
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
                  AddUInt512: '1000000000',
                },
              },
            ],
          },
          transfers: [],
          error_message: 'User error: 65533',
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
    action: 'bid',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '1000000000',
    cost: '327107450',
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
