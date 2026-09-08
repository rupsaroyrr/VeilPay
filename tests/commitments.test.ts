import { describe, it, expect } from 'vitest';
import { computeRecipientCommitment, computeSolvencyMerkleRoot, generateBytes32 } from '../src/lib/midnight/stealth-service';

describe('Cryptographic Commitments', () => {
  it('should generate deterministic commitments for given inputs', () => {
    const salt = generateBytes32('salt');
    const comm1 = computeRecipientCommitment('mn_addr_preprod1abc', 5000, salt);
    const comm2 = computeRecipientCommitment('mn_addr_preprod1abc', 5000, salt);
    expect(comm1).toBe(comm2);
    expect(comm1.startsWith('0xcomm_')).toBe(true);
  });

  it('should produce distinct commitments for different salts', () => {
    const comm1 = computeRecipientCommitment('mn_addr_preprod1abc', 5000, generateBytes32('s1'));
    const comm2 = computeRecipientCommitment('mn_addr_preprod1abc', 5000, generateBytes32('s2'));
    expect(comm1).not.toBe(comm2);
  });
});
