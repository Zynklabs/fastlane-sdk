import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { ReplenishRequest, TxResponse } from "@zynk/fastlane";

const replenishRequest: ReplenishRequest = {
  requestId: "rep-abc-123456",
  orderTracker: "ADdhAjpvjrDWLDQfXvouCxYcsZAmKwNaHcC3iD1vUghD",
  token: fastlane.Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  // doNotClose: true, // to keep the order open (even if it's closable)
  meta: [],
};

const response: TxResponse = await fastlane.core.replenish(replenishRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
