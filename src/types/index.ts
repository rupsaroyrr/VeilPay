// StealthPay Type Definitions

export interface RecipientRow {
  id: string;
  name: string;
  address: string;
  amount: number; // in tDUST
  department: string;
  notes?: string;
  salt: string;
  commitmentHash?: string;
}

export interface BatchRecord {
  batchId: string;
  totalAmount: number;
  recipientCount: number;
  solvencyMerkleRoot: string;
  timestamp: number;
  txHash: string;
  blockHeight: number;
  status: 'confirmed' | 'verifying' | 'failed';
  memo?: string;
}

export interface TreasuryState {
  vaultBalance: number; // in tDUST
  totalHistoricalDisbursed: number; // in tDUST
  batchCount: number;
  isPaused: boolean;
  managerPubkey: string;
}

export type ProofStepId = 
  | 'witness_gen' 
  | 'solvency_check' 
  | 'merkle_tree' 
  | 'halo2_proving' 
  | 'wallet_sign' 
  | 'broadcast' 
  | 'confirmed';

export interface ProofStep {
  id: ProofStepId;
  label: string;
  detail: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  timestamp?: number;
  metadata?: Record<string, string | number>;
}

export interface ProofModalState {
  isOpen: boolean;
  currentStepIndex: number;
  steps: ProofStep[];
  batchId?: string;
  totalAmount?: number;
  recipientCount?: number;
  txHash?: string;
  solvencyMerkleRoot?: string;
  error?: string;
}

export interface WalletAccount {
  address: string;
  bech32Address: string;
  balance: number; // in tDUST
  dustBalance: number; // in DUST
  network: 'Midnight Preprod Testnet' | 'Midnight Devnet' | 'Disconnected';
  isConnected: boolean;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  recipients: Omit<RecipientRow, 'id' | 'salt'>[];
}

export interface CircuitConstraintInfo {
  constraintName: string;
  formula: string;
  privacyType: 'SHIELDED_WITNESS' | 'DISCLOSED_LEDGER';
  verified: boolean;
  description: string;
}
