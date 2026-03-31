import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { TxCost, TxDetails, TxStatus } from "@zynk/fastlane";

const txDetails: TxDetails = await fastlane.base.getTxDetails({
  signature:
    "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
});
const txStatus: TxStatus = await fastlane.base.getTxStatus({
  signature:
    "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
});
const txCost: TxCost = await fastlane.base.getTxCost({
  signature:
    "5ujeMEWV9PZCSEepZCHUec8QtckwunRgic3YgKXGixP9HpZbLoQmYbtfGrBTsUaxBikeRwhH49F1pHezHn9sgVaY",
  denom: fastlane.Denom.SOL,
});

console.log("Tx Details:", txDetails.stringified);
console.log("Tx Status :", txStatus.status);
console.log("Tx Cost   :", txCost.txCost, txCost.denom);
