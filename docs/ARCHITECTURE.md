# VeilPay Protocol Architecture

## Abstract
VeilPay is a production-grade, Level-3/4 compliant zero-knowledge confidential payroll and revenue-split protocol engineered on Midnight Network.

### Core Pillars
1. **Isolated Witness Vectors**: Individual recipient compensation values are encapsulated within private ZK witnesses.
2. **Pedersen & Poseidon Merkle Commitments**: Solvency is proven mathematically over encrypted commitments without revealing allocations.
3. **Halo2/PLONK Proof Circuit**: Client-side proving with recursive verification on Midnight Preprod ledger.
