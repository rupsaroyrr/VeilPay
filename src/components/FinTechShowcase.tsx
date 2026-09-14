'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  Check, 
  MoreHorizontal, 
  Sparkles,
  ChevronDown,
  Lock,
  Eye,
  CreditCard,
  TrendingUp,
  Activity,
  Globe,
  CircleDot
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface FinTechShowcaseProps {
  onLaunchStudio: () => void;
  onInspectCircuit: () => void;
  vaultBalance: number;
}

export const FinTechShowcase: React.FC<FinTechShowcaseProps> = ({
  onLaunchStudio,
  onInspectCircuit,
  vaultBalance,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  return (
    <div className="w-full space-y-16">
      
      {/* 1. HERO SECTION: Cyber Mesh Enclave & 3D Pedestal Stage */}
      <section className="relative w-full rounded-3xl overflow-hidden border border-white/10 cyber-mesh-bg fluted-curtain-vignette pt-12 pb-16 px-4 sm:px-8 text-center flex flex-col items-center justify-center shadow-2xl">
        
        {/* Glow Halo behind hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-purple-600/20 via-shadow-purple-vivid/15 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Simple Trust Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-shadow-void-900/90 border border-shadow-purple-vivid/30 text-xs font-mono text-onyx-300 shadow-neon-purple backdrop-blur-md mb-6 hover:border-shadow-purple-neon transition">
          <span className="text-shadow-purple-neon text-xs">✦</span>
          <span className="tracking-wider uppercase text-[11px] font-semibold text-purple-200">
            CONFIDENTIAL SPLITS & PAYROLL ENCLAVE
          </span>
        </div>

        {/* Center Display Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.12] text-white max-w-3xl font-display">
          Where Confidential Capital <br />
          <span className="text-gradient-purple font-semibold">Finds Autonomous Sanctuary</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-onyx-300 max-w-xl font-sans font-light leading-relaxed">
          Execute multi-party revenue splits, payroll batches, and zero-knowledge solvency verifications without exposing salaries or treasury reserves.
        </p>

        {/* 3D Illuminated Pedestal Stage Graphic */}
        <div className="relative mt-12 w-full max-w-2xl h-64 sm:h-72 flex items-center justify-center">
          
          {/* Vertical Ribbed Lighting Lines */}
          <div className="absolute inset-0 flex justify-around opacity-30 pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-purple-500/10 via-purple-400/40 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-cyan-400/15 via-cyan-300/50 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-purple-500/20 via-purple-300/60 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-cyan-400/15 via-cyan-300/50 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-purple-500/10 via-purple-400/40 to-transparent" />
          </div>

          {/* Floating Glass Plates in 3D Perspective */}
          <div className="absolute top-6 w-48 sm:w-64 h-24 sm:h-32 pedestal-layer-floating rounded-2xl flex items-center justify-center z-20 transition-transform duration-700 hover:scale-105 shadow-neon-purple border border-shadow-purple-neon/40">
            <div className="text-[10px] font-mono text-purple-200 uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-shadow-purple-neon animate-ping" />
              <span className="font-semibold">Zero-Knowledge Shield</span>
            </div>
          </div>

          {/* Glowing Pedestal Base Platform */}
          <div className="absolute bottom-4 w-64 sm:w-96 h-20 sm:h-24 pedestal-stage rounded-xl flex flex-col justify-end p-2 z-10 border border-shadow-purple-vivid/30">
            {/* Illuminated Rim Line */}
            <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-white to-cyan-400 rounded-full pedestal-rim-glow mb-2" />
            <div className="w-full h-1 bg-purple-400/30 rounded-full blur-xs" />
          </div>

          {/* Mouse Scroll Indicator */}
          <button 
            onClick={onLaunchStudio}
            className="absolute -bottom-4 z-30 flex flex-col items-center space-y-1 text-onyx-400 hover:text-white transition group"
            title="Scroll to studio"
          >
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-shadow-purple-neon transition">
              <div className="w-1 h-2 rounded-full bg-shadow-purple-neon group-hover:bg-cyan-300 animate-bounce" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-onyx-400 group-hover:text-shadow-purple-neon transition" />
          </button>

        </div>

      </section>

      {/* 2. SPLIT SECTION: Transform Your Wealth & Finance Management Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline, CTAs, and Partner Logos */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-shadow-void-900 border border-white/10 text-xs font-mono text-onyx-300">
            <span className="text-shadow-purple-neon text-xs">✦</span>
            <span className="uppercase text-[11px] font-semibold text-purple-200">SIMPLE TRUST & PRIVACY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white font-display">
            Transform Your <br />
            <span className="text-gradient-purple font-semibold">Payroll With VeilPay®</span>
          </h2>

          <p className="text-sm sm:text-base text-onyx-300 font-sans font-light leading-relaxed max-w-lg">
            We employ cutting-edge Midnight Compact zero-knowledge encryption circuits to safeguard your digital payroll allocations and protect contributor identities from public surveillance.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onLaunchStudio}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-shadow-purple-vivid to-cyan-500 text-white font-bold text-xs hover:opacity-95 transition shadow-neon-purple flex items-center space-x-2"
            >
              <span>Launch Stealth Studio</span>
              <span className="text-sm">→</span>
            </button>

            <button
              onClick={onInspectCircuit}
              className="px-6 py-3 rounded-full bg-shadow-void-900 border border-white/15 hover:border-shadow-purple-neon/50 text-white text-xs font-mono transition flex items-center space-x-2 shadow-sm"
            >
              <span>Inspect ZK Circuit</span>
              <span className="text-shadow-purple-neon">⊙</span>
            </button>
          </div>

          {/* Trusted By Logos Bar */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="text-[11px] font-mono text-onyx-500 uppercase tracking-wider">
              Powered by Midnight Ecosystem
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono font-bold text-onyx-400">
              <span className="hover:text-white transition flex items-center space-x-1">
                <span className="text-shadow-purple-neon">✦</span>
                <span>MIDNIGHT NETWORK</span>
              </span>
              <span className="hover:text-white transition">LACE WALLET</span>
              <span className="hover:text-white transition">COMPACT v0.20</span>
              <span className="hover:text-white transition">HALO2 ZK</span>
            </div>
          </div>

        </div>

        {/* Right Column: Finance Management Chart Card */}
        <div className="lg:col-span-6">
          <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white font-display">Confidential Split Telemetry</h3>
                <div className="flex items-center space-x-4 mt-1.5 text-xs font-mono">
                  <span className="flex items-center space-x-1.5 text-onyx-400">
                    <span className="w-3 h-0.5 bg-onyx-600 rounded-full" />
                    <span>Public Chains (Exposed)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-shadow-purple-neon">
                    <span className="w-3 h-0.5 bg-shadow-purple-neon rounded-full" />
                    <span>VeilPay ZK (Concealed)</span>
                  </span>
                </div>
              </div>

              <button className="p-2 rounded-xl bg-shadow-void-900 border border-white/10 text-onyx-400 hover:text-white transition">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Vertical Rounded Bars Chart */}
            <div className="relative pt-6 pb-2">
              <div className="flex items-end justify-between h-48 sm:h-52 px-2 border-b border-white/10 pb-4">
                
                {/* Scale labels */}
                <div className="absolute left-0 top-0 text-[10px] font-mono text-onyx-500">16K</div>
                <div className="absolute left-0 top-1/2 text-[10px] font-mono text-onyx-500">8K</div>
                <div className="absolute left-0 bottom-4 text-[10px] font-mono text-onyx-500">2K</div>

                {/* Column 1 */}
                <div className="flex items-end space-x-2 pl-6">
                  <div className="w-4 sm:w-6 h-20 rounded-full bg-shadow-void-800" />
                  <div className="w-4 sm:w-6 h-28 rounded-full bg-gradient-to-t from-purple-700 to-shadow-purple-neon" />
                </div>

                {/* Column 2 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-16 rounded-full bg-shadow-void-800" />
                  <div className="w-4 sm:w-6 h-36 rounded-full bg-gradient-to-t from-purple-700 to-shadow-purple-neon" />
                </div>

                {/* Column 3 - With Floating Metric Badge */}
                <div className="relative flex items-end space-x-2">
                  {/* Floating Pill Tag */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-shadow-void-950 border border-shadow-purple-neon/50 text-[10px] font-mono text-shadow-purple-neon font-bold shadow-neon-purple whitespace-nowrap z-10 flex flex-col items-center">
                    <span>100% Zero-Trace</span>
                    <span className="text-[9px] text-cyan-neon font-normal">0-Leakage Solvency</span>
                  </div>
                  <div className="w-4 sm:w-6 h-24 rounded-full bg-shadow-void-800" />
                  <div className="w-4 sm:w-6 h-44 rounded-full bg-gradient-to-t from-purple-600 to-cyan-neon shadow-neon-purple" />
                </div>

                {/* Column 4 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-32 rounded-full bg-shadow-void-800" />
                  <div className="w-4 sm:w-6 h-38 rounded-full bg-gradient-to-t from-purple-700 to-shadow-purple-neon" />
                </div>

                {/* Column 5 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-28 rounded-full bg-shadow-void-800" />
                  <div className="w-4 sm:w-6 h-40 rounded-full bg-gradient-to-t from-purple-700 to-shadow-purple-neon" />
                </div>

              </div>

              {/* Bottom stats row */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-onyx-400">
                <span>Vault Active: <strong className="text-white" suppressHydrationWarning>{formatNumber(vaultBalance)} tDUST</strong></span>
                <span className="text-shadow-purple-neon font-bold">100% Shielded</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. BENTO GRID SHOWCASE CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento 1: Growth with New Series (Top Left) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-6 border border-white/10">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white font-display">
              Efficiency with <br />
              <span className="text-gradient-purple font-normal">Compact ZK Circuit,</span>
            </h4>
            <p className="text-xs text-onyx-400 font-light">
              High-throughput recursive proof verification ensures gas-optimal payroll batching.
            </p>
          </div>

          {/* Mini Bar Chart with Apr Indicator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-end justify-between h-20 px-2 border-b border-white/5 pb-2">
              <div className="text-center">
                <div className="w-4 h-8 rounded-full bg-shadow-void-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Feb</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-12 rounded-full bg-shadow-void-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Mar</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-16 rounded-full bg-gradient-to-t from-purple-600 to-shadow-purple-neon mx-auto shadow-neon-purple" />
                <div className="text-[10px] text-shadow-purple-neon font-mono font-bold mt-1">Apr</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-10 rounded-full bg-shadow-void-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">May</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-14 rounded-full bg-shadow-void-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Jun</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-shadow-purple-neon font-bold text-[11px]">
                +24% Prover Speed
              </span>
              <span className="text-onyx-400">Halo2 Prover</span>
            </div>
          </div>
        </div>

        {/* Bento 2: Join The Ecosystem 3D Orbit (Top Center) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-6 border border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-shadow-void-900 border border-white/10 text-[10px] font-mono text-onyx-400">
              <span className="text-shadow-purple-neon">●</span>
              <span>Midnight Enclave</span>
            </div>
            <h4 className="text-lg font-semibold text-white font-display">Zero Surveillance</h4>
            <p className="text-xs text-onyx-400 font-light">
              Disburse payments across multiple team wallets without exposing balances or transaction ties.
            </p>
          </div>

          {/* 3D Orbit Graphics */}
          <div className="relative h-28 flex items-center justify-center overflow-hidden">
            {/* Glowing Center Sphere */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-neon-purple animate-pulse-glow" />
            
            {/* Orbital Rings */}
            <div className="absolute w-28 h-12 border border-shadow-purple-neon/30 rounded-full transform -rotate-12 animate-float-orb" />
            <div className="absolute w-36 h-16 border border-cyan-400/25 rounded-full transform rotate-45" />
          </div>
        </div>

        {/* Bento 3: DeFi App Pro+ Status Card (Top Right) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-shadow-void-900 border border-white/10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-shadow-purple-neon" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                ZK ENCLAVE ENGINE
              </span>
            </div>
            <span className="text-[10px] font-mono text-shadow-purple-neon px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 font-semibold">
              ACTIVE
            </span>
          </div>

          {/* Shielded Address Checklist */}
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center space-x-2 p-2 rounded-xl bg-shadow-void-950/80 border border-white/5 text-onyx-300">
              <Check className="w-3.5 h-3.5 text-shadow-purple-neon flex-shrink-0" />
              <span className="truncate">0X036547UTY42FF780XX00</span>
            </div>

            <div className="flex items-center space-x-2 p-2 rounded-xl bg-shadow-void-950/80 border border-white/5 text-onyx-300">
              <Check className="w-3.5 h-3.5 text-shadow-purple-neon flex-shrink-0" />
              <span className="truncate">0X09603T6565FMY9D7ZXX009</span>
            </div>

            <div className="flex items-center space-x-2 p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-shadow-purple-neon">
              <span className="w-2 h-2 rounded-full bg-shadow-purple-neon animate-ping flex-shrink-0" />
              <span>SYNTHESIZING WITNESS PROOF...</span>
            </div>
          </div>
        </div>

        {/* Bento 4: VeilPay Obsidian Cards (Bottom Left / 6 cols) */}
        <div className="md:col-span-6 luxury-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden border border-white/10">
          <div className="space-y-3 max-w-xs">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-shadow-void-900 border border-white/10 text-[10px] font-mono text-onyx-400">
              <span className="text-shadow-purple-neon">✦</span>
              <span>Obsidian Shield</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-semibold text-white font-display">
              VeilPay Enclave Cards
            </h4>
            <p className="text-xs text-onyx-400 font-light leading-relaxed">
              Cryptographically shielded account primitives backed by Midnight Network Zero-Knowledge Proof architecture.
            </p>
          </div>

          {/* Stacked Obsidian Cards in Perspective */}
          <div className="relative w-48 h-32 stealth-card-stack flex-shrink-0">
            {/* Card 1 (Back) */}
            <div className="absolute top-0 right-4 w-36 h-24 rounded-xl stealth-card-item opacity-40 transform rotate-12" />
            {/* Card 2 (Middle) */}
            <div className="absolute top-2 right-2 w-36 h-24 rounded-xl stealth-card-item opacity-70 transform rotate-6" />
            {/* Card 3 (Front) */}
            <div className="absolute top-4 right-0 w-36 h-24 rounded-xl stealth-card-item p-3 flex flex-col justify-between shadow-2xl border border-shadow-purple-neon/40">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-shadow-purple-neon font-bold">✦ VeilPay</span>
                <div className="w-3 h-2 rounded-sm bg-gradient-to-r from-purple-400 to-cyan-300" />
              </div>
              <div className="text-[10px] font-mono text-white tracking-widest">•••• 8492</div>
            </div>
          </div>
        </div>

        {/* Bento 5: Secure with 2 Factor / ZK Proofs (Bottom Right / 6 cols) */}
        <div className="md:col-span-6 luxury-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-shadow-void-900 border border-shadow-purple-neon/40 text-[10px] font-mono text-shadow-purple-neon">
              <span>• Cryptographic Solvency</span>
            </div>
            <span className="text-xs font-mono text-onyx-400">Halo2 / PLONK</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-semibold text-white font-display">
              Zero-Knowledge Solvency
            </h4>
            <p className="text-xs text-onyx-400 font-light leading-relaxed max-w-md">
              Mathematically proves that the payout batch does not exceed treasury backing without disclosing individual compensation values.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-shadow-void-950 border border-white/5">
              <div className="text-[10px] text-onyx-400 uppercase font-mono">Proof Verification</div>
              <div className="text-sm font-bold font-mono text-shadow-purple-neon mt-0.5">100% Private</div>
            </div>
            <div className="p-3 rounded-2xl bg-shadow-void-950 border border-white/5">
              <div className="text-[10px] text-onyx-400 uppercase font-mono">Prover Latency</div>
              <div className="text-sm font-bold font-mono text-cyan-neon mt-0.5">1.24s Real-Time</div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
