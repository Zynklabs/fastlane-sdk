import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import {
  BuildEd25519IxRequest,
  Ed25519Pair,
  AttestOrderRequest,
  TxResponse,
  DomainSeparatorResponse,
} from "@zynk/fastlane";

const origin = "<SOLANA_ZOW>";
const proxy = "<ARB_ZOW>";
const target = "<ARB_BENEFICIARY>";
const txn = "txn_1ejkj3o333........";
const amount = "2000000";

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
  ed25519Pair: ed25519Pair as any,
  proxyTxn: "<CCTP_Sig>", // Bridge transaction hash/signature (if applicable)
  proxyAsset: fastlane.Token.USDT, // asset used during bridging (if different)
  meta: [],
};

const response: TxResponse =
  await fastlane.core.attestOrder(attestOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
