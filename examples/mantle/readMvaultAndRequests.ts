import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

// 1. Read the partner's mvault //

import { ReadMvaultRequest, ReadMvaultResponse } from "@zynk/fastlane";

const readMvaultRequest: ReadMvaultRequest = {
  partnerId: "zp_472935", // a partner with a zynk-mantle program
};

const readMvaultResponse: ReadMvaultResponse =
  await fastlane.mantle.readMvault(readMvaultRequest);

// mvault is undefined until the partner's mvault is initialized
console.log("Mvault        :", readMvaultResponse.mvault?.address);
console.log("Wallets       :", readMvaultResponse.mvault?.wallets);
console.log("Suffixes      :", readMvaultResponse.mvault?.suffixes);
console.log("Owed          :", readMvaultResponse.mvault?.state); // per suffix and token, UI amounts
console.log("Deposit to    :", readMvaultResponse.mvault?.tokenAccounts);
console.log("Last root     :", readMvaultResponse.mvault?.lastMerkleRoot);
console.log("Timelock      :", readMvaultResponse.mvault?.timelockDuration); // seconds a partner waits to withdraw
console.log("Withdrawal    :", readMvaultResponse.mvault?.timelock); // a wallet's scheduled withdrawal, if any

/***************************************************************/

// 2. Read the pending wallet, suffix and timelock duration change requests //

import { ReadRequestsRequest, ReadRequestsResponse } from "@zynk/fastlane";

const readRequestsRequest: ReadRequestsRequest = {
  partnerId: "zp_472935",
};

const readRequestsResponse: ReadRequestsResponse =
  await fastlane.mantle.readRequests(readRequestsRequest);

// each is undefined when no request of that kind is pending
console.log("Wallets request  :", readRequestsResponse.wallets);
console.log("Suffixes request :", readRequestsResponse.suffixes);
console.log("Duration request :", readRequestsResponse.timelockDuration);
// the admin multisig's Squads proposals still open: REQUEST asks for a new
// list or duration, RESOLVE and REVOKE act on the pending request of their
// kind; a RESOLVE runs only while that request's hash is its requestHash
console.log("Open proposals   :", readRequestsResponse.proposals);
