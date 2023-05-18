export const getRawAccount = () => ({
  _accountHash:
    'account-hash-4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
  namedKeys: [],
  mainPurse:
    'uref-4ba7b97ccc3af3dfe87f2b834865941ecafb09483bcb8fbb1fa49dd6aecf4ca3-007',
  associatedKeys: [
    {
      accountHash:
        'account-hash-4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
      weight: 1,
    },
  ],
  actionThresholds: { deployment: 1, keyManagement: 1 },
});

export const getMockAccount = () => ({
  trimmedAccountHash:
    '4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
  publicKey:
    '0103dd8b2b18ef0b9fd5b7c8e340b104ee4d966f2a167eb1a938963f8c8f699a45',
  mainPurse:
    'uref-4ba7b97ccc3af3dfe87f2b834865941ecafb09483bcb8fbb1fa49dd6aecf4ca3-007',
  rawAccount: JSON.stringify(getRawAccount),
});

export const getMockBalance = () => '3147833210320';
