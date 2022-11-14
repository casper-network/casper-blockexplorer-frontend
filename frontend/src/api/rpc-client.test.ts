/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DeployStatus } from './types';
import { formatDate } from '../utils';
import { DEFAULT_NUM_TO_SHOW, RpcApi, RpcApiError } from './rpc-client';

describe('rpc-client', () => {
  describe('getBlock', () => {
    it('should return a block', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getBlockInfo: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockBlockHash = 'block-hash';

      const block = await mockRpcClient.getBlock(mockBlockHash);

      const mockBlock = {
        timestamp: dateTimeString,
        // we have to use the returned timeSince as mocking it will inevitably be unreliable
        timeSince: block?.timeSince,
        readableTimestamp: formatDate(dateTime),
        height: 1,
        eraID: 1,
        hash: '',
        validatorPublicKey: '',
        deployCount: 2,
        transferHashes: [''],
        deployHashes: [''],
        stateRootHash: '',
        parentHash: '',
        rawBlock: JSON.stringify(mockRawBlockData),
      };

      expect(mockJsonRpc.getBlockInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockInfo).toHaveBeenCalledWith(mockBlockHash);
      expect(block).toEqual(mockBlock);
    });

    it('should throw a BlockFetchFailed ApiError if an Error is thrown', async () => {
      const mockJsonRpc = {
        getBlockInfo: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockBlockHash = 'block-hash';

      expect.assertions(1);

      try {
        await mockRpcClient.getBlock(mockBlockHash);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.BlockFetchFailed);
      }
    });

    it('should throw a BlockMissing ApiError when no block data is returned from sdk', async () => {
      const mockJsonRpc = {
        getBlockInfo: jest.fn().mockResolvedValue({ block: undefined }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockBlockHash = 'non-existing-block-hash';

      expect.assertions(1);

      try {
        await mockRpcClient.getBlock(mockBlockHash);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.BlockMissing);
      }
    });
  });

  describe('getPeers', () => {
    it('should return a list of peers', async () => {
      const mockRawPeer = {
        node_id: 1,
        address: 'address',
      };

      const mockPeer = {
        id: 1,
        address: 'address',
      };

      const mockRawPeers = [mockRawPeer, mockRawPeer, mockRawPeer];
      const mockPeers = [mockPeer, mockPeer, mockPeer];

      const mockJsonRpc = {
        getPeers: jest.fn().mockResolvedValue({
          peers: mockRawPeers,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const peers = await mockRpcClient.getPeers();

      expect(mockJsonRpc.getPeers).toHaveBeenCalledTimes(1);
      expect(peers).toEqual(mockPeers);
    });

    it('should return an empty list of peers', async () => {
      const mockPeers: [] = [];

      const mockJsonRpc = {
        getPeers: jest.fn().mockResolvedValue({
          peers: mockPeers,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const peers = await mockRpcClient.getPeers();

      expect(mockJsonRpc.getPeers).toHaveBeenCalledTimes(1);
      expect(peers).toEqual(mockPeers);
    });

    it('should throw n PeersFetchFailed ApiError when an Error is caught', async () => {
      const mockJsonRpc = {
        getPeers: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getPeers();
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.PeersFetchFailed);
      }
    });
  });

  describe('getDeploy', () => {
    it('should return a deploy', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockDeployHash =
        '74f59c19a24996714645f160363235e582c23fc8c95765a6df13b19089a1c162';
      const mockBlockHash =
        '05ebc114e9c28b22dc9830b561b02569642698358a100b4c0f1123766d3a73bd';
      const mockPublicKey =
        '01b426de500f84ff4f2d765928fb8053539cf10dd917fb1ff6104eda48a2759e10';

      const mockRawDeploy = {
        hash: mockDeployHash,
        header: {
          account:
            '01b426de500f84ff4f2d765928fb8053539cf10dd917fb1ff6104eda48a2759e10',
          timestamp: dateTimeString,
          ttl: '30m',
          gas_price: 1,
          body_hash:
            '30122952305bf5e157b31559eee71189ffba2f81c737d72d18616e30d8d92842',
          dependencies: [],
          chain_name: 'casper-test',
        },
        payment: {
          ModuleBytes: {
            module_bytes: '',
            args: [
              [
                'amount',
                {
                  cl_type: 'U512',
                  bytes: '05005847f80d',
                  parsed: '60000000000',
                },
              ],
            ],
          },
        },
        session: {
          StoredContractByHash: {
            hash: '730b9041acfd3c9d674d2d9ed6e8b12cec6f6140063bf7fea6063b8612277014',
            entry_point: 'init',
            args: [
              [
                'scontract-hash',
                {
                  cl_type: 'String',
                  bytes:
                    '55000000636f6e74726163742d7061636b6167652d7761736d37613739663134633261366534313934656239396630616230383237313262363564393361396437323463333930343132393532313236393937373631373437',
                  parsed:
                    'contract-package-wasm7a79f14c2a6e4194eb99f0ab082712b65d93a9d724c390412952126997761747',
                },
              ],
              [
                'token-hash',
                {
                  cl_type: 'String',
                  bytes:
                    '49000000636f6e74726163742d62303265633966653433396139343562636330636334613738366632326661623761653431383239653130656130323965366638326166316233383333623630',
                  parsed:
                    'contract-b02ec9fe439a945bcc0cc4a786f22fab7ae41829e10ea029e6f82af1b3833b60',
                },
              ],
            ],
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
              effect: {
                operations: [],
                transforms: [
                  {
                    key: 'balance-72fb48a79750b7ed2ce11dafd9f7e1420980f40afbb0385637aba83e4b22f82c',
                    transform: {
                      WriteCLValue: {
                        cl_type: 'U512',
                        bytes: '0500dd0ee902',
                        parsed: '12500000000',
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
              transfers: [],
              cost: '2500000000',
              error_message: 'Mint error: 0',
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
        action: 'init',
        amount: undefined,
        deployType: 'StoredContractByHash',
        paymentAmount: '60000000000',
        cost: '2500000000',
        status: DeployStatus.Failed,
        rawDeploy: JSON.stringify({
          deploy: mockRawDeploy,
          execution_results: mockRawExecutionResults,
        }),
      };

      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
      expect(deploy).toEqual(mockDeploy);
    });

    it('should throw a DeployFetchFailed ApiError when an Error is caught', async () => {
      const mockDeployHash =
        '74f59c19a24996714645f160363235e582c23fc8c95765a6df13b19089a1c162';

      const mockJsonRpc = {
        getDeployInfo: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getDeploy(mockDeployHash);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.DeployFetchFailed);
      }
    });

    it('should return a deploy of type Transfer', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockDeployHash =
        'af1cd0ba8f8b0af8ad3dfdb1b9a9a35d2bf3cf3d56392a5d530104ec9330d9e0';
      const mockBlockHash =
        '5f0ff357108e012876247567b8f7e8ad188e1d39d89a1dd13e013e2b8fff42ae';
      const mockPublicKey =
        '0203338734fc43ca8c73511b84d6be160f35e7421271fb6d22461ff9640993652a51';

      const mockRawDeploy = {
        hash: mockDeployHash,
        header: {
          ttl: '30m',
          account:
            '0203338734fc43ca8c73511b84d6be160f35e7421271fb6d22461ff9640993652a51',
          body_hash:
            '10a0780a6da88bbb4183b50d13a3a43ac0ed4daa22015686f4b8062a81c1f932',
          gas_price: 1,
          timestamp: dateTimeString,
          dependencies: [],
          chain_name: 'casper-test',
        },
        payment: {
          ModuleBytes: {
            args: [
              [
                'amount',
                {
                  bytes: '0400e1f505',
                  parsed: '0400e1f505',
                  cl_type: 'U512',
                },
              ],
            ],
            module_bytes: '',
          },
        },
        session: {
          Transfer: {
            args: [
              [
                'amount',
                {
                  bytes: '05002fafcee8',
                  parsed: '999900000000',
                  cl_type: 'U512',
                },
              ],
              [
                'target',
                {
                  bytes:
                    '020377bc3ad54b5505971e001044ea822a3f6f307f8dc93fa45a05b7463c0a053bed',
                  parsed:
                    '020377bc3ad54b5505971e001044ea822a3f6f307f8dc93fa45a05b7463c0a053bed',
                  cl_type: 'PublicKey',
                },
              ],
              [
                'id',
                {
                  bytes: '01b992355484010000',
                  parsed: '1667860107961',
                  cl_type: {
                    option: 'U64',
                  },
                },
              ],
            ],
          },
        },
        approvals: [
          {
            signer:
              '0203338734fc43ca8c73511b84d6be160f35e7421271fb6d22461ff9640993652a51',
            signature: mockPublicKey,
          },
        ],
      };
      const mockRawExecutionResults = [
        {
          block_hash: mockBlockHash,
          result: {
            Success: {
              cost: '100000000',
              effect: {
                operations: [],
                tranforms: [
                  {
                    key: 'account-hash-82dee24436178b6d45ba241743f44e456ba64af0abc53f35f7cc3ab39e25fd7c',
                    transform: 'Identity',
                  },
                  {
                    key: 'account-hash-82dee24436178b6d45ba241743f44e456ba64af0abc53f35f7cc3ab39e25fd7c',
                    transform: 'Identity',
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
                    key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: {
                      WriteCLValue: {
                        bytes: '05002fafcee8',
                        parsed: '999900000000',
                        cl_type: 'U512',
                      },
                    },
                  },
                  {
                    key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                    transform: {
                      AddUInt512: '100000000',
                    },
                  },
                  {
                    key: 'account-hash-82dee24436178b6d45ba241743f44e456ba64af0abc53f35f7cc3ab39e25fd7c',
                    transform: 'Identity',
                  },
                  {
                    key: 'account-hash-82dee24436178b6d45ba241743f44e456ba64af0abc53f35f7cc3ab39e25fd7c',
                    transform: 'Identity',
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
                    key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-98d945f5324f865 243b7c02c0417ab6eac361c5c56602fd4 2 ced834a1ba201b6',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: {
                      WriteCLValue: {
                        bytes: '05002fafcee8',
                        parsed: '999900000000',
                        cl_type: 'U512',
                      },
                    },
                  },
                  {
                    key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                    transform: {
                      AddUInt512: '100000000',
                    },
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
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-3bf63df27941be80790301f35b67b083536f8c4f275526c4e9b3105087c35768',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce',
                    transform: {
                      WriteCLValue: {
                        bytes: '00',
                        parsed: '0',
                        cl_type: 'U512',
                      },
                    },
                  },
                  {
                    key: 'balance-3bf63df27941be80790301f35b67b083536f8c4f275526c4e9b3105087c35768',
                    transform: {
                      AddUInt512: '999900000000',
                    },
                  },
                  {
                    key: 'transfer-c4b26991c9acf838f9bcc81fac1c4f6dc9755115f5a78d5d8d0cac092a95fc13',
                    transform: {
                      WriteTransfer: {
                        id: '1667860107961',
                        to: 'account-hash-82dee24436178b6d45ba241743f44e456ba64af0abc53f35f7cc3ab39e25fd7c',
                        gas: '0',
                        from: 'account-hash-2193d1cbfe55e8221376da5ca1cd514307135473d3c3f6411a8b4d0647e039ad',
                        amount: '999900000000',
                        source:
                          'uref-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce-007',
                        target:
                          'uref-3bf63df27941be80790301f35b67b083536f8c4f275526c4e9b3105087c35768-004',
                        deploy_hash: mockDeployHash,
                      },
                    },
                  },
                  {
                    key: 'deploy-af1cd0ba8f8b0af8ad3dfdb1b9a9a35d2bf3cf3d56392a5d530104ec9330d9e0',
                    transform: {
                      WriteDeployInfo: {
                        gas: '100000000',
                        from: 'account-hash-2193d1cbfe55e8221376da5ca1cd514307135473d3c3f6411a8b4d0647e039ad',
                        source:
                          'uref-bf0a60f9064e3fb0a6dd51f8a049bb0e9aa4ebb4ae100146c3150f4a1d30ebce-007',
                        transfers: [
                          'transfer-c4b26991c9acf838f9bcc81fac1c4f6dc9755115f5a78d5d8d0cac092a95fc13',
                        ],
                        deploy_hash: mockDeployHash,
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
                    key: 'balance-0a24ef56971d46bfefbd5590afe20e5f3482299aba74e1a0fc33a55008cf9453',
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
                    key: 'balance-0a24ef56971d46bfefbd5590afe20e5f3482299aba74e1a0fc33a55008cf9453',
                    transform: {
                      AddUInt512: '100000000',
                    },
                  },
                ],
              },
              transfers: [
                'transfer-c4b26991c9acf838f9bcc81fac1c4f6dc9755115f5a78d5d8d0cac092a95fc13',
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
        action: 'Transfer',
        amount: '999900000000',
        // what should be don about undefined deployTypes?
        deployType: undefined,
        paymentAmount: '100000000',
        cost: '100000000',
        status: DeployStatus.Success,
        rawDeploy: JSON.stringify({
          deploy: mockRawDeploy,
          execution_results: mockRawExecutionResults,
        }),
      };
      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
      expect(deploy).toEqual(mockDeploy);
    });

    it('should return a deploy of type bridge_out', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockDeployHash =
        '3609df6a9c574adb250e8e9c4dd8924d58df0c6fe2fe96fbb5f9da2ba2f8b76f';
      const mockBlockHash =
        '90ee41e9cbb324488ab98644578ad74cf6ea90613c64d1bf847ba15577c316d2';
      const mockPublicKey =
        '010ad302bfc22c0e606d94d98a3baa2c8eeedd1e148d9a20a4453bb8cc5e530a19';

      const mockRawDeploy = {
        hash: mockDeployHash,
        header: {
          ttl: '30m',
          account:
            '010ad302bfc22c0e606d94d98a3baa2c8eeedd1e148d9a20a4453bb8cc5e530a19',
          body_hash:
            'ace4d860e62bfe26baa5a6030ff5ef4512669f08910eeae738ba57e94565f88b',
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
                  bytes: '040084d717',
                  parsed: '400000000',
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
                'token_contract',
                {
                  bytes:
                    '3c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf23',
                  parsed:
                    '3c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf23',
                  cl_type: {
                    ByteArray: 32,
                  },
                },
              ],
              [
                'amount',
                {
                  bytes: '021027',
                  parsed: '10000',
                  cl_type: 'U256',
                },
              ],
              [
                'source_chain',
                {
                  bytes: '06000000474f45524c49',
                  parsed: 'GOERLI',
                  cl_type: 'String',
                },
              ],
              [
                'source_address',
                {
                  bytes:
                    '2800000033303935663935356461373030623936323135636666633962633634616232653639656237646162',
                  parsed: '3095f955da700b96215cffc9bc64ab2e69eb7dab',
                  cl_type: 'String',
                },
              ],
              [
                'recipient',
                {
                  bytes:
                    '009060c0820b5156b1620c8e3344d17f9fad5108f5dc2672f2308439e84363c88e',
                  parsed: {
                    Account:
                      'account-hash-9060c0820b5156b1620c8e3344d17f9fad5108f5dc2672f2308439e84363c88e',
                  },
                  cl_type: 'Key',
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
              '010ad302bfc22c0e606d94d98a3baa2c8eeedd1e148d9a20a4453bb8cc5e530a19',
            signature: mockPublicKey,
          },
        ],
      };

      const mockRawExecutionResults = [
        {
          block_hash: mockBlockHash,
          result: {
            Success: {
              cost: '302543230',
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
                    key: 'balance-12440b9a3d73c22bc1e2f379a50fd4a3fb8a7dbe33da29e88c50b7e85c2e6526',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                    transform: 'Identity',
                  },
                  {
                    key: 'balance-12440b9a3d73c22bc1e2f379a50fd4a3fb8a7dbe33da29e88c50b7e85c2e6526',
                    transform: {
                      WriteCLValue: {
                        bytes: '05809fadb905',
                        parsed: '24590000000',
                        cl_type: 'U512',
                      },
                    },
                  },
                  {
                    key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                    transform: {
                      AddUInt512: '400000000',
                    },
                  },
                  {
                    key: 'hash-8153c553e8339fb87224097e4a3a2d8e4d8f49fbacee5c192e039709bc4211ba',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-706db5910ae6f53c9cb9e5f7881e6b78037b5c643ceb65ff1678581270395622',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-68ec682c63fdd5dca32fcceb05c8d76e5612081d4a65a1ad0b5ad284d58df56b',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-3c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf23',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-7bca8ff28e2d3c26d77b144664142cce5c02fabd69e5dcd0d4899e2c0c19dfe9',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-5eb30f70b6e0f4199c9c20cd4f7e8cec2a981dc9a731d9f9e29d3b6745101d34',
                    transform: 'Identity',
                  },
                  {
                    key: 'dictionary-1e46c1b33d81cdf4069cb97580dc8d2640bb57ded9d9a3342db1e50e97f6de7f',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-3c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf23',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-7bca8ff28e2d3c26d77b144664142cce5c02fabd69e5dcd0d4899e2c0c19dfe9',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-5eb30f70b6e0f4199c9c20cd4f7e8cec2a981dc9a731d9f9e29d3b6745101d34',
                    transform: 'Identity',
                  },
                  {
                    key: 'dictionary-1e46c1b33d81cdf4069cb97580dc8d2640bb57ded9d9a3342db1e50e97f6de7f',
                    transform: 'Identity',
                  },
                  {
                    key: 'dictionary-4ad5a92bdfbe2b4d517b62804142020197a7ef651e1cf9cc716caf2a5ef476ad',
                    transform: 'Identity',
                  },
                  {
                    key: 'dictionary-1e46c1b33d81cdf4069cb97580dc8d2640bb57ded9d9a3342db1e50e97f6de7f',
                    transform: {
                      WriteCLValue: {
                        bytes:
                          '050000000476998b0a072000000028952e8490e629d4e7de058769a0a2ad9c2fa804ac871dc2d5a576f9721316072c00000041584274745a454b357655386e4c6e6c39346765613367446531786b504f746c2f785a3457424a774f565969',
                        parsed: null,
                        cl_type: 'Any',
                      },
                    },
                  },
                  {
                    key: 'dictionary-4ad5a92bdfbe2b4d517b62804142020197a7ef651e1cf9cc716caf2a5ef476ad',
                    transform: {
                      WriteCLValue: {
                        bytes:
                          '0500000004c02f5501072000000028952e8490e629d4e7de058769a0a2ad9c2fa804ac871dc2d5a576f9721316072c000000414a42677749494c555661785967794f4d30545266352b7455516a3133435a79386a43454f6568445938694f',
                        parsed: null,
                        cl_type: 'Any',
                      },
                    },
                  },
                  {
                    key: 'hash-3c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf23',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-7bca8ff28e2d3c26d77b144664142cce5c02fabd69e5dcd0d4899e2c0c19dfe9',
                    transform: 'Identity',
                  },
                  {
                    key: 'hash-5eb30f70b6e0f4199c9c20cd4f7e8cec2a981dc9a731d9f9e29d3b6745101d34',
                    transform: 'Identity',
                  },
                  {
                    key: 'dictionary-1e46c1b33d81cdf4069cb97580dc8d2640bb57ded9d9a3342db1e50e97f6de7f',
                    transform: 'Identity',
                  },
                  {
                    key: 'uref-8edab0198ac7b91c0c1dd34a81d17dc14f801141402f8f85f2038c9e5b5ea9f8-000',
                    transform: {
                      WriteCLValue: {
                        bytes:
                          '7b000000013c0c1847d1c410338ab9b4ee0919c181cf26085997ff9c797e8a1ae5b02ddf2306000000474f45524c492800000033303935663935356461373030623936323135636666633962633634616232653639656237646162021027009060c0820b5156b1620c8e3344d17f9fad5108f5dc2672f2308439e84363c88e',
                        parsed: [
                          1, 60, 12, 24, 71, 209, 196, 16, 51, 138, 185, 180,
                          238, 9, 25, 193, 129, 207, 38, 8, 89, 151, 255, 156,
                          121, 126, 138, 26, 229, 176, 45, 223, 35, 6, 0, 0, 0,
                          71, 79, 69, 82, 76, 73, 40, 0, 0, 0, 51, 48, 57, 53,
                          102, 57, 53, 53, 100, 97, 55, 48, 48, 98, 57, 54, 50,
                          49, 53, 99, 102, 102, 99, 57, 98, 99, 54, 52, 97, 98,
                          50, 101, 54, 57, 101, 98, 55, 100, 97, 98, 2, 16, 39,
                          0, 144, 96, 192, 130, 11, 81, 86, 177, 98, 12, 142,
                          51, 68, 209, 127, 159, 173, 81, 8, 245, 220, 38, 114,
                          242, 48, 132, 57, 232, 67, 99, 200, 142,
                        ],
                        cl_type: {
                          List: 'U8',
                        },
                      },
                    },
                  },
                  {
                    key: 'deploy-3609df6a9c574a db250e8e9c4dd8924d58df0c6fe2fe96f b b5f9da2ba2f8b76f',
                    transform: {
                      WriteDeployInfo: {
                        gas: '302543230',
                        from: 'account-hash-daa2b596e0a496b04933e241e0567f2bcbecc829aa57d88cab096c28fd07dee2',
                        source:
                          'uref-12440b9a3d73c22bc1e2f379a50fd4a3fb8a7dbe33da29e88c50b7e85c2e6526-007',
                        transfers: [],
                        deploy_hash:
                          '3609df6a9c574adb250e8e9c4dd8924d58df0c6fe2fe96fbb5f9da2ba2f8b76f',
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
                      AddUInt512: '400000000',
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
        // the listed action is bridge_out
        // action: 'bridge_out',
        action: 'bid',
        amount: undefined,
        // what are the deploy types
        deployType: 'StoredContractByHash',
        paymentAmount: '400000000',
        // listed cost is 0.30254
        // cost: '302540000',
        cost: '302543230',
        status: DeployStatus.Success,
        rawDeploy: JSON.stringify({
          deploy: mockRawDeploy,
          execution_results: mockRawExecutionResults,
        }),
      };

      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
      expect(deploy).toEqual(mockDeploy);
    });

    it('should return a deploy of type bid', async () => {
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
        // this has  been  rounded 327110000 is the listed cost
        // cost: '327110000',
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
    });

    it('should return a deploy of type mint', async () => {
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
    });
  });

  describe('getAccount', () => {
    it('should return an account', async () => {
      const mockPublicKeyHex =
        '017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e';
      const mockStateRootHash = 'state-root-hash';
      const mockAccountHash =
        'account-hash-21eaea584903e79365bcb1f7607179cc118807033c8919cff7489a91c3a822d1';
      const mockMainPurse =
        'uref-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a-007';

      const mockRawAccount = {
        _accountHash: mockAccountHash,
        namedKeys: [],
        mainPurse: mockMainPurse,
        associatedKeys: [
          {
            accountHash: mockAccountHash,
            weight: 1,
          },
        ],
        actionThresholds: {
          deployment: 1,
          keyManagement: 1,
        },
      };

      const mockJsonRpc = {
        getStateRootHash: jest.fn().mockResolvedValue(mockStateRootHash),
        getBlockState: jest.fn().mockResolvedValue({
          Account: mockRawAccount,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockAccount = {
        rawAccountHash: mockAccountHash,
        trimmedAccountHash: mockAccountHash.slice(13),
        publicKey: mockPublicKeyHex,
        mainPurse: mockMainPurse,
        rawAccount: JSON.stringify(mockRawAccount),
      };

      const account = await mockRpcClient.getAccount(mockPublicKeyHex);

      expect(account).toEqual(mockAccount);
      expect(mockJsonRpc.getStateRootHash).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockState).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockState).toHaveBeenCalledWith(
        mockStateRootHash,
        mockAccountHash,
        [],
      );
    });

    it('should throw an AccountFetchFailed ApiError if an Error is caught', async () => {
      const mockPublicKeyHex =
        '017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e';
      const mockJsonRpc = {
        getStateRootHash: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getAccount(mockPublicKeyHex);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.AccountFetchFailed);
      }
    });

    it('should throw an AccountMissing ApiError if SDK does not return account', async () => {
      const mockPublicKeyHex =
        '017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e';

      const mockJsonRpc = {
        getStateRootHash: jest.fn().mockResolvedValue(mockPublicKeyHex),
        getBlockState: jest.fn().mockResolvedValue({
          Account: undefined,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getAccount(mockPublicKeyHex);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.AccountMissing);
      }
    });
  });

  describe('getBalance', () => {
    it('should return a balance', async () => {
      const mockUref =
        'uref-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a-007';
      const mockStateRootHash = 'state-root-hash';
      const mockBalance = 1000;

      const mockJsonRpc = {
        getStateRootHash: jest.fn().mockResolvedValue(mockStateRootHash),
        getAccountBalance: jest.fn().mockResolvedValue(mockBalance),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const balance = await mockRpcClient.getBalance(mockUref);

      expect(balance).toEqual(mockBalance.toString());
      expect(mockJsonRpc.getStateRootHash).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getAccountBalance).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getAccountBalance).toHaveBeenCalledWith(
        mockStateRootHash,
        mockUref,
      );
    });

    it('should return null when no balance is returned from the SDK', async () => {
      const mockUref =
        'uref-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a-007';
      const mockStateRootHash = 'state-root-hash';

      const mockJsonRpc = {
        getStateRootHash: jest.fn().mockResolvedValue(mockStateRootHash),
        getAccountBalance: jest.fn().mockResolvedValue(undefined),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const balance = await mockRpcClient.getBalance(mockUref);

      expect(balance).toEqual(null);
      expect(mockJsonRpc.getStateRootHash).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getAccountBalance).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getAccountBalance).toHaveBeenCalledWith(
        mockStateRootHash,
        mockUref,
      );
    });

    it('should throw an BalanceFetchFailed ApiError if an Error is caught', async () => {
      const mockUref =
        'uref-62f7fe1cecb1a4c600ffa791479ce52fb8cbda408815f4dd1b1e0d82e704579a-007';
      const mockStateRootHash = 'state-root-hash';

      const mockJsonRpc = {
        getStateRootHash: jest.fn().mockResolvedValue(mockStateRootHash),
        getAccountBalance: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getBalance(mockUref);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.BalanceFetchFailed);
      }
    });
  });

  describe('getCurrentBlockHeight', () => {
    it('should return current block height', async () => {
      const mockCurrentBlockHeight = 1;

      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: mockCurrentBlockHeight,
            },
          },
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const currentBlockHeight = await mockRpcClient.getCurrentBlockHeight();

      expect(mockJsonRpc.getLatestBlockInfo).toHaveBeenCalledTimes(1);
      expect(currentBlockHeight).toBe(mockCurrentBlockHeight);
    });

    it('should throw CurrentBlockHeightFailed ApiError when an Error is caught', async () => {
      const mockJsonRpc = {
        getLatestBlockInfo: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getCurrentBlockHeight();
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.CurrentBlockHeightFailed);
      }
    });
  });

  describe('getBlockByHeight', () => {
    it('should return block by height', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockBlockHeight = 1;

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getBlockInfoByHeight: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const block = await mockRpcClient.getBlockByHeight(mockBlockHeight);

      const mockBlock = {
        timestamp: dateTimeString,
        // we have to  u se the returned timeSince as mocking it will inevitably be unreliable
        timeSince: block?.timeSince,
        readableTimestamp: formatDate(dateTime),
        height: 1,
        eraID: 1,
        hash: '',
        validatorPublicKey: '',
        deployCount: 2,
        transferHashes: [''],
        deployHashes: [''],
        stateRootHash: '',
        parentHash: '',
        rawBlock: JSON.stringify(mockRawBlockData),
      };

      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledWith(
        mockBlockHeight,
      );
      expect(block).toEqual(mockBlock);
    });

    it('should throw a BlockByHeightFailed ApiError if an Error is thrown', async () => {
      const mockJsonRpc = {
        getBlockInfoByHeight: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong.')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockBlockHeight = 1;

      expect.assertions(1);

      try {
        await mockRpcClient.getBlockByHeight(mockBlockHeight);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.BlockByHeightFailed);
      }
    });

    it('should throw a BlockByHeightMissing ApiError when no block data is returned from sdk', async () => {
      const mockJsonRpc = {
        getBlockInfoByHeight: jest.fn().mockResolvedValue({ block: undefined }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const mockBlockHeight = 1;

      expect.assertions(1);

      try {
        await mockRpcClient.getBlockByHeight(mockBlockHeight);
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.BlockByHeightMissing);
      }
    });
  });

  describe('getBlocks', () => {
    it('should return 1 block when asked for 1 block', async () => {
      const currentBlockHeight = 1;
      const numToShow = 1;

      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: currentBlockHeight,
            },
          },
        }),
        getBlockInfoByHeight: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const blocks = await mockRpcClient.getBlocks(undefined, numToShow);

      expect(mockJsonRpc.getLatestBlockInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledTimes(1);
      expect(blocks.length).toBe(1);
    });

    it('should not call getLatestBlockInfo info if given block height', async () => {
      const currentBlockHeight = 1;
      const numToShow = 1;

      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: currentBlockHeight,
            },
          },
        }),
        getBlockInfoByHeight: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const blocks = await mockRpcClient.getBlocks(
        currentBlockHeight,
        numToShow,
      );

      expect(mockJsonRpc.getLatestBlockInfo).toHaveBeenCalledTimes(0);
      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledTimes(1);
      expect(blocks.length).toBe(1);
    });

    it('should call getCurrentBlockHeight when not given a block height', async () => {
      const numToShow = 1;

      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: 1,
            },
          },
        }),
        getBlockInfoByHeight: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const blocks = await mockRpcClient.getBlocks(undefined, numToShow);

      expect(mockJsonRpc.getLatestBlockInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledTimes(1);
      expect(blocks.length).toBe(1);
    });

    it('should return DEFAULT_NUM_TO_SHOW blocks when not given numToShow param', async () => {
      const dateTime = new Date();
      const dateTimeString = dateTime.toString();

      const mockRawBlockData = {
        hash: '',
        header: {
          timestamp: dateTimeString,
          height: 1,
          era_id: 1,
          state_root_hash: '',
          parent_hash: '',
        },
        body: {
          proposer: '',
          deploy_hashes: [''],
          transfer_hashes: [''],
        },
      };

      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: DEFAULT_NUM_TO_SHOW,
            },
          },
        }),
        getBlockInfoByHeight: jest.fn().mockResolvedValue({
          block: mockRawBlockData,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const blocks = await mockRpcClient.getBlocks();

      expect(mockJsonRpc.getLatestBlockInfo).toHaveBeenCalledTimes(1);
      expect(mockJsonRpc.getBlockInfoByHeight).toHaveBeenCalledTimes(
        DEFAULT_NUM_TO_SHOW,
      );
      expect(blocks.length).toBe(DEFAULT_NUM_TO_SHOW);
    });

    it('should throw a GetBlocksFailed ApiError if an Error is caught', async () => {
      const mockJsonRpc = {
        getLatestBlockInfo: jest.fn().mockResolvedValue({
          block: {
            header: {
              height: DEFAULT_NUM_TO_SHOW,
            },
          },
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getBlocks();
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.GetBlocksFailed);
      }
    });
  });

  describe('getStatus', () => {
    it('should return network status data', async () => {
      const version = '1.3.2';
      const build = 'e2027dbe9';
      const chainspecName = 'integration-test';

      const mockJsonRpc = {
        getStatus: jest.fn().mockResolvedValue({
          build_version: `${version}-${build}`,
          chainspec_name: chainspecName,
        }),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      const currentStatus = await mockRpcClient.getStatus();

      expect(mockJsonRpc.getStatus).toHaveBeenCalledTimes(1);
      expect(currentStatus.version).toBe(version);
      expect(currentStatus.build).toBe(build);
      expect(currentStatus.networkName).toBe(chainspecName);
    });

    it('should throw GetStatusFailed ApiError when an Error is caught', async () => {
      const mockJsonRpc = {
        getStatus: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong')),
      };

      const mockRpcClient = new RpcApi(mockJsonRpc as any);

      expect.assertions(1);

      try {
        await mockRpcClient.getStatus();
      } catch (err: any) {
        expect(err.type).toBe(RpcApiError.GetStatusFailed);
      }
    });
  });
});

export {};
