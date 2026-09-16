'use client';

import React, { useState } from 'react';
import { RecipientRow, PresetTemplate } from '@/types';
import { PRESET_TEMPLATES } from '@/lib/presets';
import { generateBytes32 } from '@/lib/midnight/stealth-service';
import { formatNumber } from '@/lib/utils';
import { 
  Lock, 
  Globe, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Split,
  RefreshCw,
  SlidersHorizontal,
  UserCheck
} from 'lucide-react';

interface DisbursementStudioProps {
  recipients: RecipientRow[];
  setRecipients: React.Dispatch<React.SetStateAction<RecipientRow[]>>;
  poolAmount: number;
  setPoolAmount: (val: number) => void;
  batchMemo: string;
  setBatchMemo: (val: string) => void;
  onExecute: () => void;
  vaultBalance: number;
}

export const DisbursementStudio: React.FC<DisbursementStudioProps> = ({
  recipients,
  setRecipients,
  poolAmount,
  setPoolAmount,
  batchMemo,
  setBatchMemo,
  onExecute,
  vaultBalance,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('engineering_core');

  const calculatedSum = recipients.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
  const delta = poolAmount - calculatedSum;
  const isSolvent = calculatedSum === poolAmount && poolAmount > 0;
  const hasVaultSufficient = vaultBalance >= poolAmount;
  const canExecute = isSolvent && hasVaultSufficient && recipients.length > 0 && recipients.length <= 8;

  const handleApplyPreset = (preset: PresetTemplate) => {
    setSelectedPresetId(preset.id);
    const total = preset.recipients.reduce((sum, r) => sum + r.amount, 0);
    setPoolAmount(total);
    setBatchMemo(`${preset.name} - Shadow Batch`);
    setRecipients(
      preset.recipients.map((r) => ({
        ...r,
        id: generateBytes32('id'),
        salt: generateBytes32('salt'),
      }))
    );
  };

  const handleAddRecipient = () => {
    if (recipients.length >= 8) return;
    const newRecipient: RecipientRow = {
      id: generateBytes32('id'),
      name: `Contributor #${recipients.length + 1}`,
      address: `mn_addr_preprod1qz7x8k2w9d3v4f5u6t7g8h9j0k1l2m3n4p5q6r7s8t9u${(recipients.length + 1).toString().padStart(2, '0')}`,
      amount: 5000,
      department: 'Ecosystem',
      notes: 'Shadow split allocation',
      salt: generateBytes32('salt'),
    };
    const updated = [...recipients, newRecipient];
    setRecipients(updated);
    setPoolAmount(updated.reduce((sum, r) => sum + r.amount, 0));
  };

  const handleRemoveRecipient = (id: string) => {
    const updated = recipients.filter((r) => r.id !== id);
    setRecipients(updated);
    setPoolAmount(updated.reduce((sum, r) => sum + r.amount, 0));
  };

  const handleUpdateRecipient = (id: string, field: keyof RecipientRow, value: string | number) => {
    setRecipients((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  const handleAutoBalancePool = () => {
    setPoolAmount(calculatedSum);
  };

  const handleEqualSplit = () => {
    if (recipients.length === 0 || poolAmount <= 0) return;
    const baseShare = Math.floor(poolAmount / recipients.length);
    const remainder = poolAmount % recipients.length;
    setRecipients((prev) =>
      prev.map((r, idx) => ({
        ...r,
        amount: idx === 0 ? baseShare + remainder : baseShare,
      }))
    );
  };

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Top Header & Preset Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-shadow-purple-neon text-base">✦</span>
            <h2 className="text-xl font-bold tracking-tight text-white font-mono">
              Shadow Disbursement Studio
            </h2>
          </div>
          <p className="text-xs text-onyx-400 mt-1">
            Build confidential payroll batches. Individual payouts are isolated in Midnight Zero-Knowledge witnesses.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-1.5 overflow-x-auto p-1 rounded-full bg-shadow-void-950/80 border border-white/10 shadow-inner">
          <span className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider px-3 font-mono">
            Presets:
          </span>
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                selectedPresetId === preset.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                  : 'text-onyx-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Target Disbursal Pool & Batch Memo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Disbursal Pool Input */}
        <div className="p-5 rounded-2xl bg-shadow-void-950/70 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-onyx-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
              <Globe className="w-3.5 h-3.5 text-cyan-neon" />
              <span>Public Disbursal Pool (tDUST)</span>
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 font-mono">
              Public Ledger Target
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={poolAmount || ''}
              onChange={(e) => setPoolAmount(Number(e.target.value) || 0)}
              placeholder="e.g. 48500"
              className="w-full px-4 py-2.5 rounded-xl bg-shadow-void-900 border border-white/10 text-white font-mono text-xl font-bold focus:outline-none focus:border-cyan-neon transition"
            />
            <button
              type="button"
              onClick={handleAutoBalancePool}
              className="absolute right-3 top-2.5 text-[11px] px-2.5 py-1 rounded-lg bg-shadow-void-800 hover:bg-purple-900/50 text-purple-200 hover:text-white transition font-mono border border-white/10"
              title="Set pool to exact sum of recipients"
            >
              Auto-Match Sum
            </button>
          </div>
        </div>

        {/* Batch Memo / Description */}
        <div className="p-5 rounded-2xl bg-shadow-void-950/70 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-onyx-300 uppercase tracking-wider font-mono">
              Batch Description / Memo
            </label>
            <span className="text-[10px] text-onyx-500 font-mono">
              On-Chain Reference
            </span>
          </div>
          <input
            type="text"
            value={batchMemo}
            onChange={(e) => setBatchMemo(e.target.value)}
            placeholder="e.g. Core Engineering Sprint Payout"
            className="w-full px-4 py-2.5 rounded-xl bg-shadow-void-900 border border-white/10 text-white text-sm focus:outline-none focus:border-shadow-purple-neon transition"
          />
        </div>

      </div>

      {/* Recipient Line Items Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200 font-mono">
              Private Allocation Witnesses ({recipients.length}/8)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-shadow-purple-neon border border-purple-500/30 font-mono">
              🔒 Shielded Witness Vectors
            </span>
          </div>

          {/* Table Actions Toolbar */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEqualSplit}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-shadow-void-950 hover:bg-shadow-void-900 text-onyx-300 hover:text-cyan-neon text-xs font-mono font-medium border border-white/10 transition"
              title="Split pool amount equally across all recipients"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split Equally</span>
            </button>

            <button
              onClick={handleAddRecipient}
              disabled={recipients.length >= 8}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-semibold shadow-neon-purple transition disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recipient</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-shadow-void-950/60 shadow-inner">
          <table className="w-full text-left text-xs">
            <thead className="bg-shadow-void-900/90 text-onyx-400 uppercase font-mono tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Recipient Name / Role</th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center space-x-1">
                    <span>Midnight Address</span>
                    <span className="text-[9px] text-shadow-purple-neon">🔒 Witness</span>
                  </div>
                </th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center space-x-1">
                    <span>Amount (tDUST)</span>
                    <span className="text-[9px] text-shadow-purple-neon">🔒 Witness</span>
                  </div>
                </th>
                <th className="py-3.5 px-4">Share %</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {recipients.map((recipient, idx) => {
                const sharePercent = poolAmount > 0 ? ((recipient.amount / poolAmount) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={recipient.id} className="hover:bg-shadow-void-900/50 transition">
                    <td className="py-3.5 px-4 text-onyx-500 font-mono">{idx + 1}</td>
                    
                    {/* Name & Role */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-shadow-void-800 border border-white/10 flex items-center justify-center text-[10px] text-purple-200 font-bold">
                          {recipient.name.charAt(0)}
                        </div>
                        <input
                          type="text"
                          value={recipient.name}
                          onChange={(e) => handleUpdateRecipient(recipient.id, 'name', e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-shadow-void-900 border border-white/5 text-white font-sans text-xs focus:outline-none focus:border-shadow-purple-neon"
                        />
                      </div>
                    </td>

                    {/* Midnight Bech32 Address */}
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={recipient.address}
                        onChange={(e) => handleUpdateRecipient(recipient.id, 'address', e.target.value)}
                        className="w-48 sm:w-56 px-2.5 py-1 rounded-lg bg-shadow-void-900 border border-white/5 text-onyx-400 font-mono text-[11px] focus:outline-none focus:border-shadow-purple-neon"
                      />
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={recipient.department}
                        onChange={(e) => handleUpdateRecipient(recipient.id, 'department', e.target.value)}
                        className="w-28 px-2.5 py-1 rounded-lg bg-shadow-void-900 border border-white/5 text-onyx-400 font-sans text-xs focus:outline-none focus:border-shadow-purple-neon"
                      />
                    </td>

                    {/* Amount in tDUST */}
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={recipient.amount || ''}
                        onChange={(e) => handleUpdateRecipient(recipient.id, 'amount', Number(e.target.value) || 0)}
                        className="w-28 px-2.5 py-1 rounded-lg bg-shadow-void-900 border border-shadow-purple-neon/40 text-shadow-purple-neon font-mono font-bold focus:outline-none focus:border-shadow-purple-neon"
                      />
                    </td>

                    {/* Share Percentage */}
                    <td className="py-3.5 px-4 text-onyx-400 font-mono">
                      {sharePercent}%
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleRemoveRecipient(recipient.id)}
                        disabled={recipients.length <= 1}
                        className="p-1.5 rounded-lg text-onyx-500 hover:text-rose-neon hover:bg-rose-neon/10 transition disabled:opacity-20"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solvency Calculation & Mathematical Radar */}
      <div className="p-5 rounded-2xl bg-shadow-void-950/90 border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {isSolvent ? (
              <div className="p-2 rounded-xl bg-purple-500/15 text-shadow-purple-neon border border-purple-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-amber-neon/15 text-amber-neon border border-amber-neon/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                {isSolvent
                  ? 'Cryptographic Solvency Satisfied: ∑(w_i) == Pool'
                  : 'Solvency Discrepancy Detected'}
              </div>
              <p className="text-[11px] text-onyx-400" suppressHydrationWarning>
                {isSolvent
                  ? 'Private witness sum strictly matches public pool. Zero-Knowledge proof guarantees 100% solvency without leakage.'
                  : `Sum mismatch: Recipient allocations total ${formatNumber(calculatedSum)} tDUST, but Disbursal Pool is ${formatNumber(poolAmount)} tDUST (Delta: ${delta > 0 ? `+${formatNumber(delta)}` : formatNumber(delta)}).`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="text-right">
              <div className="text-[10px] text-onyx-400">Witness Sum</div>
              <div className="text-white font-bold" suppressHydrationWarning>{formatNumber(calculatedSum)} tDUST</div>
            </div>
            <div className="text-onyx-600 font-bold">=</div>
            <div className="text-right">
              <div className="text-[10px] text-onyx-400">Public Pool</div>
              <div className="text-cyan-neon font-bold" suppressHydrationWarning>{formatNumber(poolAmount)} tDUST</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5">
          <div className="flex items-center space-x-2 text-xs text-onyx-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-shadow-purple-neon" />
            <span>Witness allocations never touch the public mempool or block headers.</span>
          </div>

          <button
            onClick={onExecute}
            disabled={!canExecute}
            className={`flex items-center justify-center space-x-2.5 px-8 py-3 rounded-full font-bold font-mono text-xs transition ${
              canExecute
                ? 'bg-gradient-to-r from-purple-600 via-shadow-purple-vivid to-cyan-500 text-white shadow-neon-purple hover:opacity-95 cursor-pointer scale-100 hover:scale-[1.02]'
                : 'bg-shadow-void-800 text-onyx-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            <span>Execute Shadow Payout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
