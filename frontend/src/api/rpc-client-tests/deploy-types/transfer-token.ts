/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const transferToken = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '077ad24364d06a77facda9ce0c3af440c7718ad9b3cf4c2a5f0f64d5c6157d9a';
  const mockBlockHash =
    '04ac53e7eb7d5514c0b4202b9c8662238d5261ce57d28db190b380d2c345b1fc';
  const mockPublicKey =
    '0203a810758f6a796c8648a836c519c7f62d4b364d7a711d1c0f3f9d6f8138c59f49';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '0203a810758f6a796c8648a836c519c7f62d4b364d7a711d1c0f3f9d6f8138c59f49',
      body_hash:
        'cb345123393f88d103b3334fdc8f07709a168c11631761974ce195814c88cf61',
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
              bytes: '04002f6859',
              parsed: '1500000000',
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
                '0084deac2708b7f616431ad400795fbf05dea8c82c6e4cddc43ce212429763c2f5',
              parsed: {
                Account:
                  'account-hash-84deac2708b7f616431ad400795fbf05dea8c82c6e4cddc43ce212429763c2f5',
              },
              cl_type: 'Key',
            },
          ],
          [
            'token_id',
            {
              bytes:
                '340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
              parsed: 'zbyte-cep47-nft-06c84442-ea4a-4a94-8927-5659a4e39712',
              cl_type: 'String',
            },
          ],
        ],
        hash: '69106fcd2191bca4f21d3939f83e69acd411f71bdf5196654e5f0afd0ca1cd3f',
        entry_point: 'transfer_token',
      },
      approvals: [
        {
          signer:
            '0203a810758f6a796c8648a836c519c7f62d4b364d7a711d1c0f3f9d6f8138c59f49',
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
          cost: '1129323210',
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
                key: 'balance-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326',
                transform: {
                  WriteCLValue: {
                    bytes: '0680dd13b5c22a',
                    parsed: '47015750000000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '1500000000',
                },
              },
              {
                key: 'hash-69106fcd2191bca4f21d3939f83e69acd411f71bdf5196654e5f0afd0ca1cd3f',
                transform: 'Identity',
              },
              {
                key: 'hash-07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                transform: 'Identity',
              },
              {
                key: 'hash-0c6666d7dafac7b8b4b5e9b805d194309e079a420535c65cf6df9419606cbcd7',
                transform: 'Identity',
              },
              {
                key: 'uref-39f6d2122e90276cbdefe367e1778055a6a1dee02aced2cdb5e242b530218554-000',
                transform: 'Identity',
              },
              {
                key: 'dictionary-49c2e8cc92fa92737a2daa16bc90d2795c2d3122d8a77bdc1ab54f9326b1fb6f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-49c2e8cc92fa92737a2daa16bc90d2795c2d3122d8a77bdc1ab54f9326b1fb6f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '22000000010084deac2708b7f616431ad400795fbf05dea8c82c6e4cddc43ce212429763c2f50d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-f65152b379bf1c3c13d1a5533755e201cc45d8a8fde4de2d980d0e50f4c32a5d',
                transform: 'Identity',
              },
              {
                key: 'dictionary-97da2368b51a6c5f06ce3d40b888aaf56858f9fa0b08e39e77e435f83c8d6658',
                transform: 'Identity',
              },
              {
                key: 'dictionary-867cf1900a18dc183dc4f487b1d3d27a417b37d74b67257562bc8db23405b9c9',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010243040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000061303264613631626534313036393030353863626133363664336237333838616339663637663635313365636463663238613030363961376132373638316532',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-a5bf78e7952a291914c5068917063d51238f672e0d3853c2f87ebdfc4eab96e5',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d3638613633 6637342d303236 372d346635332d383439392d3564343533303733313166370d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000036326438363132323261383263303932323561313036353861326437363733303930303962626662623333386463366438653266356230313362613739656234',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-97da2368b51a6c5f06ce3d40b888aaf56858f9fa0b08e39e77e435f83c8d6658',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '01000000000d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000038363863313866316639613632333764306134326562646662663163376533323266323931643936363738633866303734316134646565333864663837373537',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010245040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-f65152b379bf1c3c13d1a5533755e201cc45d8a8fde4de2d980d0e50f4c32a5d',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '01000000000d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000037326333363030343062306461663234373430623065356530633139663830623565373966346330323464383339313738643561356362366432333139643132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-3d4152d340ad0bd72e93e983ae2e4da72d03d824785cf958b8495ef494b7a33a',
                transform: 'Identity',
              },
              {
                key: 'dictionary-2c0047c6a8ffa74f27b649f4e2c94aea8a590ec5d3177064edd643dbc8f0f78b',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '030000000101200d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000061613438393333396232333338633466353035306161363930323039643665663632616563626531306530313239313331326133373536633264356163633065',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-344e1f43bda9c5555b292c838d17c0af3caf3ef0020ee21cbda135c4223c450d',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d3536353961346533393731320d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000034333366643264646332633662633362636562336561306437623937356138653531336264656232366465386533373431656162613636303065386363393461',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-3d4152d340ad0bd72e93e983ae2e4da72d03d824785cf958b8495ef494b7a33a',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '030000000101210d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000038346465616332373038623766363136343331616434303037393566626630356465613863383263366534636464633433636532313234323937363363326635',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'uref-080d027d8a0f043ca1ca1dfbfb7eff68a6c6ba92751fbd0c370c52d7fe639b3a-000',
                transform: 'Identity',
              },
              {
                key: 'uref-940a905e0390644a957586a9d61a6e440f639ad84efb90044bbaca90609e2fca-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0500000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970651400000063657034375f7472616e736665725f746f6b656e09000000726563697069656e744e0000004b65793a3a4163636f756e742838346465616332373038623766363136343331616434303037393566626630356465613863383263366534636464633433636532313234323937363363326635290600000073656e6465724e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_transfer_token',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(84deac2708b7f616431ad400795fbf05dea8c82c6e4cddc43ce212429763c2f5)',
                      },
                      {
                        key: 'sender',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-06c84442-ea4a-4a94-8927-5659a4e39712',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'deploy-077ad24364d06a77facda9ce0c3af440c7718ad9b3cf4c2a5f0f64d5c6157d9a',
                transform: {
                  WriteDeployInfo: {
                    gas: '1129323210',
                    from: 'account-hash-908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb',
                    source:
                      'uref-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326-007',
                    transfers: [],
                    deploy_hash:
                      '077ad24364d06a77facda9ce0c3af440c7718ad9b3cf4c2a5f0f64d5c6157d9a',
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
                key: 'balance-8bcbcf17fce2fadb37599b3f01e1f278c0d3465d667de66b8c9f3d614687cd99',
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
                key: 'balance-8bcbcf17fce2fadb37599b3f01e1f278c0d3465d667de66b8c9f3d614687cd99',
                transform: {
                  AddUInt512: '1500000000',
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
    action: 'transfer_token',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '1500000000',
    cost: '1129323210',
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
