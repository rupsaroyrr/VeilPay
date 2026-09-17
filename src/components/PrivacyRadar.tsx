'use client';

import React, { useState } from 'react';
import { RecipientRow } from '@/types';
import { formatNumber } from '@/lib/utils';
import { Eye, EyeOff, Shield, Globe, Lock, ShieldCheck, Sparkles, Hash } from 'lucide-react';

interface PrivacyRadarProps {
  recipients: RecipientRow[];
  poolAmount: number;
  batchMemo: string;
}

export const PrivacyRadar: React.FC<PrivacyRadarProps> = ({
  recipients,
  poolAmount,
  batchMemo,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'public' | 'private'>('split');

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-cyan-neon text-base">✦</span>
            <h2 className="text-xl font-bold tracking-tight text-white font-mono">
              Privacy Transparency Radar
            </h2>
          </div>
          <p className="text-xs text-onyx-400 mt-1">
            Compare what the public Midnight blockchain sees vs what the local VeilPay treasury enclave sees.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-shadow-void-950/80 border border-white/10 text-xs font-mono shadow-inner">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
              viewMode === 'split' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple' : 'text-onyx-400 hover:text-white'
            }`}
          >
            Side-by-Side View
          </button>
          <button
            onClick={() => setViewMode('public')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
              viewMode === 'public' ? 'bg-cyan-neon text-shadow-void-950 font-bold shadow-neon-cyan' : 'text-onyx-400 hover:text-white'
            }`}
          >
            Public Ledger Only
          </button>
          <button
            onClick={() => setViewMode('private')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
              viewMode === 'private' ? 'bg-shadow-purple-neon text-shadow-void-950 font-bold shadow-neon-purple' : 'text-onyx-400 hover:text-white'
            }`}
          >
            Manager Enclave Only
          </button>
        </div>
      </div>

      {/* Dual Panel Comparison Grid */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* LEFT: Public On-Chain Ledger View */}
        {(viewMode === 'split' || viewMode === 'public') && (
          <div className="rounded-2xl bg-shadow-void-950/90 border border-cyan-neon/30 p-5 sm:p-6 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-neon" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-neon font-mono">
                  🌐 Public On-Chain Explorer View
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 font-mono">
                Visible to World
              </span>
            </div>

            {/* Public Disclosed Parameters */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-shadow-void-900 border border-white/5">
                <div className="text-[10px] text-onyx-400">Disclosed Pool Sum</div>
                <div className="text-base font-bold text-white mt-0.5" suppressHydrationWarning>
                  {formatNumber(poolAmount)} tDUST
                </div>
              </div>
              <div className="p-3 rounded-xl bg-shadow-void-900 border border-white/5">
                <div className="text-[10px] text-onyx-400">Recipient Count</div>
                <div className="text-base font-bold text-cyan-neon mt-0.5">
                  {recipients.length} Shielded Nodes
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-shadow-void-900 border border-white/5 space-y-1 font-mono text-xs">
              <div className="text-[10px] text-onyx-400">ZK Merkle Commitment Root</div>
              <div className="text-[11px] text-cyan-300 truncate">
                0xzk_merkle_root_77a1bc9482d3e04918efbc62719a840e...
              </div>
            </div>

            {/* Shielded Obfuscated Recipient List */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold text-onyx-400 uppercase tracking-wider font-mono">
                Blockchain Recipient Records (Zero-Knowledge Protected):
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {recipients.map((_, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-shadow-void-900/80 border border-white/5 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <Lock className="w-3.5 h-3.5 text-cyan-neon" />
                      <span className="text-onyx-400">
                        Witness_Vector_0x{i.toString(16).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-neon/10 text-cyan-neon font-medium">
                      🔒 Shielded Amount
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-onyx-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-neon" />
              <span>No individual salaries or wallet mappings exist on public ledger.</span>
            </div>
          </div>
        )}

        {/* RIGHT: Local Manager Enclave View */}
        {(viewMode === 'split' || viewMode === 'private') && (
          <div className="rounded-2xl bg-shadow-void-950/90 border border-shadow-purple-neon/40 p-5 sm:p-6 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-shadow-purple-neon" />
                <span className="text-xs font-bold uppercase tracking-wider text-shadow-purple-neon font-mono">
                  🛡️ Local Manager Enclave View
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-shadow-purple-neon border border-purple-500/30 font-mono">
                Decrypted Local Session
              </span>
            </div>

            {/* Enclave Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-shadow-void-900 border border-white/5">
                <div className="text-[10px] text-onyx-400">Batch Memo</div>
                <div className="text-base font-bold text-white mt-0.5 truncate font-sans">
                  {batchMemo || 'Shadow Batch'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-shadow-void-900 border border-white/5">
                <div className="text-[10px] text-onyx-400">Allocated Total</div>
                <div className="text-base font-bold text-shadow-purple-neon mt-0.5" suppressHydrationWarning>
                  {formatNumber(poolAmount)} tDUST
                </div>
              </div>
            </div>

            {/* Decrypted Itemized List */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider font-mono">
                Itemized Compensation Breakdown (Authorized Officer):
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {recipients.map((r, i) => {
                  const pct = poolAmount > 0 ? ((r.amount / poolAmount) * 100).toFixed(1) : '0';
                  return (
                    <div
                      key={r.id || i}
                      className="p-2.5 rounded-xl bg-shadow-void-900/80 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-shadow-void-800 border border-white/10 flex items-center justify-center text-[9px] text-purple-200 font-bold">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium text-xs">{r.name}</div>
                          <div className="text-[10px] text-onyx-400 font-mono">{r.department}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-shadow-purple-neon font-bold text-xs" suppressHydrationWarning>{formatNumber(r.amount)} tDUST</div>
                        <div className="text-[10px] text-onyx-400">{pct}% split</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-onyx-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-shadow-purple-neon" />
              <span>Decrypted via authorized treasury manager witness keypair.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
