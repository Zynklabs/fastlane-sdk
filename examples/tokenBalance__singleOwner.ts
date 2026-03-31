import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { GetBalanceRequest, Balance } from "@zynk/fastlane";

const balanceRequest: GetBalanceRequest = {
  of: "ZOW", // can accept an address, a known signer key or a partnerId
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
