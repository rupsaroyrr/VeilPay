# Midnight Compact Smart Contract Interface

```compact
contract VeilPayProtocol {
  ledger vault_balance: Uint<64>;
  ledger settled_batches_count: Uint<32>;
  
  witness execute_stealth_batch(
    commitments: Vector<Bytes<32>, 8>,
    solvency_root: Bytes<32>,
    total_amount: Uint<64>
  ): Void;
}
```
