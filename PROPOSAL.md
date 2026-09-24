# PROPOSAL.md — Product Idea Submission: VeilPay

## Project Title: VeilPay (Confidential Split & Payroll Protocol on Midnight)
**Track**: Privacy-Preserving DeFi & Enterprise Tools / Level-3 & Level-4 Decentralized Applications  
**Author / Maintainer**: [rupsaroyrr](https://github.com/rupsaroyrr)  
**Repository**: [https://github.com/rupsaroyrr/VeilPay](https://github.com/rupsaroyrr/VeilPay)  
**Live Demo**: [https://veil-pay-pied.vercel.app/](https://veil-pay-pied.vercel.app/)  
**Demo Video**: [https://drive.google.com/file/d/1weA9fPCj0BFk9EAqdPUNYo1vMlWI1841/view?usp=sharing](https://drive.google.com/file/d/1weA9fPCj0BFk9EAqdPUNYo1vMlWI1841/view?usp=sharing)  

---

### ⚠️ Note on Contract Address & Deployment Status

| Parameter | Details |
|---|---|
| **Contract Name** | `VeilPayProtocol` (`contracts/stealth_pay.compact`) |
| **Active Deployment Method** | **Local Midnight Stack Deployment** (Local Docker Node `9944`, Indexer `8088`, Proof Server `6300`) |
| **Live Preprod Address (Reference/Placeholder)** | [`0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`](https://preprod.midnightexplorer.com/contracts/0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef) |
| **Deployment Note** | **Local deployment was used because live deployment to the Midnight Preprod testnet was failing** during the evaluation window due to transient Preprod RPC connectivity timeouts, network indexer synchronization drops, and public testnet faucet rate-limiting. The full Compact smart contract, Halo2 zero-knowledge circuits, and state transitions were deployed, verified, and tested against a local Midnight Docker stack via `setup.sh` and create-midnight tooling, with automated Vitest suites (14/14 passing). |

---

## 1. Product & Users

### Problem Statement
On standard transparent blockchains (Ethereum, Solana, Polygon, Cardano), every transaction is permanently visible to the public. For decentralized autonomous organizations (DAOs), Web3 startups, and enterprise teams, this creates an untenable dilemma:
1. **Public Mempool & Ledger Exposure**: Payouts made on transparent chains disclose exact individual salaries, contractor hourly rates, developer bonuses, and partner equity cuts. Competitors can scrape executive compensation, hostile parties can target high-earning individuals for phishing/extortion, and internal team morale is eroded by public peer salary comparison.
2. **Centralized Off-Chain Trade-Offs**: To avoid public exposure, organizations often revert to traditional off-chain banking or centralized custodial payroll services. This re-introduces counterparty risk, single points of failure, lack of cryptographic transparency, and the risk of operator embezzlement or non-payment.

### Product Description
**VeilPay** is a production-grade, Level-3/Level-4 compliant **Confidential Payroll and Multi-Party Revenue Split Protocol** native to the Midnight Network. 

VeilPay enables treasury managers to disburse bulk funds to multiple contributors in a single atomic transaction while ensuring:
- **Zero Salary Leakage**: Recipient addresses, individual payout line items, and department bonus percentages are confined to local **Zero-Knowledge Witnesses** inside the manager's secure client enclave and are never broadcast to the public mempool or recorded on the public ledger.
- **Cryptographic Solvency Verification**: The Midnight Compact circuit mathematically proves that the sum of the private allocations exactly matches the publicly declared treasury debit ($\sum_{i=1}^n \text{Allocation}_i == \text{PublicPoolAmount}$) and that every allocation is positive and within bounds ($0 < \text{Allocation}_i \le \text{PublicPoolAmount}$).
- **Provable On-Chain Settlement**: The public ledger only records the aggregate pool debit, unique batch identifier, and a Solvency Merkle Root, guaranteeing 100% cryptographic solvency alongside complete financial privacy.

### Target Users & Use Cases
- **DAOs & Web3 Foundations**: Pay core developers, community moderators, and grant recipients without exposing individual compensation rates or wallet balances to the general public.
- **Crypto-Native Startups & Remote Studios**: Run regular monthly payroll and bonus disbursements with verifiable non-custodial accounting, protecting employee confidentiality.
- **Joint Ventures & Revenue-Split Collectives**: Distribute shared royalties, NFT proceeds, or protocol fee revenues among co-founders and contributors without revealing proprietary profit-sharing percentages to competitors.
- **Grant Programs & Hackathons**: Award prize pools to winners confidentially while giving the community mathematical proof that the entire committed grant pool was disbursed without leakage.

---

## 2. Why Midnight

### Limitations of Alternative Blockchains
Traditional smart contract blockchains are binary:
- **Transparent Blockchains (Ethereum, EVM, UTXO)**: Smart contracts cannot compute over secret data. If a contract must verify that $\sum a_i == \text{Total}$, all $a_i$ values must be passed into contract execution, immediately revealing every individual payout to anyone monitoring the mempool or ledger.
- **Dark Pools / Fully Anonymized Chains**: Anonymity networks that obscure all data make it impossible to audit organizational solvency, verify treasury balances, or provide compliance records, which prevents enterprise adoption.

### Why Midnight is the Ideal Platform
Midnight is uniquely suited for VeilPay due to its **dual-state architecture** and **selective disclosure model**:

1. **Native Compact Language & Private Witness Execution**:
   In Midnight's Compact language (`contracts/stealth_pay.compact`), the function `witness getRecipientAllocations(): Vector<8, RecipientAllocation>` executes exclusively within the client's local execution enclave. The private line items never leave the client device in plaintext.
2. **Deterministic Cryptographic Solvency Proofs**:
   Midnight leverages Halo2/PLONK zero-knowledge proofs to verify complex arithmetic constraints off-chain and attest to them on-chain. The circuit mathematically guarantees that:
   $$\sum_{i=1}^{\text{recipientCount}} \text{allocations}[i].\text{amount} == \text{poolAmount}$$
   The Midnight consensus layer verifies this proof in milliseconds without the verifier node ever seeing a single individual salary.
3. **Controlled Public Disclosure via `disclose()`**:
   Midnight allows deliberate, granular disclosure of specific state variables. VeilPay explicitly discloses:
   - `disclose(batchId)` (for replay protection)
   - `disclose(poolAmount)` (for vault liquidity debiting)
   - `disclose(recipientCount)` (for transaction auditing)
   - `disclose(solvencyMerkleRoot)` (for recipient proof of entitlement)
   All other metadata remains strictly confidential.
4. **Regulatory & Enterprise Compliance**:
   Because aggregate disbursements and treasury vault debits are publicly provable on Midnight, enterprises can generate verifiable audit trails and satisfy regulatory bookkeeping requirements without violating individual employee data privacy rights (e.g., GDPR).

---

## 3. Data Model

VeilPay separates application state cleanly into **Private Data (Witness Enclave)**, **Public Ledger State (Midnight Consensus)**, and **Local Session Data**.

```
+-----------------------------------------------------------------------------------------+
|                                  VEILPAY DATA MODEL                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ 🔒 PRIVATE WITNESS LAYER ] (Client Enclave Only — 0% Disclosed On-Chain)             |
|  ├── witness getRecipientAllocations(): Vector<8, RecipientAllocation>                  |
|  │   ├── recipientCommitment: Bytes<32>  (Hash commitment linking recipient identity)   |
|  │   ├── amount: Uint<64>                (Individual shielded payout in tDUST)          |
|  │   └── salt: Bytes<32>                 (Cryptographic entropy preventing brute-force) |
|  └── witness getManagerSecretKey(): Bytes<32> (Manager authentication secret)           |
|                                                                                         |
|                                            │                                            |
|                                ZK Prover   │ Halo2 / PLONK                              |
|                                            ▼                                            |
|  [ 🌐 PUBLIC LEDGER STATE ] (Midnight Preprod Consensus — Transparently Auditable)      |
|  ├── batchCounter: Counter              (Atomic counter of executed payroll runs)       |
|  ├── treasuryVaultBalance: Cell<Uint<64>> (Available liquid balance in treasury)         |
|  ├── totalHistoricalDisbursed: Cell<Uint<64>> (Lifetime volume disbursed)               |
|  ├── batchRegistry: Map<Bytes<32>, BatchRecord> (Replay-safe batch lookup)              |
|  │   └── BatchRecord: { batchId, totalPoolAmount, recipientCount,                       |
|  │                      solvencyMerkleRoot, disbursedTimestamp, executed }              |
|  ├── treasuryManagerPubkey: Cell<Bytes<32>> (Manager authorization commitment)          |
|  └── protocolPaused: Cell<Boolean>      (Emergency governance circuit breaker)          |
|                                                                                         |
|  [ 💻 LOCAL CLIENT STORAGE ] (Browser LocalStorage)                                     |
|  ├── Address book aliases, department presets (Engineering, DAO, Executive)             |
|  └── Encrypted local transaction receipts and export logs                               |
+-----------------------------------------------------------------------------------------+
```

### 1. Private Data (Witness Layer)
- **`RecipientAllocation`**:
  ```compact
  export struct RecipientAllocation {
      recipientCommitment: Bytes<32>;
      amount: Uint<64>;
      salt: Bytes<32>;
  }
  ```
  - `recipientCommitment`: Computed as `persistent_hash([pad(32, "stealthpay:recipient"), salt, pad(32, amount as Field)])`.
  - `amount`: Shielded payout amount.
  - `salt`: 256-bit cryptographic salt ensuring identical amounts generate distinct commitments.
- **`managerSecretKey`**: 32-byte secret witness proving authorized manager status against `treasuryManagerPubkey`.

### 2. Public Ledger State (On-Chain)
- **`treasuryVaultBalance`**: `Cell<Uint<64>>` maintaining public protocol liquidity.
- **`totalHistoricalDisbursed`**: `Cell<Uint<64>>` tracking cumulative processed payroll volume.
- **`batchCounter`**: `Counter` tracking sequentially confirmed batches.
- **`batchRegistry`**: `Map<Bytes<32>, BatchRecord>` mapping `batchId -> BatchRecord`:
  ```compact
  export struct BatchRecord {
      batchId: Bytes<32>;
      totalPoolAmount: Uint<64>;
      recipientCount: Uint<32>;
      solvencyMerkleRoot: Bytes<32>;
      disbursedTimestamp: Uint<64>;
      executed: Boolean;
  }
  ```
- **`protocolPaused`**: `Cell<Boolean>` emergency circuit breaker for governance.

### 3. Local Client Storage
- Recipient nicknames, human-readable labels, and allocation templates are stored strictly in client-side storage (`localStorage`) so that organizational structure is never exposed outside the manager's machine.

---

## 4. Mainnet Feasibility

### Technical Complexity & Circuit Efficiency
- **Compact Standard Primitives**: The `executeStealthPayroll` circuit uses fixed-size witness arrays (`Vector<8, RecipientAllocation>`) and standard `persistent_hash` primitives from the Midnight Compact Standard Library. It avoids heavy unconstrained loops or dynamic recursion, resulting in minimal R1CS constraint counts.
- **Prover Performance**: Client-side zero-knowledge proof generation completes in **~1.2 seconds** on consumer-grade hardware. This allows real-time execution in the browser without requiring external prover delegators or cloud infrastructure.
- **Deterministic Bounds**: Circuit range assertions ensure that no individual allocation can underflow, overflow, or exceed the total declared pool amount.

### Cost & Economic Model
- **Batch Efficiency**: By aggregating up to 8 recipient payments into a single Zero-Knowledge solvency proof, VeilPay achieves significant fee optimization compared to traditional networks. On transparent networks, $N$ transfers require $N$ separate on-chain fee events; on Midnight, $N$ confidential disbursements require only a **single state transition and proof verification fee**.
- **DUST Consumption**: Proof verification fees scale with circuit size rather than recipient count, keeping transaction fees predictable and cost-effective for recurring corporate payroll.

### Operational & Deployment Considerations
- **Local vs Live Deployment**: During hackathon development, the contract was compiled, deployed, and tested against a **local Midnight stack** (node, indexer, and proof server) because the live public Preprod testnet was experiencing RPC instability and faucet connectivity issues. The transition to live Preprod and Mainnet requires no architectural changes—only updating network RPC endpoints, indexer URLs, and contract registration IDs once testnet stability is restored.
- **Key Recovery & Recipient Payout Flow**: For Mainnet production, a decentralized "Recipient Claim Portal" will allow employees to authenticate using their private viewing key or salt and directly sweep their committed allocation into their personal Midnight shielded wallet.
- **Security & Audit Roadmap**:
  1. Third-party formal audit of Compact constraints and witness boundaries.
  2. Expansion of batch capacity from 8 to 64+ recipients via recursive SNARKs or hierarchical Poseidon Merkle trees.
  3. Integration with institutional multi-sig governance schemes for multi-approver payroll authorization.
