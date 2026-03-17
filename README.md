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
  - [Creating order](#creating-order)
  - [Replenishing order](#replenishing-order)
  - [Transfer from ZOW](#transfer-from-zow)
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

const sdk = Fastlane(<endpoint>);
```

The returned object exposes these primary namespaces:

- sdk.base: for general blockchain operations, token management, and transaction utilities.
- sdk.core: for zynk-core operations like creating orders, replenishing orders, closing order and one-time transfers (transient orders), along with other peripherals.
- sdk.orbit: for zynk-orbit operations like pulling funds from LPs, transferring funds from fiat user PDA to wallets, enabling yield and principal withdrawals.
- sdk.kamino: for kamino operations like borrowing funds, repaying funds, depositing collateral and withdrawing collateral, along with other peripherals.

### Quick Start

```js
import Fastlane from "@zynk/fastlane";

const sdk = Fastlane(<endpoint>);

try {
    const status = await sdk.base.getTxStatus({
        signature: "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
    });

    console.log("Status :", status.status);
    console.log("Slot   :", status.slot);
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
│   ├─ createOrder()
│   ├─ replenish()
│   ├─ transfer()
│   └─ attestOrder()
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

#### Creating order

```ts
import { Token } from "@zynk/fastlane/sdk/stubs/base";
import { CreateOrderRequest, TxResponse } from "@zynk/fastlane/sdk/stubs/core";

const createOrderRequest: CreateOrderRequest = {
  request_id: "ord-abc-123456",
  partner_id: "partner-789",
  beneficiary: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
  token: Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  pull: true, // for pull and create orders
  meta: [],
};

const response: TxResponse = await sdk.core.createOrder(createOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Replenishing order

```ts
import { Token } from "@zynk/fastlane/sdk/stubs/base";
import { ReplenishRequest, TxResponse } from "@zynk/fastlane/sdk/stubs/core";

const replenishRequest: ReplenishRequest = {
  request_id: "rep-abc-123456",
  orderTracker: "ADdhAjpvjrDWLDQfXvouCxYcsZAmKwNaHcC3iD1vUghD",
  token: Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  doNotClose: true, // to keep the order open (even if it's closable)
  meta: [],
};

const response: TxResponse = await sdk.core.replenish(replenishRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Transfer from ZOW => Beneficiary (incl. PDVs) - transient order

```ts
import {
  BuildEd25519IxRequest,
  Ed25519Pair,
  Token,
} from "@zynk/fastlane/sdk/stubs/base";
import {
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane/sdk/stubs/core";

const from = "ZOW";
const to = "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe";

const dsResult: DomainSeparatorResponse = await sdk.core.domainSeparator({});
const pdvResult: PdvResponse = await sdk.core.getPdv({}); // empty arg - this transaction is supposed to use an auto-generated partner internally

const ed25519Request: BuildEd25519IxRequest = {
  message: `${dsResult.domainSeparator}::${to}::${pdvResult.pdv}`,
  signer: "manager",
};

const ed25519Pair: Ed25519Pair = await sdk.base.buildEd25519Ix(ed25519Request);

const transferRequest = {
  requestId: "trans-abc-123456",
  from,
  to,
  token: Token.USDC,
  amount: "1000000",
  ed25519Pair,
  meta: [],
};

const response: TxResponse = await sdk.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Transfer from PDV => Beneficiary (incl. PDVs) - multi asset swap

```ts
import {
  BuildEd25519IxRequest,
  Ed25519Pair,
  Token,
} from "@zynk/fastlane/sdk/stubs/base";
import {
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane/sdk/stubs/core";

const from = "partner-1";
const to = "partner-2"; // can accept partnerId or any bs58 address

const dsResult: DomainSeparatorResponse = await sdk.core.domainSeparator({});
const pdvFromResult: PdvResponse = await sdk.core.getPdv({ partnerId: from });
const pdvToResult: PdvResponse = await sdk.core.getPdv({ partnerId: to });

const ed25519Request: BuildEd25519IxRequest = {
  message: `${dsResult.domainSeparator}::${pdvToResult.pdv}::${pdvFromResult.pdv}`,
  signer: "manager",
};

const ed25519Pair: Ed25519Pair = await sdk.base.buildEd25519Ix(ed25519Request);

const transferRequest = {
  requestId: "trans-multi-123456",
  from,
  to,
  token: Token.USDC,
  token: Token.USDT,
  amount: "1000000",
  ed25519Pair,
  meta: [],
};

const response: TxResponse = await sdk.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Attest Order - Solana ZOW => Arbitrum Beneficiary

```ts
import { Token } from "@zynk/fastlane/sdk/stubs/base";
import { AttestOrderRequest, TxResponse } from "@zynk/fastlane/sdk/stubs/core";

const attestOrderRequest: AttestOrderRequest = {
  orderId: "sol-arb-12345";
  originChain: "Solana";
  targetChain: "Arbitrum";
  origin: "<SOLANA_ZOW>";
  proxy: "<ARB_ZOW>";
  target: "<ARB_Beneficiary>";
  txn: "0x821y03n12u294324......";
  asset: Token.USDC;
  amount: "2000000";
  proxyTxn: "<CCTP_Sig>"; // Bridge transaction hash/signature (if applicable)
  proxyAsset: Token.USDT; // asset used during bridging (if different)
  meta: []
};

const response: TxResponse = await sdk.core.attestOrder(attestOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Any arbitrary instructions requiring Zynk signers

```ts
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  ExecuteTxRequest,
  ExecuteTxResponse,
} from "@zynk/fastlane/sdk/stubs/base";

const transferIx = SystemProgram.transfer({
  fromPubkey: new PublicKey("3r7r8dgdcnd8U3HNXxGvS81JXZntJWNk1pJKrN2JiuDR"), // Solana Devnet ZOW
  toPubkey: new PublicKey("Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe"),
  lamports: 1_000_000, // 0.001 SOL
});

export const TransactionInstructionToTxIx = (ix: TransactionInstruction) => ({
  programId: ix.programId.toBase58(),
  data: new Uint8Array(ix.data),
  keys: ix.keys.map((k) => ({
    ...k,
    pubkey: k.pubkey.toBase58(),
  })),
});

const ex_request: ExecuteTxRequest = {
  requestId: "execute-tx-1",
  ixs: [TransactionInstructionToTxIx(transferIx)],
  signers: ["ZOW"],
};

const response: ExecuteTxResponse = await sdk.base.executeIx(ex_request);

console.log("Order tracker:", response.requestId);
console.log("Tx signature :", response.signature);
```

## Protobuf Reference

The SDK is based on the following proto services:

- Base Service ([proto/base.proto](./proto/base.proto)): Account utilities, token account management, transaction execution, and status queries.
- Core Service ([proto/core.proto](./proto/core.proto)): Orders management, replenishment, transfers, and attestation.
- Kamino Service ([proto/kamino.proto](./proto/kamino.proto)): Kamino borrows, repayments, deposits and withdrawals.

## Development

```bash
# Install
npm install

# Regenerate protobuf TS types (if .proto files change)
npm run proto:gen
```

## Error Handling

```ts
import { Code } from "nice-grpc";

try {
  await sdk.base.executeTx(req);
} catch (err: any) {
  if (err.code === Code.InvalidArgument) {
    console.log("Bad request:", err.details);
  }
  if (err.code === Code.NotFound) {
    console.log("Resource not found");
  }
}
```
