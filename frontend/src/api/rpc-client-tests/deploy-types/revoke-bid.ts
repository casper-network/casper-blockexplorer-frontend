/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const revokeBid = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    'd8dbe5073dd87d08a320a08600721784c7956d9ae7b078e2e9e41d7edae62beb';
  const mockBlockHash =
    '591ba5f6778446645f525864da5320c84848846b108d156128cb57829bf039ce';
  const mockPublicKey =
    '017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5',
      body_hash:
        'b7e91aa7a968e33f0705dcb657a7304293434306d53d40cf9a21aa6f0fd447d7',
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
              bytes: '0200000000000000',
              parsed: 2,
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
            'identifier_mode',
            {
              bytes: '00',
              parsed: 0,
              cl_type: 'U8',
            },
          ],
        ],
        hash: '192fb3d247f0f005d52a61c353b5d729a7d8deaef3ab26ecc4a908825b331ed5',
        entry_point: 'revoke_bid',
      },
    },
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Failure: {
          cost: '75643960',
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
                key: 'balance-beba664d16798fd6f33c8867d7c81706bab79ef2408be9ed31b81657a1dcec59',
                transform: {
                  WriteCLValue: {
                    bytes: '06e3fba2c7ac0a',
                    parsed: '11737199999971',
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
                key: 'balance-cf6fa2ac5424b787885d48bdef0d8281f454841d01c5b28854c589119005ed44',
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
                key: 'balance-cf6fa2ac5424b787885d48bdef0d8281f454841d01c5b28854c589119005ed44',
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
    action: 'revoke_bid',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '1000000000',
    cost: '75643960',
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
