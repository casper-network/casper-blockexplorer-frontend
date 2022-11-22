/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const approveDeploy = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    'a1a9ad69d169d299e7a1cd30765413b35cd40d8f1a58d674e46c3125c01f36a3';
  const mockBlockHash =
    '099dc8be4e8d372b09c3a8236c4cbcac9c6a4ca5b9068fd666135c69e6f7cdfa';
  const mockPublicKey =
    '019dae8e2ef08104aa7746c5458692287289b63c495e1d4659686fb80c259e4d51';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '019dae8e2ef08104aa7746c5458692287289b63c495e1d4659686fb80c259e4d51',
      body_hash:
        '404dfdc42a5e8706c1d541fa95c308a5c9b8a683cc8da5bf25f44c46a71c4f6b',
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
              bytes: '0400943577',
              parsed: '2000000000',
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
            'event_id',
            {
              bytes: '0100000030',
              parsed: '0',
              cl_type: 'String',
            },
          ],
        ],
        hash: '9b09374894bb8cc68b7ec220d0a80dff625c7a99fe20133a586bc2f02923646d',
        entry_point: 'approve_deploy',
      },
      approvals: [
        {
          signer:
            '9b09374894bb8cc68b7ec220d0a80dff625c7a99fe20133a586bc2f02923646d',
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
          cost: '526096230',
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
                key: 'balance-53e5d4ed109f9b5a70b501fd4026a73ae4a39c2217dbcdbfdae43f98c90b8154',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-53e5d4ed109f9b5a70b501fd4026a73ae4a39c2217dbcdbfdae43f98c90b8154',
                transform: {
                  WriteCLValue: {
                    bytes: '065f23130d640d',
                    parsed: '14723367248735',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddInt512: '2000000000',
                },
              },
              {
                key: 'hash-9b09374894bb8cc68b7ec220d0a80dff625c7a99fe20133a586bc2f02923646d',
                transform: 'Identity',
              },
              {
                key: 'hash-9c03207644daaf2dba84d0f16a8f4e508cd49b8181c8b920b873e2fa9548f5b2',
                transform: 'Identity',
              },
              {
                key: 'hash-91897c23b87809e9002123ab398c9f913d766b4af30352d139775177893ab284',
                transform: 'Identity',
              },
              {
                key: 'dictionary-1c54c84521135e9e58c744a936fd7f978a685383c9ecdc0be0f9cd92943ec888',
                transform: 'Identity',
              },
              {
                key: 'dictionary-e51510a9747781035a4ecda8ec4beb391e0a8d27ccfc4ebe88b62710451945cf',
                transform: 'Identity',
              },
              {
                key: 'dictionary-6f7f882cd72600135093ff6e08a17389ff943d18fc4099be0aa309b0dc5f267b',
                transform: 'Identity',
              },
              {
                key: 'dictionary-2072ff819b69edcdb723342bfae77e2d18992b1a65cc76dc9cdf802f68a0c09e',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '01000000010d09200000005b5a26a7d8ac4fb95cbfa287d2955ca22a67fd5cf9594da21ead031c777635dd4000000036323131326538663636303436343832613966633537306664623131643363306566346630366331393764313034393739613735346164303935306238306435',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-f2032379fc0d0fb2d9a8eca6c4cf1ae3d5ad8f98e8bd7514650d9d294b4fdd05',
                transform: 'Identity',
              },
              {
                key: 'dictionary-b8997e804afbdc845380b4d2e75a061f8e9f5e30ad21abce9ac49e1e1319c967',
                transform: {
                  WriteCLValue: {
                    bytes:
                      'e00100000100c0a8e051e2ade1bf58a78e73e5982d2526f787dfb26d4331cfac11ae3919f6e962112e8f66046482a9fc570fdb11d3c0ef4f06c197d104979a754ad0950b80d59a0100007b2274223a226465706c6f79222c2265223a7b226e616d65223a224a756c696f2773205370697269747332222c2273796d626f6c223a224a554c494f575332222c226d657461223a7b226d6178223a223131222c226e616d65223a225468652056616e697368696e67205370697269747332222c226f70656e223a2266616c7365222c2272656c65617365223a22323032322d30332d3231222c227369676e6174757265223a223461306537663564643535376538613537383337303338386335313235656361636338643563616162666366313065383038366331376332623964626633613965313862383234616663666263323837636434663461373136316666653266393361383963613335383864356530633063623137663334663861306134383037222c22736c7567223a227468655f76616e697368696e675f7370697269747332222c2274797065223a226361736b32222c225f223a225f227d2c2261646d696e223a222121554e4b4e4f574e2d545950452121222c225f223a225f227d2c227473223a2231363638353138393033383038227d0d140b0f200000000a20000000a249598879a0285187b3bbad43b07d8e4e60b1ac29668de2fb7c2adc9b9292390100000037',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-f2032379fc0d0fb2d9a8eca6c4cf1ae3d5ad8f98e8bd7514650d9d294b4fdd05',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '030000000101080d0720000000a249598879a0285187b3bbad43b07d8e4e60b1ac29668de2f b7c2adc9b9292390b0000006576656e745f 636f756e74',
                    'parse d': null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'deploy-a1a9ad69d169d299e7a1cd30765413b35cd40d8f1a58d674e46c3125c01f36a3',
                transform: {
                  WriteDeployInfo: {
                    gas: '526096230',
                    from: 'account-hash-c0a8e051e2ade1bf58a78e73e5982d2526f787dfb26d4331cfac11ae3919f6e9',
                    source:
                      'uref-53e5d4ed109f9b5a70b501fd4026a73ae4a39c2217dbcdbfdae43f98c90b8154-007',
                    transfers: [],
                    deploy_hash:
                      'a1a9ad69d169d299e7a1cd30765413b35cd40d8f1a58d674e46c3125c01f36a3',
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
                key: 'balance-917253870c7bafa7a8985add41dcee118ef2ff268581771e47e57704bc465c7d',
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
                key: 'balance-917253870c7bafa7a8985add41dcee118ef2ff268581771e47e57704bc465c7d',
                transform: {
                  AddInt512: '2000000000',
                },
              },
            ],
          },
          transfers: [],
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
    action: 'approve_deploy',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '2000000000',
    cost: '526096230',
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
