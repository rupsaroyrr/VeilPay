'use client';

import React, { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import { Vault, ArrowUpRight, X, Sparkles, ShieldCheck } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
  currentBalance: number;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  currentBalance,
}) => {
  const [amount, setAmount] = useState<number>(50000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    onDeposit(amount);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-shadow-void-950/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl luxury-card p-6 sm:p-8 overflow-hidden shadow-2xl border border-shadow-purple-neon/40">
        
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-shadow-void-900 border border-shadow-purple-neon/40 text-shadow-purple-neon shadow-neon-purple">
              <Vault className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">
                Deposit to Treasury Vault
              </h3>
              <p className="text-xs text-onyx-400 font-mono">
                Midnight Preprod Contract Pool
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-onyx-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-6">
          <div className="p-3.5 rounded-2xl bg-shadow-void-950/90 border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-onyx-400">Current Vault Liquidity:</span>
            <span className="text-shadow-purple-neon font-bold" suppressHydrationWarning>{formatNumber(currentBalance)} tDUST</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-onyx-300 uppercase tracking-wider font-mono">
              Deposit Amount (tDUST)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-shadow-void-950 border border-white/10 text-white font-mono text-xl font-bold focus:outline-none focus:border-shadow-purple-neon transition"
                placeholder="50000"
                required
              />
              <span className="absolute right-4 top-3.5 text-xs text-onyx-400 font-mono font-bold">
                tDUST
              </span>
            </div>
          </div>

          {/* Quick Amount Pills */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[25000, 50000, 100000, 250000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="px-2 py-1.5 rounded-full bg-shadow-void-950 hover:bg-shadow-void-900 text-xs font-mono text-onyx-300 hover:text-shadow-purple-neon border border-white/5 transition"
              >
                +{val / 1000}k
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-shadow-void-900 hover:bg-shadow-void-800 text-onyx-300 hover:text-white text-xs font-mono border border-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || amount <= 0}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-shadow-purple-vivid to-cyan-500 text-white font-bold font-mono text-xs shadow-neon-purple hover:opacity-95 transition disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Confirm Deposit'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
