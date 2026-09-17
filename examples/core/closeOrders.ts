import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { CloseOrdersRequest, CloseOrdersResponse } from "@zynk/fastlane";

const closeOrdersRequest: CloseOrdersRequest = {
  requestId: "close-abc-123456",
  orderTrackers: [
    "ADdhAjpvjrDWLDQfXvouCxYcsZAmKwNaHcC3iD1vUghD",
    "So11111111111111111111111111111111111111112",
  ],
  meta: [],
};

const response: CloseOrdersResponse =
  await fastlane.core.closeOrders(closeOrdersRequest);

console.log("Order trackers:", response.orderTrackers);
console.log("Tx PDA        :", response.txPda);
