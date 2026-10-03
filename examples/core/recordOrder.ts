import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { RecordOrderRequest, TxResponse } from "@zynk/fastlane";

const recordOrderRequest: RecordOrderRequest = {
  requestId: "ord-abc-123456",
  partnerId: "zp_123456",
  beneficiary: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
  token: fastlane.Token.USDC,
  amount: "1.5",
  // orderId: "<existing hashed order id>", // reuse the original seeds to reopen the same tracker
  meta: [],
};

const response: TxResponse =
  await fastlane.core.recordOrder(recordOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
