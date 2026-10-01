import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

// 1. Read pool by pool id //

import { ReadPoolRequest, ReadPoolResponse } from "@zynk/fastlane";

const readPoolRequest: ReadPoolRequest = {
  poolId: "trpool_zp_472935_BATCH", // trpool_<partnerId>_<BATCH | REALTIME>
};

const readPoolResponse: ReadPoolResponse =
  await fastlane.tr.readPool(readPoolRequest);

// pool is undefined when no pool has this id
console.log("Pool address  :", readPoolResponse.pool?.address);
console.log("Last sequence :", readPoolResponse.pool?.lastSequence);
console.log("Batch count   :", readPoolResponse.pool?.batchCount);

if (!readPoolResponse.pool) throw new Error("Pool not found");

/***************************************************************/

// 2. Read the pool's batch by its first sequence //

import { ReadBatchRequest, ReadBatchResponse } from "@zynk/fastlane";

const readBatchRequest: ReadBatchRequest = {
  pool: readPoolResponse.pool.address, // the pool read above
  sequenceFrom: 1, // the first sequence the batch covers
};

const readBatchResponse: ReadBatchResponse =
  await fastlane.tr.readBatch(readBatchRequest);

// batch is undefined when no batch starts at sequenceFrom
console.log("Batch address :", readBatchResponse.batch?.address);
console.log("Merkle root   :", readBatchResponse.batch?.merkleRoot);
console.log(
  "Sequences     :",
  readBatchResponse.batch?.sequenceFrom,
  readBatchResponse.batch?.sequenceTo,
);
console.log("Tx signature  :", readBatchResponse.batch?.signature);
