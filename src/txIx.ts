import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { TxIx } from "./stubs/base";

export const applicableMethods = new Set([
  "/base.Base/BuildEd25519Ix",
  "/base.Base/ExecuteTx",
  "/core.Core/Transfer",
  "/core.Core/AttestOrder",
]);

const TxIxToTransactionInstruction = (ix: TxIx) =>
  new TransactionInstruction({
    programId: new PublicKey(ix.programId),
    data: Buffer.from(ix.data),
    keys: ix.keys.map((k) => ({
      ...k,
      pubkey: new PublicKey(k.pubkey),
    })),
  });

const TransactionInstructionToTxIx = (ix: TransactionInstruction) => ({
  programId: ix.programId.toBase58(),
  data: new Uint8Array(ix.data),
  keys: ix.keys.map((k) => ({
    ...k,
    pubkey: k.pubkey.toBase58(),
  })),
});

const isTxIx = (i: any): i is TxIx => {
  return (
    i &&
    typeof i === "object" &&
    typeof i.programId === "string" &&
    Array.isArray(i.keys) &&
    i.data instanceof Uint8Array
  );
};

export const transformTxIx = (
  obj: any,
  direction: "toWire" | "fromWire",
  transformed = false,
) => {
  if (!obj || typeof obj !== "object") return obj;

  const out = { ...(obj?.request || obj) };

  if (transformed || applicableMethods.has(obj.method?.path)) {
    for (const key of Object.keys(out)) {
      const v = out[key];

      if (direction === "toWire" && v instanceof TransactionInstruction) {
        out[key] = TransactionInstructionToTxIx(v);
        continue;
      }

      if (direction === "fromWire" && isTxIx(v)) {
        out[key] = TxIxToTransactionInstruction(v);
        continue;
      }

      if (Array.isArray(v)) {
        out[key] = v.map((i) =>
          direction === "toWire"
            ? i instanceof TransactionInstruction
              ? TransactionInstructionToTxIx(i)
              : i
            : isTxIx(i)
              ? TxIxToTransactionInstruction(i)
              : i,
        );
      }
    }
    transformed = true;
  }

  return { ...out, transformed };
};
