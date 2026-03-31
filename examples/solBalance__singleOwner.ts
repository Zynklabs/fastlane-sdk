import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { GetBalanceRequest, Balance } from "@zynk/fastlane";

const balanceRequest: GetBalanceRequest = {
  of: "Royzy1HKXwHpFEnKZRyqSq8S56speHvFD1VnyxXioDe", // can accept an address, a known signer key or a partnerId
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
