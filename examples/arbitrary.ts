import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { PublicKey, SystemProgram } from "@solana/web3.js";
import { ExecuteTxRequest, ExecuteTxResponse } from "@zynk/fastlane";

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

const response: ExecuteTxResponse = await fastlane.base.executeTx(
  ex_request as any,
);

console.log("Order tracker:", response.requestId);
console.log("Tx signature :", response.signature);
