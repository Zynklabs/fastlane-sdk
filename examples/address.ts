import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

// 1. Get wallet address from KMS signer key //

import { GetAddressRequest, AddressResponse } from "@zynk/fastlane";

const addressRequest: GetAddressRequest = {
  key: "ZOW", // any predefined KMS signer key
};

const response: AddressResponse =
  await fastlane.base.getAddress(addressRequest);

console.log("Address:", response.address);
console.log("Key    :", response.key);

/***************************************************************/

// 2. Get ata address from KMS signer key and token //

import { GetAtaAddressRequest, AtaAddressResponse } from "@zynk/fastlane";

const ataAddressRequest: GetAtaAddressRequest = {
  owner: "ZOW", // any predefined KMS signer key or bs58 address
  token: fastlane.Token.USDC,
};

const ataResponse: AtaAddressResponse =
  await fastlane.base.getAtaAddress(ataAddressRequest);

console.log("Ata address:", ataResponse.ata);
