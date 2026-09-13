import { describe, it, expect } from 'vitest';
import { stealthPayService } from '../src/lib/midnight/stealth-service';

describe('Treasury Vault Telemetry', () => {
  it('should initialize with positive vault balance', () => {
    const state = stealthPayService.getTreasuryState();
    expect(state.vaultBalance).toBeGreaterThan(0);
    expect(state.batchCount).toBeGreaterThanOrEqual(0);
  });

  it('should increase balance when deposit is executed', () => {
    const initial = stealthPayService.getTreasuryState().vaultBalance;
    const updated = stealthPayService.depositToTreasury(25000);
    expect(updated.vaultBalance).toBe(initial + 25000);
  });
});
