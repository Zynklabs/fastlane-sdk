import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

// 1. Get EVM token details //

import { GetTokenDetailsRequest, TokenDetails } from "@zynk/fastlane";

const tokenDetailsRequest: GetTokenDetailsRequest = {
  chainId: 1,
  token: fastlane.Token.USDC,
};

const tokenDetailsResponse: TokenDetails =
  await fastlane.evm.getTokenDetails(tokenDetailsRequest);

console.log("Symbol  :", tokenDetailsResponse.symbol);
console.log("Address :", tokenDetailsResponse.address);
console.log(
  "Chain   :",
  tokenDetailsResponse.chain?.name,
  tokenDetailsResponse.chain?.id,
);

/***************************************************************/

// 2. Get token price //

import { GetAssetPriceRequest, AssetPrice } from "@zynk/fastlane";

const assetPriceRequest: GetAssetPriceRequest = {
  currency: "usd",
  token: fastlane.Token.USDC,
};

const assetPriceResponse: AssetPrice =
  await fastlane.base.getAssetPrice(assetPriceRequest);

console.log("Price  :", assetPriceResponse.price);
console.log("Symbol :", assetPriceResponse.symbol);
console.log("Rate   :", assetPriceResponse.conversionRate);

/***************************************************************/

// 3. Get native asset price //

const nativePriceRequest: GetAssetPriceRequest = {
  currency: "aed",
  native: "SOL",
};

const nativePriceResponse: AssetPrice =
  await fastlane.base.getAssetPrice(nativePriceRequest);

console.log("Price  :", nativePriceResponse.price);
console.log("Symbol :", nativePriceResponse.symbol);
console.log("Rate   :", nativePriceResponse.conversionRate);
