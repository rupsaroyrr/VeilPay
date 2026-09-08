import { describe, it, expect } from 'vitest';
import { computeSolvencyMerkleRoot } from '../src/lib/midnight/stealth-service';

describe('Witness Vector Synthesis', () => {
  it('should return empty root when no commitments exist', () => {
    const root = computeSolvencyMerkleRoot([]);
    expect(root.startsWith('0xempty_root_')).toBe(true);
  });

  it('should compute valid root for multiple commitments', () => {
    const comms = ['0xcomm_1', '0xcomm_2', '0xcomm_3'];
    const root = computeSolvencyMerkleRoot(comms);
    expect(root.startsWith('0xzk_merkle_root_')).toBe(true);
  });
});
