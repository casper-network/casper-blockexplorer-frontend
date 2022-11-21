/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const mintOne = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '223c30035d4409e7f3b930b9904ff5488b5c2485c4180c435359f89514a18ba8';
  const mockBlockHash =
    'b97193913b6804355067c0b054fe5a8d1123947cd0f6741832206869997b989f';
  const mockPublicKey =
    '0151cfcc0e740203030902649d1cdd18e55018175d08a4cb985dacd53e237f129c';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '0151cfcc0e740203030902649d1cdd18e55018175d08a4cb985dacd53e237f129c',
      body_hash:
        '56e14a29f408281aba011fc56e734815d81da5b545d746bab8113229d8dabba8',
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
            'recipient',
            {
              bytes:
                '004fc1df829b2dba8fa3a8e12160245c175ebba116b21e70ed7558d83499cd7e8f',
              parsed: {
                Account:
                  'account-hash-4fc1df829b2dba8fa3a8e12160245c175ebba116b21e70ed7558d83499cd7e8f',
              },
              cl_type: 'Key',
            },
          ],
          [
            'token_id',
            {
              bytes: '010a000000544543482d3132333434',
              parsed: 'TECH-12344',
              cl_type: {
                Option: 'String',
              },
            },
          ],
          [
            'token_meta',
            {
              bytes:
                '0300000007000000746f6b656e49640a000000544543482d31323334340d000000746f6b656e4d657461486173682c0000003551587a334c5a514e63652f2f6a784d5876466132722b58436753476259536e366a704d6a6663504357493d0300000075726c3d00000068747470733a2f2f6e66742d6d657461646174612d6e6f6e70726f642e73332e616d617a6f6e6177732e636f6d2f544543482d31323334342e6a736f6e',
              parsed: [
                {
                  key: 'tokenId',
                  value: 'TECH-12344',
                },
                {
                  key: 'tokenMetaHash',
                  value: '5QXz3LZQNce//jxMXvFa2r+XCgSGbYSn6jpMjfcPCWI=',
                },
                {
                  key: 'url',
                  value:
                    'https://nft-metadata-nonprod.s3.amazonaws.com/TECH-12344.json',
                },
              ],
              cl_type: {
                Map: {
                  key: 'String',
                  value: 'String',
                },
              },
            },
          ],
        ],
        hash: '7121e50205ef765872796d7c359f588ba5e06edcd21be58dbd7330bcb1f7fbb8',
        entry_point: 'mint_one',
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
          cost: '778479340',
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
                key: 'balance-1087b51b0c508bd240c5a5c2f5a6011eea1329ccb8d720dbee39e2aa71919b32',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-1087b51b0c508bd240c5a5c2f5a6011eea1329ccb8d720dbee39e2aa71919b32',
                transform: {
                  WriteCLValue: {
                    bytes: '065014c30d3450',
                    parsed: '88184499410000',
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
                key: 'hash-7121e50205ef765872796d7c359f588ba5e06edcd21be58dbd7330bcb1f7fbb8',
                transform: 'Identity',
              },
              {
                key: 'hash-b62ba8b3cf7d0781fa7d52cc0f35cf7260535ce660ad004fc8bb4336c52daedd',
                transform: 'Identity',
              },
              {
                key: 'hash-b9a0b077ce7b5ac6cd49eb1217d9ef895378a05ccc2385d02dc40c5d8d6aa980',
                transform: 'Identity',
              },
              {
                key: 'dictionary-ca5fb25907de8a1207613cb2e5bfa29ce05eb4fc1e675c9758a000d5ee1b5ca3',
                transform: {
                  WriteCLValue: {
                    bytes:
                      'a7000000010300000007000000746f6b656e49640a000000544543482d31323334340d000000746f6b656e4d657461486173682c0000003551587a334c5a514e63652f2f6a784d5876466132722b58436753476259536e366a704d6a6663504357493d0300000075726c3d00000068747470733a2f2f6e66742d6d657461646174612d6e6f6e70726f642e73332e616d617a6f6e6177732e636f6d2f544543482d31323334342e6a736f6e0d110a0a200000008ee8f9c8c471297ae549cd985ea063f72271527d6b80a27195fd00096e22b03d0a000000544543482d3132333434',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-6ae52f56d773c33fa922a719b0353ddba7e2d97fd1d66179f22cb69cc0ad9d30',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '2200000001004fc1df829b2dba8fa3a8e12160245c175ebba116b21e70ed7558d83499cd7e8f0d0b20000000520160022e0059eb984d8817cc8c7b17ab9ab2c9810e82d015389b5346fe6ac50a000000544543482d3132333434',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-8a35c1423bcfb0a8bb1a830e497d4b8a1025831eece081444e861f53ab22ea90',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '22000000010088b076ff165bb3c3e2c63c96366bc99a27b7cbe9a48266c4c73d0065811d59610d0b20000000386bf2c2e1ca3eb5dc33c403ca22ca72e82b393ac34ffca4da4c58f196fe7cd80a000000544543482d3132333434',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-bcadf1dc7b7524375ff3b890f5db72b5551d778ec91806d0a306f269444f2093',
                transform: 'Identity',
              },
              {
                key: 'dictionary-1aff8108402b710cf39fc9360be2a2058e64fb6c4d6f199f151210c7e2584198',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '030000000101120d07200000006c995fcebeeefdec9ea3cf8c1a3966e954f631beda524cb0d4ea0a9948ac660b4000000038326433656463333136393662333365306463343066666161393034643830343434393839306162323536396435393530323366363331616263633363363230',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-6e15e921c569641b0aa5da3166a76a7ad31b2712ca541472737dea0d4605a414',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0f000000010a000000544543482d31323334340d0a2000000017b6c09c1a131503d38b1d24ff78b2ffabef06a93875b0a0a5d9084eaec4fa344000000031386262663935326661653463393834646638653535666130366438343466646362333234323439373861653232636165313433633232313134353961623035',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-bcadf1dc7b7524375ff3b890f5db72b5551d778ec91806d0a306f269444f2093',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '030000000101130d0720000000c3a3f040c079ebbce4e3ca078b7b2128ef6c571b560b6803ad879ee43dee2e494000000034666331646638323962326462613866613361386531323136303234356331373565626261313136623231653730656437353538643833343939636437653866',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'uref-0ef42c1dff264bdc1e2bb4636ea9ee4dd4742b54387c95903249356ee8dd6e30-000',
                transform: 'Identity',
              },
              {
                key: 'uref-0ef42c1dff264bdc1e2bb4636ea9ee4dd4742b54387c95903249356ee8dd6e30-000',
                transform: {
                  WriteCLValue: {
                    bytes: '0117',
                    parsed: '23',
                    cl_type: 'U256',
                  },
                },
              },
              {
                key: 'uref-d2e1093e35742d7054c6a496184b76cbe237ec85036dc3594426bb8b6051e003-000',
                transform: 'Identity',
              },
              {
                key: 'uref-769c20b9064d82090186f9671e23ef28e07379d795a94695b94bad797d91faf0-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000623632626138623363663764303738316661376435326363306633356366373236303533356365363630616430303466633862623433333663353264616564640a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428346663316466383239623264626138666133613865313231363032343563313735656262613131366232316537306564373535386438333439396364376538662908000000746f6b656e5f69640a000000544543482d3132333434',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          'b62ba8b3cf7d0781fa7d52cc0f35cf7260535ce660ad004fc8bb4336c52daedd',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(4fc1df829b2dba8fa3a8e12160245c175ebba116b21e70ed7558d83499cd7e8f)',
                      },
                      {
                        key: 'token_id',
                        value: 'TECH-12344',
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
                key: 'deploy-223c30035d4409e7f3b930b9904ff5488b5c2485c4180c435359f89514a18ba8',
                transform: {
                  WriteDeployInfo: {
                    gas: '778479340',
                    from: 'account-hash-88b076ff165bb3c3e2c63c96366bc99a27b7cbe9a48266c4c73d0065811d5961',
                    source:
                      'uref-1087b51b0c508bd240c5a5c2f5a6011eea1329ccb8d720dbee39e2aa71919b32-007',
                    transfers: [],
                    deploy_hash:
                      '223c30035d4409e7f3b930b9904ff5488b5c2485c4180c435359f89514a18ba8',
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
                  AddUInt512: '1000000000',
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
    action: 'mint_one',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '1000000000',
    cost: '778479340',
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
