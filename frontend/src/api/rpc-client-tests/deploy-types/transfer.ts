/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const transfer = async () => {
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
};
