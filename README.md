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
  - [SOL balance](#get-sol-balance---single-owner)
  - [Token balance](#get-token-balance---single-owner)
  - [All balances](#get-all-balances---multiple-owners)
  - [Create order](#create-order)
  - [Replenish order](#replenish-order)
  - [Transfers](#transfers)
    - From ZOW => Beneficiary (incl. PDVs) - transient order
    - From PDV => Beneficiary (incl. PDVs) - multi asset swap
  - [Attest order](#attest-order)
    - Solana ZOW => Arbitrum Beneficiary
  - [Arbitrary](#any-arbitrary-instructions-requiring-zynk-signers)
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

#### Get SOL balance - single owner

```ts
import { GetBalanceRequest, Balance } from "@zynk/fastlane/src/stubs/base";

const balanceRequest: GetBalanceRequest = {
  of: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe", // can accept a address, a known signer key or a partnerId
};
const response: Balance = await fastlane.base.getBalance(balanceRequest);

console.log(response);
/*
  {
    "amount": "796549307",
    "uiAmount": "0.796549307",
    "of": "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
    "address": "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
    "asset": {
      "symbol": "SOL"
    }
  }
*/
```

#### Get token balance - single owner

```ts
import { GetBalanceRequest, Balance } from "@zynk/fastlane/src/stubs/base";

const balanceRequest: GetBalanceRequest = {
  of: "ZOW", // can accept a address, a known signer key or a partnerId
  token: fastlane.Token.USDC,
};
const response: Balance = await fastlane.base.getBalance(balanceRequest);

console.log(response);
/*
  {
    "amount": "2240191656579",
    "uiAmount": "2240191.656579",
    "of": "ZOW",
    "address": "GbNjfHHBLFn3epGUwKQacbTD4YBqAMLNHHtKRNATHaep",
    "asset": {
      "symbol": "USDC",
      "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "token": 0
    }
  }
*/
```

#### Get all balances - multiple owners

```ts
import { GetBalancesRequest, Balances } from "@zynk/fastlane/src/stubs/base";

const balanceRequest: GetBalancesRequest = {
  // can accept addresses, known signers and partnerIds
  of: [
    "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
    "manager",
    "ZOW",
    "zp_test",
  ],
  // token?: fastlane.Token.USDC, // (optional) - to fetch specific token balance
};
const response: Balances = await fastlane.base.getBalances(balanceRequest);

console.log(response);
/*
  {
    "data": [
      {
        "of": "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
        "address": "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
        "balances": {
          "SOL": {
            "amount": "789977208",
            "uiAmount": "0.789977208",
            "asset": {
              "symbol": "SOL"
            }
          },
          "USDC": {
            "amount": "1090000",
            "uiAmount": "1.09",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          }
        }
      },
      {
        "of": "manager",
        "address": "CRYpBZS8fFHBMTmypUoxXWdiQ8jVcnEVukGzNvuzRUeb",
        "balances": {
          "SOL": {
            "amount": "5841605467",
            "uiAmount": "5.841605467",
            "asset": {
              "symbol": "SOL"
            }
          },
          "USDC": {
            "amount": "1",
            "uiAmount": "0.000001",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          },
          "USDT": {
            "amount": "1",
            "uiAmount": "0.000001",
            "asset": {
              "symbol": "USDT",
              "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "token": 1
            }
          }
        }
      },
      {
        "of": "ZOW",
        "address": "GbNjfHHBLFn3epGUwKQacbTD4YBqAMLNHHtKRNATHaep",
        "balances": {
          "SOL": {
            "amount": "793779867",
            "uiAmount": "0.793779867",
            "asset": {
              "symbol": "SOL"
            }
          },
          "ZYNKC": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "ZYNKC",
              "address": "ZynKrfVV84zpF8HfAV12kV2uP51sFrT1T1b8LwrgU14"
            }
          },
          "USD1": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "USD1",
              "address": "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
              "token": 3
            }
          },
          "USDC": {
            "amount": "2253368363029",
            "uiAmount": "2253368.363029",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          },
          "USDT": {
            "amount": "20512966",
            "uiAmount": "20.512966",
            "asset": {
              "symbol": "USDT",
              "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "token": 1
            }
          },
          "RLUSD": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "RLUSD",
              "address": "FMHpvrXeNPZieGVQTELkvVPRZRXMNgpMoSSW8wBc2v31",
              "token": 4
            }
          },
          "PYUSD": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "PYUSD",
              "address": "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
              "token": 2
            }
          }
        }
      },
      {
        "of": "zp_test",
        "address": "8fvKErmG7Yk63rfjHH7yTri8sAwxV8HkpXctj4kn3CUT",
        "balances": {
          "SOL": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "SOL"
            }
          }
        }
      }
    ]
  }
*/
```

#### Create order

```ts
import { CreateOrderRequest, TxResponse } from "@zynk/fastlane/src/stubs/core";

const createOrderRequest: CreateOrderRequest = {
  request_id: "ord-abc-123456",
  partner_id: "partner-789",
  beneficiary: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
  token: fastlane.Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  pull: true, // for pull and create orders
  meta: [],
};

const response: TxResponse =
  await fastlane.core.createOrder(createOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Replenish order

```ts
import { ReplenishRequest, TxResponse } from "@zynk/fastlane/src/stubs/core";

const replenishRequest: ReplenishRequest = {
  request_id: "rep-abc-123456",
  orderTracker: "ADdhAjpvjrDWLDQfXvouCxYcsZAmKwNaHcC3iD1vUghD",
  token: fastlane.Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  doNotClose: true, // to keep the order open (even if it's closable)
  meta: [],
};

const response: TxResponse = await fastlane.core.replenish(replenishRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Transfers

##### From ZOW => Beneficiary (incl. PDVs) - transient order

```ts
import {
  BuildEd25519IxRequest,
  Ed25519Pair,
} from "@zynk/fastlane/src/stubs/base";
import {
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane/src/stubs/core";

const from = "ZOW";
const to = "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe";

const dsResult: DomainSeparatorResponse = await fastlane.core.domainSeparator(
  {},
);
const pdvResult: PdvResponse = await fastlane.core.getPdv({}); // empty arg - this transaction is supposed to use an auto-generated partner internally

const ed25519Request: BuildEd25519IxRequest = {
  message: `${dsResult.domainSeparator}::${to}::${pdvResult.pdv}`,
  signer: "manager",
};

const ed25519Pair: Ed25519Pair =
  await fastlane.base.buildEd25519Ix(ed25519Request);

const transferRequest = {
  requestId: "trans-abc-123456",
  from,
  to,
  token: fastlane.Token.USDC,
  amount: "1000000",
  ed25519Pair,
  meta: [],
};

const response: TxResponse = await fastlane.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

##### From PDV => Beneficiary (incl. PDVs) - multi asset swap

```ts
import {
  BuildEd25519IxRequest,
  Ed25519Pair,
} from "@zynk/fastlane/src/stubs/base";
import {
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane/src/stubs/core";

const from = "partner-1";
const to = "partner-2"; // can accept partnerId or any bs58 address

const dsResult: DomainSeparatorResponse = await fastlane.core.domainSeparator(
  {},
);
const pdvFromResult: PdvResponse = await fastlane.core.getPdv({
  partnerId: from,
});
const pdvToResult: PdvResponse = await fastlane.core.getPdv({ partnerId: to });

const ed25519Request: BuildEd25519IxRequest = {
  message: `${dsResult.domainSeparator}::${pdvToResult.pdv}::${pdvFromResult.pdv}`,
  signer: "manager",
};

const ed25519Pair: Ed25519Pair =
  await fastlane.base.buildEd25519Ix(ed25519Request);

const transferRequest = {
  requestId: "trans-multi-123456",
  from,
  to,
  token: fastlane.Token.USDC,
  toToken: fastlane.Token.USDT,
  amount: "1000000",
  ed25519Pair,
  meta: [],
};

const response: TxResponse = await fastlane.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Attest order

##### Solana ZOW => Arbitrum Beneficiary

```ts
import {
  BuildEd25519IxRequest,
  Ed25519Pair,
} from "@zynk/fastlane/src/stubs/base";
import {
  AttestOrderRequest,
  TxResponse,
  DomainSeparatorResponse,
} from "@zynk/fastlane/src/stubs/core";


const origin = "<SOLANA_ZOW>
const proxy = "<ARB_ZOW>
const target = "<ARB_BENEFICIARY>
const txn = "tx_1ejkj3o333........"
const amount = "2000000"

const dsResult: DomainSeparatorResponse = await fastlane.core.domainSeparator(
  {},
);
const ed25519Request: BuildEd25519IxRequest = {
  message: `${dsResult.domainSeparator}::${origin}::${proxy}::${target}::${txn}::${amount}`,
  signer: "manager",
};

const ed25519Pair: Ed25519Pair =
  await fastlane.base.buildEd25519Ix(ed25519Request);

const attestOrderRequest: AttestOrderRequest = {
  orderId: "sol-arb-12345",
  originChain: "Solana",
  targetChain: "Arbitrum",
  origin,
  proxy,
  target,
  txn,
  asset: fastlane.Token.USDC,
  amount,
  ed25519Pair,
  proxyTxn: "<CCTP_Sig>", // Bridge transaction hash/signature (if applicable)
  proxyAsset: fastlane.Token.USDT, // asset used during bridging (if different)
  meta: [],
};

const response: TxResponse = await fastlane.core.attestOrder(attestOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
```

#### Any arbitrary instructions requiring Zynk signers

```ts
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ExecuteTxRequest,
  ExecuteTxResponse,
} from "@zynk/fastlane/src/stubs/base";

const transferIx = SystemProgram.transfer({
  fromPubkey: new PublicKey("3r7r8dgdcnd8U3HNXxGvS81JXZntJWNk1pJKrN2JiuDR"), // Solana Devnet ZOW
  toPubkey: new PublicKey("Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe"),
  lamports: 1_000_000, // 0.001 SOL
});

const ex_request: ExecuteTxRequest = {
  requestId: "execute-tx-1",
  ixs: [transferIx],
  signers: ["ZOW"],
};

const response: ExecuteTxResponse = await fastlane.base.executeIx(ex_request);

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
  await fastlane.base.executeTx(req);
} catch (err: any) {
  if (err.code === Code.InvalidArgument) {
    console.log("Bad request:", err.details);
  }
  if (err.code === Code.NotFound) {
    console.log("Resource not found");
  }
}
```
