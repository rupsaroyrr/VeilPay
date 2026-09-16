import { describe, it, expect } from 'vitest';
import { PRESET_TEMPLATES } from '../src/lib/presets';

describe('Disbursement Presets', () => {
  it('should have valid recipient entries in each preset', () => {
    for (const preset of PRESET_TEMPLATES) {
      expect(preset.recipients.length).toBeGreaterThan(0);
      expect(preset.recipients.length).toBeLessThanOrEqual(8);
      const sum = preset.recipients.reduce((acc, r) => acc + r.amount, 0);
      expect(sum).toBeGreaterThan(0);
    }
  });
});
