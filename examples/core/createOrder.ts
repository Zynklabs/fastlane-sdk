import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { CreateOrderRequest, TxResponse } from "@zynk/fastlane";

const createOrderRequest: CreateOrderRequest = {
  requestId: "ord-abc-123456",
  partnerId: "partner-789",
  beneficiary: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe",
  token: fastlane.Token.USDC,
  amount: "1500000", // 1.5 USDC (6 decimals)
  // pull: true, // for pull and create orders
  meta: [],
};

const response: TxResponse =
  await fastlane.core.createOrder(createOrderRequest);

console.log("Order tracker:", response.orderTracker);
console.log("Tx signature :", response.signature);
