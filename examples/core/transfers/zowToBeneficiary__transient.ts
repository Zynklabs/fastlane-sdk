import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import {
  BuildEd25519IxRequest,
  Ed25519Pair,
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane";

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
  ed25519Pair: ed25519Pair as any,
  meta: [],
};

const response: TxResponse = await fastlane.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
