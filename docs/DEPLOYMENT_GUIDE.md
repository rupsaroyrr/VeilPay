# VeilPay Deployment & Integration Guide

## Deployment Overview & Status

| Target | Status | Notes |
|---|---|---|
| **Local Midnight Stack** | ✅ **Active & Verified** | Docker Node (`9944`), Indexer (`8088`), Proof Server (`6300`) with genesis pre-funded wallet. |
| **Midnight Preprod Testnet** | ⚠️ **Simulated / Placeholder** | Live deployment to public Preprod was failing due to network RPC timeouts, remote proof server drops, and testnet faucet limits. |

### Contract Reference
- **Contract Name**: `VeilPayProtocol` (`contracts/stealth_pay.compact`)
- **Preprod Reference ID**: `0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`
- **Proposal Document**: See [PROPOSAL.md](../PROPOSAL.md) for full architecture and Product Idea submission.

---

## 1. Running Locally (Quick Start)

### Prerequisites
- Node.js >= 18.0.0
- Docker Desktop (for running the Midnight local node, indexer, and proof server)
- Lace Wallet (optional; browser fallback simulator provided)

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Run unit & circuit verification tests
npm test

# 3. Launch the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the VeilPay disbursement studio.

---

## 2. Local Midnight Docker Stack Deployment

To deploy against the local self-contained Midnight stack:
```bash
cd preprod-deployment
./setup.sh
npm run deploy -- --network local
```

This starts the local node, indexer, and proof server via Docker, compiles the Compact circuit, and deploys using the local genesis wallet without requiring external testnet tokens or internet connectivity.
