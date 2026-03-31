"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTxIx = exports.applicableMethods = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.applicableMethods = new Set([
    "/base.Base/BuildEd25519Ix",
    "/base.Base/ExecuteTx",
    "/core.Core/Transfer",
    "/core.Core/AttestOrder",
]);
const TxIxToTransactionInstruction = (ix) => new web3_js_1.TransactionInstruction({
    programId: new web3_js_1.PublicKey(ix.programId),
    data: Buffer.from(ix.data),
    keys: ix.keys.map((k) => ({
        ...k,
        pubkey: new web3_js_1.PublicKey(k.pubkey),
    })),
});
const TransactionInstructionToTxIx = (ix) => ({
    programId: ix.programId.toBase58(),
    data: new Uint8Array(ix.data),
    keys: ix.keys.map((k) => ({
        ...k,
        pubkey: k.pubkey.toBase58(),
    })),
});
const isTxIx = (i) => {
    return (i &&
        typeof i === "object" &&
        typeof i.programId === "string" &&
        Array.isArray(i.keys) &&
        i.data instanceof Uint8Array);
};
const transformTxIx = (obj, direction, transformed = false) => {
    if (!obj || typeof obj !== "object")
        return obj;
    const out = { ...(obj?.request || obj) };
    if (transformed || exports.applicableMethods.has(obj.method?.path)) {
        for (const key of Object.keys(out)) {
            const v = out[key];
            if (direction === "toWire" && v instanceof web3_js_1.TransactionInstruction) {
                out[key] = TransactionInstructionToTxIx(v);
                continue;
            }
            if (direction === "fromWire" && isTxIx(v)) {
                out[key] = TxIxToTransactionInstruction(v);
                continue;
            }
            if (Array.isArray(v)) {
                out[key] = v.map((i) => direction === "toWire"
                    ? i instanceof web3_js_1.TransactionInstruction
                        ? TransactionInstructionToTxIx(i)
                        : i
                    : isTxIx(i)
                        ? TxIxToTransactionInstruction(i)
                        : i);
            }
        }
        transformed = true;
    }
    return { ...out, transformed };
};
exports.transformTxIx = transformTxIx;
