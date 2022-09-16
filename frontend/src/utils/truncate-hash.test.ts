import { truncateHash } from './truncate-hash';

describe('truncateHash', () => {
  it('should truncate hash', () => {
    const mockBlockHash =
      '05ebc114e9c28b22dc9830b561b02569642698358a100b4c0f1123766d3a73bd';

    const truncatedHash = truncateHash(mockBlockHash);

    expect(truncatedHash).toBe('05ebc...a73bd');
  });
});

export {};
