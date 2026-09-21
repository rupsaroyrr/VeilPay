'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { FinTechShowcase } from '@/components/FinTechShowcase';
import { TreasuryPoolCard } from '@/components/TreasuryPoolCard';
import { DisbursementStudio } from '@/components/DisbursementStudio';
import { PrivacyRadar } from '@/components/PrivacyRadar';
import { CircuitVisualizer } from '@/components/CircuitVisualizer';
import { TransactionLog } from '@/components/TransactionLog';
import { ProofGenerationModal } from '@/components/ProofGenerationModal';
import { DepositModal } from '@/components/DepositModal';
import { RecipientRow, BatchRecord, ProofStep, TreasuryState } from '@/types';
import { PRESET_TEMPLATES } from '@/lib/presets';
import { stealthPayService, generateBytes32 } from '@/lib/midnight/stealth-service';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  Github, 
  ExternalLink, 
  Lock, 
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const initialPreset = PRESET_TEMPLATES[0];
  const initialPool = initialPreset.recipients.reduce((sum, r) => sum + r.amount, 0);

  const [recipients, setRecipients] = useState<RecipientRow[]>(
    initialPreset.recipients.map((r) => ({
      ...r,
      id: generateBytes32('id'),
      salt: generateBytes32('salt'),
    }))
  );
  const [poolAmount, setPoolAmount] = useState<number>(initialPool);
  const [batchMemo, setBatchMemo] = useState<string>(`${initialPreset.name} - Shadow Batch`);
  const [treasuryState, setTreasuryState] = useState<TreasuryState>(stealthPayService.getTreasuryState());
  const [history, setHistory] = useState<BatchRecord[]>(stealthPayService.getTransactionHistory());

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'studio' | 'radar' | 'circuit' | 'history'>('studio');

  // Modal States
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isProofComplete, setIsProofComplete] = useState(false);
  const [proofError, setProofError] = useState<string | undefined>(undefined);
  const [currentTxHash, setCurrentTxHash] = useState<string | undefined>(undefined);
  const [currentBatchId, setCurrentBatchId] = useState<string | undefined>(undefined);
  const [proofSteps, setProofSteps] = useState<ProofStep[]>([
    { id: 'witness_gen', label: 'Local Witness Construction', detail: 'Waiting to start...', status: 'pending' },
    { id: 'solvency_check', label: 'ZK Solvency Constraint Arithmetization', detail: 'Waiting...', status: 'pending' },
    { id: 'merkle_tree', label: 'Commitment Merkle Tree Synthesis', detail: 'Waiting...', status: 'pending' },
    { id: 'halo2_proving', label: 'Compact ZK-SNARK Proof Generation', detail: 'Waiting...', status: 'pending' },
    { id: 'wallet_sign', label: 'Lace DApp Signature & Authorization', detail: 'Waiting...', status: 'pending' },
    { id: 'broadcast', label: 'Midnight Preprod Testnet Ledger Broadcast', detail: 'Waiting...', status: 'pending' },
    { id: 'confirmed', label: 'Payroll Batch Confirmed On-Chain', detail: 'Waiting...', status: 'pending' },
  ]);

  const constraints = stealthPayService.getCircuitConstraints(recipients, poolAmount);

  const handleDeposit = (amount: number) => {
    const updated = stealthPayService.depositToTreasury(amount);
    setTreasuryState(updated);
  };

  const handleExecutePayout = async () => {
    setIsProofModalOpen(true);
    setIsProofComplete(false);
    setProofError(undefined);

    // Reset steps
    setProofSteps([
      { id: 'witness_gen', label: 'Local Witness Construction', detail: 'Generating private vectors...', status: 'pending' },
      { id: 'solvency_check', label: 'ZK Solvency Constraint Arithmetization', detail: 'Waiting...', status: 'pending' },
      { id: 'merkle_tree', label: 'Commitment Merkle Tree Synthesis', detail: 'Waiting...', status: 'pending' },
      { id: 'halo2_proving', label: 'Compact ZK-SNARK Proof Generation', detail: 'Waiting...', status: 'pending' },
      { id: 'wallet_sign', label: 'Lace DApp Signature & Authorization', detail: 'Waiting...', status: 'pending' },
      { id: 'broadcast', label: 'Midnight Preprod Testnet Ledger Broadcast', detail: 'Waiting...', status: 'pending' },
      { id: 'confirmed', label: 'Payroll Batch Confirmed On-Chain', detail: 'Waiting...', status: 'pending' },
    ]);

    try {
      const record = await stealthPayService.executeStealthPayout(
        recipients,
        poolAmount,
        batchMemo,
        (updatedStep) => {
          setProofSteps((prev) =>
            prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
          );
        }
      );

      setCurrentTxHash(record.txHash);
      setCurrentBatchId(record.batchId);
      setIsProofComplete(true);
      setTreasuryState(stealthPayService.getTreasuryState());
      setHistory(stealthPayService.getTransactionHistory());
    } catch (err: any) {
      setProofError(err?.message || 'Execution failed');
    }
  };

  const scrollToStudio = () => {
    setActiveTab('studio');
    const el = document.getElementById('studio-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCircuit = () => {
    setActiveTab('circuit');
    const el = document.getElementById('studio-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-shadow-void-950 text-white selection:bg-shadow-purple-neon selection:text-shadow-void-950 overflow-x-hidden">
      
      {/* Top Floating Glass Header */}
      <Header
        onOpenDeposit={() => setIsDepositOpen(true)}
        vaultBalance={treasuryState.vaultBalance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16">
        
        {/* Hero Enclave & Bento Cards */}
        <FinTechShowcase
          onLaunchStudio={scrollToStudio}
          onInspectCircuit={scrollToCircuit}
          vaultBalance={treasuryState.vaultBalance}
        />

        {/* Section Divider with Protocol Status */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-shadow-purple-neon animate-ping" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Midnight Compact ZK Protocol Studio
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-purple-300">
            Halo2 Solvency Enclave Engine
          </span>
        </div>

        {/* Treasury Vault & Solvency Bento Overview */}
        <div id="vault-overview">
          <TreasuryPoolCard
            treasury={treasuryState}
            onOpenDeposit={() => setIsDepositOpen(true)}
          />
        </div>

        {/* Navigation Tabs Bar for Quick Switch */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                : 'bg-shadow-void-900 text-onyx-400 border border-white/5 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>1. Shadow Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'radar'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                : 'bg-shadow-void-900 text-onyx-400 border border-white/5 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>2. Privacy Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('circuit')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'circuit'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                : 'bg-shadow-void-900 text-onyx-400 border border-white/5 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. ZK Circuit Inspector</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                : 'bg-shadow-void-900 text-onyx-400 border border-white/5 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Ledger History ({history.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div id="studio-section" className="space-y-8">
          {activeTab === 'studio' && (
            <div className="space-y-8 animate-fade-in">
              <DisbursementStudio
                recipients={recipients}
                setRecipients={setRecipients}
                poolAmount={poolAmount}
                setPoolAmount={setPoolAmount}
                batchMemo={batchMemo}
                setBatchMemo={setBatchMemo}
                onExecute={handleExecutePayout}
                vaultBalance={treasuryState.vaultBalance}
              />

              {/* Privacy Radar Live Inspection */}
              <PrivacyRadar
                recipients={recipients}
                poolAmount={poolAmount}
                batchMemo={batchMemo}
              />
            </div>
          )}

          {activeTab === 'radar' && (
            <div className="animate-fade-in">
              <PrivacyRadar
                recipients={recipients}
                poolAmount={poolAmount}
                batchMemo={batchMemo}
              />
            </div>
          )}

          {activeTab === 'circuit' && (
            <div className="animate-fade-in">
              <CircuitVisualizer constraints={constraints} />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-fade-in">
              <TransactionLog history={history} />
            </div>
          )}
        </div>

      </main>

      {/* Luxury Dark Footer */}
      <footer className="border-t border-white/5 bg-shadow-void-950/90 backdrop-blur-md py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-onyx-400">
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <span className="text-shadow-purple-neon text-sm font-bold">✦</span>
              <span className="text-white font-bold">VeilPay Protocol</span>
            </div>
            <span className="hidden sm:inline text-onyx-600">—</span>
            <span>Confidential Split & Payroll on Midnight Network</span>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap justify-center">
            <a
              href="https://github.com/rupsaroyrr/VeilPay"
              target="_blank"
              rel="noreferrer"
              className="hover:text-shadow-purple-neon flex items-center space-x-1.5 transition text-onyx-300"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <span className="text-onyx-700">|</span>

            <a
              href="https://midnight.network"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-neon flex items-center space-x-1.5 transition text-onyx-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Midnight Docs</span>
            </a>

            <span className="text-onyx-700">|</span>

            <span className="text-shadow-purple-neon px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-semibold">
              Level 4 Ready
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDeposit={handleDeposit}
        currentBalance={treasuryState.vaultBalance}
      />

      <ProofGenerationModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        steps={proofSteps}
        isComplete={isProofComplete}
        error={proofError}
        txHash={currentTxHash}
        batchId={currentBatchId}
        poolAmount={poolAmount}
        recipientCount={recipients.length}
      />

    </div>
  );
}
