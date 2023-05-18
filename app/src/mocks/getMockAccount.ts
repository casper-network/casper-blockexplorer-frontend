const mockPublicKeyHex =
  '017b9a85b657e0a8c2e01bf2d80b6b2e6f8d8b4bc6d7c479f21e59dceea761710b';
const mockStateRootHash = 'state-root-hash';

const mockAccountHash =
  'account-hash-017b9a85b657e0a8c2e01bf2d80b6b2e6f8d8b4bc6d7c479f21e59dceea761710b';
const mockMainPurse =
  'uref-770b0c78228941881e99bd4aee0b910d1288a00da6046fb7c8dbb9ccf4b4fa56-007';

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

export const mockAccount = {
  rawAccountHash: mockAccountHash,
  trimmedAccountHash: mockAccountHash.slice(13),
  publicKey: mockPublicKeyHex,
  mainPurse: mockMainPurse,
  rawAccount: mockRawAccount,
};
