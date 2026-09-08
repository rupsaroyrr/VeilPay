import { describe, it, expect, beforeEach } from 'vitest';
import { 
  StealthPayService, 
  computeRecipientCommitment, 
  computeSolvencyMerkleRoot, 
  generateBytes32 
} from '../src/lib/midnight/stealth-service';
import { RecipientRow } from '../src/types';

describe('StealthPay Confidential Payroll Protocol Suite', () => {
  let service: StealthPayService;

  beforeEach(() => {
    service = StealthPayService.getInstance();
  });

  const createMockRecipients = (amounts: number[]): RecipientRow[] => {
    return amounts.map((amount, idx) => ({
      id: `id_${idx}`,
      name: `Developer #${idx + 1}`,
      address: `mn_addr_preprod1qz7x8k2w9d3v4f5u6t7g8h9j0k1l2m3n4p5q6r7s8t9u${idx}`,
      amount,
      department: 'Engineering',
      notes: 'Core contributor split',
      salt: `0xsalt_${idx.toString().padStart(16, '0')}`,
    }));
  };

  // ---------------------------------------------------------------------------
  // TEST 1: Mathematical Solvency Equality Verification
  // ---------------------------------------------------------------------------
  it('1. should verify mathematical solvency when private witness sum exactly equals public pool', async () => {
    const allocations = [14000, 12500, 9000, 8000, 5000]; // Sum = 48,500
    const poolAmount = 48500;
    const recipients = createMockRecipients(allocations);

    const initialVault = service.getTreasuryState().vaultBalance;
    const initialDisbursed = service.getTreasuryState().totalHistoricalDisbursed;

    const record = await service.executeStealthPayout(
      recipients,
      poolAmount,
      'Sprint 24 Stealth Settlement',
      () => {},
      true
    );

    expect(record).toBeDefined();
    expect(record.status).toBe('confirmed');
    expect(record.totalAmount).toBe(48500);
    expect(record.recipientCount).toBe(5);
    expect(record.txHash).toMatch(/^0x/);

    // Verify vault balance updated
    const finalState = service.getTreasuryState();
    expect(finalState.vaultBalance).toBe(initialVault - poolAmount);
    expect(finalState.totalHistoricalDisbursed).toBe(initialDisbursed + poolAmount);
  });

  // ---------------------------------------------------------------------------
  // TEST 2: Private Witness Isolation (Shielded Salary Proof)
  // ---------------------------------------------------------------------------
  it('2. should shield individual recipient amounts and addresses from public batch record', async () => {
    const allocations = [25000, 15000, 10000];
    const poolAmount = 50000;
    const recipients = createMockRecipients(allocations);

    const record = await service.executeStealthPayout(
      recipients,
      poolAmount,
      'DAO Strategic Grant',
      () => {},
      true
    );

    // The public record must only expose aggregate metadata
    const publicKeys = Object.keys(record);
    expect(publicKeys).toContain('batchId');
    expect(publicKeys).toContain('totalAmount');
    expect(publicKeys).toContain('recipientCount');
    expect(publicKeys).toContain('solvencyMerkleRoot');
    expect(publicKeys).toContain('txHash');

    // Confirm that individual recipient data is NOT present on public record
    expect((record as any).recipients).toBeUndefined();
    expect((record as any).allocations).toBeUndefined();
    expect((record as any).salaries).toBeUndefined();
  });

  // ---------------------------------------------------------------------------
  // TEST 3: Batch Disbursal State Transition & Public Counter Update
  // ---------------------------------------------------------------------------
  it('3. should increment batchCounter and append verified batch to ledger history', async () => {
    const initialBatchCount = service.getTreasuryState().batchCount;
    const initialHistoryLength = service.getTransactionHistory().length;

    const recipients = createMockRecipients([10000, 20000]);
    const poolAmount = 30000;

    await service.executeStealthPayout(recipients, poolAmount, 'Counter Test', () => {}, true);

    const updatedState = service.getTreasuryState();
    const updatedHistory = service.getTransactionHistory();

    expect(updatedState.batchCount).toBe(initialBatchCount + 1);
    expect(updatedHistory.length).toBe(initialHistoryLength + 1);
    expect(updatedHistory[0].totalAmount).toBe(30000);
  });

  // ---------------------------------------------------------------------------
  // TEST 4: Insolvent Disbursal Rejection (Sum Mismatch)
  // ---------------------------------------------------------------------------
  it('4. should reject execution when private witness sum does not match public pool', async () => {
    const allocations = [10000, 15000]; // Sum = 25,000
    const poolAmount = 30000; // Declared Pool = 30,000 (Mismatch)
    const recipients = createMockRecipients(allocations);

    await expect(
      service.executeStealthPayout(recipients, poolAmount, 'Insolvent Batch', () => {})
    ).rejects.toThrow(/ZK Solvency Error/);
  });

  // ---------------------------------------------------------------------------
  // TEST 5: Bounds & Constraints Verification (Empty / Overflow / Vault)
  // ---------------------------------------------------------------------------
  it('5. should reject empty recipient batches or batches exceeding 8 recipients', async () => {
    // Empty recipients
    await expect(
      service.executeStealthPayout([], 0, 'Empty Batch', () => {})
    ).rejects.toThrow(/At least one recipient is required/);

    // Exceeding Compact vector maximum of 8
    const overflowRecipients = createMockRecipients([1, 1, 1, 1, 1, 1, 1, 1, 1]); // 9 recipients
    await expect(
      service.executeStealthPayout(overflowRecipients, 9, 'Overflow Batch', () => {})
    ).rejects.toThrow(/Maximum batch size is 8 recipients/);
  });

  // ---------------------------------------------------------------------------
  // TEST 6: Commitment & Merkle Tree Determinism
  // ---------------------------------------------------------------------------
  it('6. should generate deterministic Pedersen/Poseidon commitments and Merkle roots', () => {
    const address = 'mn_addr_preprod1qz7x8k2w9d3v4f5u6t7g8h9j0k1l2m3n4p5q6r7s8t9u01';
    const amount = 14000;
    const salt = '0xsalt_0000000000000001';

    const comm1 = computeRecipientCommitment(address, amount, salt);
    const comm2 = computeRecipientCommitment(address, amount, salt);

    expect(comm1).toBe(comm2);
    expect(comm1).toMatch(/^0xcomm_/);

    const root = computeSolvencyMerkleRoot([comm1]);
    expect(root).toMatch(/^0xzk_merkle_root_/);
  });
});
