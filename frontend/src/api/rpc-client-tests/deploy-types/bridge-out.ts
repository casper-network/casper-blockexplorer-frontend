/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const bridgeOut = async () => {
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
        entry_point: 'bridge_out',
      },
    },
    approvals: [
      {
        signer:
          '8153c553e8339fb87224097e4a3a2d8e4d8f49fbacee5c192e039709bc4211ba',
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
                      1, 60, 12, 24, 71, 209, 196, 16, 51, 138, 185, 180, 238,
                      9, 25, 193, 129, 207, 38, 8, 89, 151, 255, 156, 121, 126,
                      138, 26, 229, 176, 45, 223, 35, 6, 0, 0, 0, 71, 79, 69,
                      82, 76, 73, 40, 0, 0, 0, 51, 48, 57, 53, 102, 57, 53, 53,
                      100, 97, 55, 48, 48, 98, 57, 54, 50, 49, 53, 99, 102, 102,
                      99, 57, 98, 99, 54, 52, 97, 98, 50, 101, 54, 57, 101, 98,
                      55, 100, 97, 98, 2, 16, 39, 0, 144, 96, 192, 130, 11, 81,
                      86, 177, 98, 12, 142, 51, 68, 209, 127, 159, 173, 81, 8,
                      245, 220, 38, 114, 242, 48, 132, 57, 232, 67, 99, 200,
                      142,
                    ],
                    cl_type: {
                      List: 'U8',
                    },
                  },
                },
              },
              {
                key: 'deploy-3609df6a9c574adb250e8e9c4dd8924d58df0c6fe2fe96fbb5f9da2ba2f8b76f',
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
    action: 'bridge_out',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '400000000',
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
};
