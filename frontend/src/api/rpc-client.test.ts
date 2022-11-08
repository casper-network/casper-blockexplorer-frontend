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

    it('should return a deploy of type transfer', async () => {
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
        // w e have to use the returned timeSince as mocking it will inevitably be unreliable
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
