/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const mint = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    'dc5e7244f76a7f2968cf7b6f30d939d790d3ec38676b61ece3ed53403ecfba11';
  const mockBlockHash =
    'a5b97dc530a6474074d8d04c3fcd3cc6f335cc15f9b0e1dda13b404fcb4c5f7a';
  const mockPublicKey =
    '01ff85d8d335d2e5e1a8ba3554b447e2a61853971fc2a5bf9f1302557ef5eb2d4f';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '01ff85d8d335d2e5e1a8ba3554b447e2a61853971fc2a5bf9f1302557ef5eb2d4f',
      body_hash:
        '95c775b707844baae03c585994584aa0147e7d0f55b1556c97c3e053414c7897',
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
              bytes: '04807c814a',
              parsed: '1250000000',
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
            'recipient',
            {
              bytes:
                '005eb516c63517df710028e09d07a4f8309e5f9cd840bed71f3b507c7bf5da2d13',
              parsed: {
                Account:
                  'account-hash-5eb516c63517df710028e09d07a4f8309e5f9cd840bed71f3b507c7bf5da2d13',
              },
              cl_type: 'Key',
            },
          ],
          [
            'token_ids',
            {
              bytes: '0100000006956c15778401',
              parsed: ['1668445203605'],
              cl_type: {
                List: 'U256',
              },
            },
          ],
          [
            'token_metas',
            {
              bytes:
                '0100000005000000040000006e616d650b000000436f6f6c204e46542023320b0000006465736372697074696f6e060000003338346477710b000000636f6e74656e744970667342000000636f6e74656e74666a66777765727533383431383469666b6a617366776f6c76766d32393233666e753275666966786e78687577656866327232776b666a656638340b000000706963747572654970667340000000696d616765666a66777765727533383431383469666b6a617366776f6c76766d32393233666e753275666966786e78687577656866327232776b666a656638340b000000736e69707065744970667342000000736e6970706574666a66777765727533383431383469666b6a617366776f6c76766d32393233666e753275666966786e78687577656866327232776b666a65663834',
              parsed: [
                [
                  {
                    key: 'name',
                    value: 'Cool NFT #2',
                  },
                  {
                    key: 'description',
                    value: '384dwq',
                  },
                  {
                    key: 'contentIpfs',
                    value:
                      'contentfjfwweru384184ifkjasfwolvvm2923fnu2ufifxnxhuwehf2r2wkfjef84',
                  },
                  {
                    key: 'pictureIpfs',
                    value:
                      'imagefjfwweru384184ifkjasfwolvvm2923fnu2ufifxnxhuwehf2r2wkfjef84',
                  },
                  {
                    key: 'snippetIpfs',
                    value:
                      'snippetfjfwweru384184ifkjasfwolvvm2923fnu2ufifxnxhuwehf2r2wkfjef84',
                  },
                ],
              ],
              cl_type: {
                List: {
                  Map: {
                    key: 'String',
                    value: 'String',
                  },
                },
              },
            },
          ],
        ],
        hash: 'aa769fb091e3617e8cfaf336b803bcc13b2e08ca60de7cd427949af38d69f549',
        entry_point: 'mint',
      },
      approvals: [
        {
          signer:
            '01ff85d8d335d2e5e1a8ba3554b447e2a61853971fc2a5bf9f1302557ef5eb2d4f',
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
          cost: '0',
          effect: {
            operations: [],
            transforms: [
              {
                key: 'balance-5707d2dcddb038629e589c5ee830ac73b15e82c3e299f7e08998e0c704ad294f',
                transform: {
                  WriteCLValue: {
                    bytes: '05007fa30320',
                    parsed: '137500000000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-bb9f47c30ddbe192438fad10b7db8200247529d6592af7159d92c5f3aa7716a1',
                transform: {
                  AddUInt512: '2500000000',
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
    action: 'mint',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '1250000000',
    cost: '0',
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
