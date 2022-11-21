/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const burn = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '4e68db65764a6913057dcdb35fe30dc72cae5a729d786e47026309a9e3c531cc';
  const mockBlockHash =
    '82adedb67e0a995ce272b3d8c46ad949c4f4d5c21f8fb349e54762bc876bd736';
  const mockPublicKey =
    '012e37ffd943f25cf1fa6f0fbb3bdca845cbc468b08a34f3d5752ae03ef5dd07a1';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '012e37ffd943f25cf1fa6f0fbb3bdca845cbc468b08a34f3d5752ae03ef5dd07a1',
      body_hash:
        'e07587bd18114cf9a470b6b0026932fca3e4ff9d7b6b42ff7a3252978cf2c5d7',
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
        hash: 'c99d90bf0bcc1e3df0b270bea621455d31ad4e401168381f3860684d9e740b4d',
        entry_point: 'burn',
        args: [
          [
            'owner',
            {
              cl_type: 'Key',
              bytes:
                '00796145ff708ac4e160e790f37cef5d4d40f30fd2189cb69083746c62176776ee',
              parsed: {
                Account:
                  'account-hash-796145ff708ac4e160e790f37cef5d4d40f30fd2189cb69083746c62176776ee',
              },
            },
          ],
          [
            'token_ids',
            {
              cl_type: {
                List: 'U256',
              },
              bytes: '010000000106',
              parsed: ['6'],
            },
          ],
        ],
      },
      approvals: [
        {
          signer:
            '012e37ffd943f25cf1fa6f0fbb3bdca845cbc468b08a34f3d5752ae03ef5dd07a1',
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
                key: 'balance-e4cf34cd20c6987a8bb84f070f675c23bf79ea17e9cb1c47205a92904c4b1f87',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-e4cf34cd20c6987a8bb84f070f675c23bf79ea17e9cb1c47205a92904c4b1f87',
                transform: {
                  WriteCLValue: {
                    cl_type: 'U512',
                    bytes: '050074a07129',
                    parsed: '178000000000',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '2000000000',
                },
              },
              {
                key: 'hash-c99d90bf0bcc1e3df0b270bea621455d31ad4e401168381f3860684d9e740b4d',
                transform: 'Identity',
              },
              {
                key: 'hash-954fa9f73e24b76275ecedd69d135b2011467acaaf799795e5ab9134d0949ce0',
                transform: 'Identity',
              },
              {
                key: 'hash-600077eead3e78166c4962bbddc912dfff2367eba343acbe2f4e8cfb83a1860a',
                transform: 'Identity',
              },
              {
                key: 'dictionary-e93be31a946dd2856722c44039b47e8f75d0a3fbc0e592cf83ff7af964ac52de',
                transform: 'Identity',
              },
              {
                key: 'dictionary-81cba4768176013bde35896840563041ec0332ef48b1cbcff7774c10ba08cc62',
                transform: 'Identity',
              },
              {
                key: 'dictionary-df94c0af800492c6f659bf4ac58a2f7141bf1b671238e247fb30200f397d9821',
                transform: 'Identity',
              },
              {
                key: 'dictionary-28fdb40cb2531468cae47a578570a583abaec863700aba9b0b93ed4bf28a4284',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '01000000000d072000000044e79fd79b287b795baf7198a2e56e2e728cab6d4f4a625038189fb265b126464000000032636331383036393562366235643531666266616233393738393231666436646434363936636663313037383530396561353464383137313961326231373162',
                    parsed: null,
                  },
                },
              },
              {
                key: 'dictionary-81cba4768176013bde35896840563041ec0332ef48b1cbcff7774c10ba08cc62',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '030000000101020d0720000000599550c6b0901a3c9a7077522f8cd52a05c02204bfb78d4f9e34a63d93e4a6044000000037393631343566663730386163346531363065373930663337636566356434643430663330666432313839636236393038333734366336323137363737366565',
                    parsed: null,
                  },
                },
              },
              {
                key: 'dictionary-df94c0af800492c6f659bf4ac58a2f7141bf1b671238e247fb30200f397d9821',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '01000000000d07200000008c94103b0073af4c8640e220438f71afd80091e354715e548c911e4b7af638b44000000033386638396563353732366366366132623536333065626364373662386438393265343463313339343430373838356663656537653636353934616265333231',
                    parsed: null,
                  },
                },
              },
              {
                key: 'dictionary-eb14a06988d826874e268dbf15f55ed746a0a1908004cd8fe1f0616a08c71b35',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '01000000000d110a0a2000 00004f420a4dc634df0e7b801a4d71f71bd03fd3ed726f5bcd65dfc525339d6eba5f0100000036',
                    parsed: null,
                  },
                },
              },
              {
                key: 'dictionary-e93be31a946dd2856722c44039b47e8f75d0a3fbc0e592cf83ff7af964ac52de',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '01000000000d0b20000000a8138c9d5b37951106b61b6e0af094a4a759198ad51bdea9ec0c953eeff4e73d0100000036',
                    parsed: null,
                  },
                },
              },
              {
                key: 'dictionary-5c38433022d3618110e5af6a8b31290be3398f6402df025989de4988c9c6702c',
                transform: {
                  WriteCLValue: {
                    cl_type: 'Any',
                    bytes:
                      '01000000000d0b20000000929e5f6a419a2df1733989dd507a6f6c5b7285e5109f60bd56cd496f801335a34000000061343664613336326462353733306264323139663434306534663137633337313432653637323263303230653136376636353861313539373937323935633031',
                    parsed: null,
                  },
                },
              },
              {
                key: 'uref-333c27b47fea51e865b98c0e2786eb8ee06442fe6e844e1bfda8d76d91548a50-000',
                transform: 'Identity',
              },
              {
                key: 'uref-333c27b47fea51e865b98c0e2786eb8ee06442fe6e844e1bfda8d76d91548a50-000',
                transform: {
                  WriteCLValue: {
                    cl_type: 'U256',
                    bytes: '0104',
                    parsed: '4',
                  },
                },
              },
              {
                key: 'uref-e5883616f335606be75e34aec0773d5a357ba3425125274edbb9e913e916c836-000',
                transform: {
                  WriteCLValue: {
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000393534666139663733653234623736323735656365646436396431333562323031313436376163616166373939373935653561623931333464303934396365300a0000006576656e745f747970650e00000063657034375f6275726e5f6f6e65050000006f776e65724e0000004b65793a3a4163636f756e7428373936313435666637303861633465313630653739306633376365663564346434306633306664323138396362363930383337343663363231373637373665652908000000746f6b656e5f69640100000036',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '954fa9f73e24b76275ecedd69d135b2011467acaaf799795e5ab9134d0949ce0',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_burn_one',
                      },
                      {
                        key: 'owner',
                        value:
                          'Key::Account(796145ff708ac4e160e790f37cef5d4d40f30fd2189cb69083746c62176776ee)',
                      },
                      {
                        key: 'token_id',
                        value: '6',
                      },
                    ],
                  },
                },
              },
              {
                key: 'deploy-4e68db65764a6913057dcdb35fe30dc72cae5a729d786e47026309a9e3c531cc',
                transform: {
                  WriteDeployInfo: {
                    deploy_hash:
                      '4e68db65764a6913057dcdb35fe30dc72cae5a729d786e47026309a9e3c531cc',
                    transfers: [],
                    from: 'account-hash-796145ff708ac4e160e790f37cef5d4d40f30fd2189cb69083746c62176776ee',
                    source:
                      'uref-e4cf34cd20c6987a8bb84f070f675c23bf79ea17e9cb1c47205a92904c4b1f87-007',
                    gas: '596659900',
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
                key: 'balance-dcf5abbbe00715e9a05f7449109b1d297cb1584560ec4f3f5a86401452e40d85',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  WriteCLValue: {
                    cl_type: 'U512',
                    bytes: '00',
                    parsed: '0',
                  },
                },
              },
              {
                key: 'balance-dcf5abbbe00715e9a05f7449109b1d297cb1584560ec4f3f5a86401452e40d85',
                transform: {
                  AddUInt512: '2000000000',
                },
              },
            ],
          },
          transfers: [],
          cost: '596659900',
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
    action: 'burn',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '2000000000',
    cost: '596659900',
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
