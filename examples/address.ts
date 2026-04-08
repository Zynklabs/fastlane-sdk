import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

// 1. Get wallet address from KMS signer key //

import { GetAddressRequest, AddressResponse } from "@zynk/fastlane";

const addressRequest: GetAddressRequest = {
  key: "ZOW", // any predefined KMS signer key
};

const addressResponse: AddressResponse =
  await fastlane.base.getAddress(addressRequest);

console.log("Address:", addressResponse.address);
console.log("Key    :", addressResponse.key);

/***************************************************************/

// 2. Get token address - both Solana and EVM //

import { GetTokenAddressRequest } from "@zynk/fastlane";

const tokenAddressRequest: GetTokenAddressRequest = {
  token: fastlane.Token.USDC,
  // chainId: 42164    /* optional - assume Solana when not provided */
};

const tokenAddressResponse: AddressResponse =
  await fastlane.base.getTokenAddress(tokenAddressRequest);

console.log("Token address:", tokenAddressResponse.address);

/***************************************************************/

// 3. Get ata address from KMS signer key and token //

import { GetAtaAddressRequest, AtaAddressResponse } from "@zynk/fastlane";

const ataAddressRequest: GetAtaAddressRequest = {
  owner: "ZOW", // any predefined KMS signer key or bs58 address
  token: fastlane.Token.USDC,
};

const ataResponse: AtaAddressResponse =
  await fastlane.base.getAtaAddress(ataAddressRequest);

console.log("Ata address:", ataResponse.ata);

/***************************************************************/

// 4. Get pdv address from partnerId //

import { GetPdvRequest, PdvResponse } from "@zynk/fastlane";

const pdvRequest: GetPdvRequest = {
  partnerId: "zp_test",
};

const pdvResponse: PdvResponse = await fastlane.core.getPdv(pdvRequest);

console.log("Pdv address:", pdvResponse.pdv);
