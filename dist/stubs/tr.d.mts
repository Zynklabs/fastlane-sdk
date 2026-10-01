import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';

declare const protobufPackage = "tr";
interface CreatePoolRequest {
    poolId: string;
    partnerId: string;
    /** BATCH or REALTIME. */
    model: string;
}
declare const CreatePoolRequest: MessageFns<CreatePoolRequest>;
interface ReadPoolRequest {
    poolId: string;
}
declare const ReadPoolRequest: MessageFns<ReadPoolRequest>;
/**
 * `pool_id` and `partner_id` are the ids the account stores: the first 32 hex
 * characters of the SHA-256 of the backend's ids.
 */
interface PoolData {
    address: string;
    poolId: string;
    partnerId: string;
    model: string;
    lastSequence: number;
    batchCount: number;
    createdAt: number;
    /** The creating transaction, when this call made it. */
    signature?: string | undefined;
}
declare const PoolData: MessageFns<PoolData>;
interface ReadPoolResponse {
    pool?: PoolData | undefined;
}
declare const ReadPoolResponse: MessageFns<ReadPoolResponse>;
interface AnchorBatchRequest {
    /** The pool's address. */
    pool: string;
    batchId: string;
    /** 64 hex characters. */
    merkleRoot: string;
    sequenceFrom: number;
    sequenceTo: number;
}
declare const AnchorBatchRequest: MessageFns<AnchorBatchRequest>;
interface ReadBatchRequest {
    /** The pool's address. */
    pool: string;
    sequenceFrom: number;
}
declare const ReadBatchRequest: MessageFns<ReadBatchRequest>;
/**
 * `batch_id` is the id the account stores: the first 32 hex characters of the
 * SHA-256 of the backend's id.
 */
interface BatchData {
    address: string;
    pool: string;
    batchId: string;
    merkleRoot: string;
    sequenceFrom: number;
    sequenceTo: number;
    anchoredAt: number;
    /** The anchoring transaction. */
    signature?: string | undefined;
}
declare const BatchData: MessageFns<BatchData>;
interface ReadBatchResponse {
    batch?: BatchData | undefined;
}
declare const ReadBatchResponse: MessageFns<ReadBatchResponse>;
type TrDefinition = typeof TrDefinition;
declare const TrDefinition: {
    readonly name: "Tr";
    readonly fullName: "tr.Tr";
    readonly methods: {
        readonly createPool: {
            readonly name: "CreatePool";
            readonly requestType: typeof CreatePoolRequest;
            readonly requestStream: false;
            readonly responseType: typeof PoolData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readPool: {
            readonly name: "ReadPool";
            readonly requestType: typeof ReadPoolRequest;
            readonly requestStream: false;
            readonly responseType: typeof ReadPoolResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly anchorBatch: {
            readonly name: "AnchorBatch";
            readonly requestType: typeof AnchorBatchRequest;
            readonly requestStream: false;
            readonly responseType: typeof BatchData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readBatch: {
            readonly name: "ReadBatch";
            readonly requestType: typeof ReadBatchRequest;
            readonly requestStream: false;
            readonly responseType: typeof ReadBatchResponse;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
interface TrServiceImplementation<CallContextExt = {}> {
    createPool(request: CreatePoolRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PoolData>>;
    readPool(request: ReadPoolRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ReadPoolResponse>>;
    anchorBatch(request: AnchorBatchRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BatchData>>;
    readBatch(request: ReadBatchRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ReadBatchResponse>>;
}
interface TrClient<CallOptionsExt = {}> {
    createPool(request: DeepPartial<CreatePoolRequest>, options?: CallOptions & CallOptionsExt): Promise<PoolData>;
    readPool(request: DeepPartial<ReadPoolRequest>, options?: CallOptions & CallOptionsExt): Promise<ReadPoolResponse>;
    anchorBatch(request: DeepPartial<AnchorBatchRequest>, options?: CallOptions & CallOptionsExt): Promise<BatchData>;
    readBatch(request: DeepPartial<ReadBatchRequest>, options?: CallOptions & CallOptionsExt): Promise<ReadBatchResponse>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}

export { AnchorBatchRequest, BatchData, CreatePoolRequest, type DeepPartial, type Exact, type MessageFns, PoolData, ReadBatchRequest, ReadBatchResponse, ReadPoolRequest, ReadPoolResponse, type TrClient, TrDefinition, type TrServiceImplementation, protobufPackage };
