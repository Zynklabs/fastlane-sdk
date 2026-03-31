import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import {
  BuildEd25519IxRequest,
  Ed25519Pair,
  DomainSeparatorResponse,
  PdvResponse,
  TxResponse,
} from "@zynk/fastlane";

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
  ed25519Pair: ed25519Pair as any,
  meta: [],
};

const response: TxResponse = await fastlane.core.transfer(transferRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
