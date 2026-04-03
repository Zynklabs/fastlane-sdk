# Fastlane SDK

TypeScript gRPC client for for interacting with the **Fastlane gRPC service**.

Built with [nice-grpc](https://github.com/deeplay-io/nice-grpc) — modern, type-safe, promise-based gRPC.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [SDK Structure](#sdk-structure)
- [Supported Tokens](#supported-tokens)
- [Available Signers](#available-signers)
- [Usage Examples](#usage-examples)
- [Protobuf Reference](#protobuf-reference)
- [Development](#development)
- [Error Handling](#error-handling)

---

### Features

- Promise-based API (no callbacks)
- Full TypeScript types from protobuf definitions
- Ed25519 verifiable instruction support
- Metadata & request tracking across order lifecycle
<!-- - Clean error handling with gRPC status codes -->

### Installation

```bash
# Installation from git repo
npm i git@github.com:Zynklabs/fastlane-sdk.git

# Regenerate protobuf TS types (if .proto files change)
npm run proto:gen
```

### Getting Started

Import and instantiate the SDK using your gRPC endpoint:

```js
import Fastlane from "@zynk/fastlane";

const fastlane = Fastlane(<endpoint>);
```

The returned object exposes these primary namespaces:

- fastlane.base: for general blockchain operations, token management, and transaction utilities.
- fastlane.core: for zynk-core operations like creating orders, replenishing orders, closing order and one-time transfers (transient orders), along with other peripherals.
- fastlane.orbit: for zynk-orbit operations like pulling funds from LPs, transferring funds from fiat user PDA to wallets, enabling yield and principal withdrawals.
- fastlane.kamino: for kamino operations like borrowing funds, repaying funds, depositing collateral and withdrawing collateral, along with other peripherals.

### Quick Start

```js
import Fastlane from "@zynk/fastlane";

const fastlane = Fastlane(<endpoint>);

try {
    const status = await fastlane.base.getTxStatus({
        signature: "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
    });
    const txCost = await fastlane.base.getTxCost({
        signature: "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
        denom: fastlane.Denom.SOL
    });

    console.log("Status  :", status.status);
    console.log("Tx cost :", txCost);
} catch (err) {
    console.error("Error:", err.code, err.message, err.details);
}
```

### SDK Structure

```
Fastlane(<endpoint>)
├─ core
│   ├─ domainSeparator()
│   ├─ getPdv()
│   ├─ generateOrderId()
│   ├─ deriveOrderTracker()
│   ├─ readOrderTrackerByAddress()
│   ├─ readOrderTrackerByIds()
│   ├─ createOrder()
│   ├─ replenish()
│   ├─ transfer()
│   ├─ attestOrder()
│   └─ decodeEvent()
├─ orbit
│   ├─ domainSeparator()
│   ├─ getUserPda()
│   ├─ pullFromLp()
│   ├─ transferToLp()
│   └─ transferFromPdaToWallet()
├─ kamino
│   ├─ refreshStats()
│   ├─ getStats()
│   ├─ getBorrowCapacity()
│   ├─ getCumulativeBorrowRate()
│   ├─ estimateYield()
│   ├─ borrow()
│   ├─ repay()
│   ├─ withdraw()
│   ├─ deposit()
│   └─ depositCollateral()
└─ base
    ├─ generateHashedArray()
    ├─ buildEd25519Ix()
    ├─ getBalance()
    ├─ getBalances()
    ├─ getAddress()
    ├─ getAccountInfo()
    ├─ getOwner()
    ├─ getTokenAccountOwner()
    ├─ getAtaAddress()
    ├─ getOrCreateAta()
    ├─ executeTx()
    ├─ getTxStatus()
    ├─ getTxDetails()
    └─ getTxCost()
```

### Supported Tokens

```proto
enum Token {
  USDC  = 0;
  USDT  = 1;
  PYUSD = 2;
  USD1  = 3;
  RLUSD = 4;
}

enum Denom {
  LAMPORTS = 0;
  SOL      = 1;
}
```

### Available Signers

```ts
type KmsSignerKey =
  | "ZOW"
  | "MANAGER"
  | "ZOW_PREPROD" // Available only for Preprod
  | "MANAGER_PREPROD" // Available only for Preprod
  | "ORBIT"
  | "GSW"
  | "KAMINO"
  | "PPAMA"; // PARTNER_PAYMENTS_ACCOUNT_MINT_AUTHORITY
```

### Usage Examples

- [Get address](./examples/address.ts)
- [Get SOL balance - single owner](./examples/solBalance__singleOwner.ts)
- [Get token balance - single owner](./examples/tokenBalance__singleOwner.ts)
- [Get all balances - multiple owners](./examples/allBalances__multiOwners.ts)
- [Create order](./examples/core/createOrder.ts)
- [Replenish order](./examples/core/replenishOrder.ts)
- [Transfer - ZOW => Beneficiary (incl. PDVs) - transient order](./examples/core/transfers/zowToBeneficiary__transient.ts)
- [Transfer - PDV => Beneficiary (incl. PDVs) - multi asset swapr](./examples/core/transfers/pdvToBeneficiary__multiAsset.ts)
- [Attest order - Solana ZOW => Arbitrum Beneficiary](./examples/attestations/zowToBeneficiary.ts)
- [Arbitrary transaction/instructions requiring Zynk signers](./examples/arbitrary.ts)
- [Get tx details](./examples/txDetails.ts)

## Protobuf Reference

The SDK is based on the following proto services:

- Base Service ([proto/base.proto](./proto/base.proto)): Account utilities, token account management, transaction execution, and status queries.
- Core Service ([proto/core.proto](./proto/core.proto)): Orders management, replenishment, transfers, and attestation.
- Orbit Service ([proto/orbit.proto](./proto/orbit.proto)): LP funds management and yield/principal disbursals
- Kamino Service ([proto/kamino.proto](./proto/kamino.proto)): Kamino borrows, repayments, deposits and withdrawals.

## Development

```bash
# Install
npm install

# Regenerate protobuf TS types (if .proto files change)
npm run proto:gen
```
