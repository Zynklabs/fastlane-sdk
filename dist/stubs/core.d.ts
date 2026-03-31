import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
import { Ed25519Pair, Token } from "./base";
export declare const protobufPackage = "core";
export interface DomainSeparatorRequest {
}
export interface DomainSeparatorResponse {
    domainSeparator: number;
}
export interface GetPdvRequest {
    partnerId?: string | undefined;
}
export interface PdvResponse {
    pdv: string;
}
export interface GenerateOrderIdRequest {
    partnerId: string;
    requestId: string;
}
export interface OrderIdResponse {
    orderId: string;
}
export interface DeriveOrderTrackerRequest {
    orderId: string;
    beneficiary: string;
}
export interface OrderTrackerResponse {
    orderTracker: string;
}
export interface ReadOrderTrackerByAddressRequest {
    orderTracker: string;
}
export interface ReadOrderTrackerByIdsRequest {
    beneficiary: string;
    orderId?: string | undefined;
    partnerId?: string | undefined;
    requestId?: string | undefined;
}
export interface OrderTrackerData {
    orderId: string;
    partnerId: string;
    amountIn: string;
    amountOut: string;
    beneficiary: string;
    pdv: string;
}
export interface MetaArg {
    key: string;
    value: string;
}
export interface CreateOrderRequest {
    requestId: string;
    partnerId: string;
    beneficiary: string;
    token: Token;
    amount: string;
    pull?: boolean | undefined;
    meta: MetaArg[];
}
export interface ReplenishRequest {
    requestId: string;
    orderTracker: string;
    token: Token;
    amount: string;
    doNotClose?: boolean | undefined;
    kaminoAmount?: string | undefined;
    meta: MetaArg[];
}
export interface TransferRequest {
    requestId: string;
    from: string;
    to: string;
    amount: string;
    token: Token;
    toToken?: Token | undefined;
    ed25519Pair?: Ed25519Pair | undefined;
    meta: MetaArg[];
}
export interface AttestOrderRequest {
    orderId: string;
    originChain: string;
    targetChain: string;
    origin: string;
    proxy: string;
    target: string;
    txn: string;
    asset: Token;
    amount: string;
    ed25519Pair?: Ed25519Pair | undefined;
    proxyTxn?: string | undefined;
    proxyAsset?: Token | undefined;
    meta: MetaArg[];
}
export interface TxResponse {
    requestId: string;
    orderTracker: string;
    orderId: string;
    signature: string;
    position: number;
    meta: {
        [key: string]: string;
    };
}
export interface TxResponse_MetaEntry {
    key: string;
    value: string;
}
export interface DecodeEventRequest {
    signature: string;
    eventName?: string | undefined;
}
export interface EventData {
    eventName: string;
    ixName: string;
    content?: {
        [key: string]: any;
    } | undefined;
}
export declare const DomainSeparatorRequest: MessageFns<DomainSeparatorRequest>;
export declare const DomainSeparatorResponse: MessageFns<DomainSeparatorResponse>;
export declare const GetPdvRequest: MessageFns<GetPdvRequest>;
export declare const PdvResponse: MessageFns<PdvResponse>;
export declare const GenerateOrderIdRequest: MessageFns<GenerateOrderIdRequest>;
export declare const OrderIdResponse: MessageFns<OrderIdResponse>;
export declare const DeriveOrderTrackerRequest: MessageFns<DeriveOrderTrackerRequest>;
export declare const OrderTrackerResponse: MessageFns<OrderTrackerResponse>;
export declare const ReadOrderTrackerByAddressRequest: MessageFns<ReadOrderTrackerByAddressRequest>;
export declare const ReadOrderTrackerByIdsRequest: MessageFns<ReadOrderTrackerByIdsRequest>;
export declare const OrderTrackerData: MessageFns<OrderTrackerData>;
export declare const MetaArg: MessageFns<MetaArg>;
export declare const CreateOrderRequest: MessageFns<CreateOrderRequest>;
export declare const ReplenishRequest: MessageFns<ReplenishRequest>;
export declare const TransferRequest: MessageFns<TransferRequest>;
export declare const AttestOrderRequest: MessageFns<AttestOrderRequest>;
export declare const TxResponse: MessageFns<TxResponse>;
export declare const TxResponse_MetaEntry: MessageFns<TxResponse_MetaEntry>;
export declare const DecodeEventRequest: MessageFns<DecodeEventRequest>;
export declare const EventData: MessageFns<EventData>;
export type CoreDefinition = typeof CoreDefinition;
export declare const CoreDefinition: {
    readonly name: "Core";
    readonly fullName: "core.Core";
    readonly methods: {
        readonly domainSeparator: {
            readonly name: "DomainSeparator";
            readonly requestType: typeof DomainSeparatorRequest;
            readonly requestStream: false;
            readonly responseType: typeof DomainSeparatorResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getPdv: {
            readonly name: "GetPdv";
            readonly requestType: typeof GetPdvRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdvResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly generateOrderId: {
            readonly name: "GenerateOrderId";
            readonly requestType: typeof GenerateOrderIdRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderIdResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly deriveOrderTracker: {
            readonly name: "DeriveOrderTracker";
            readonly requestType: typeof DeriveOrderTrackerRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTrackerResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readOrderTrackerByAddress: {
            readonly name: "ReadOrderTrackerByAddress";
            readonly requestType: typeof ReadOrderTrackerByAddressRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTrackerData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readOrderTrackerByIds: {
            readonly name: "ReadOrderTrackerByIds";
            readonly requestType: typeof ReadOrderTrackerByIdsRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTrackerData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly createOrder: {
            readonly name: "CreateOrder";
            readonly requestType: typeof CreateOrderRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly replenish: {
            readonly name: "Replenish";
            readonly requestType: typeof ReplenishRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly transfer: {
            readonly name: "Transfer";
            readonly requestType: typeof TransferRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly attestOrder: {
            readonly name: "AttestOrder";
            readonly requestType: typeof AttestOrderRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly decodeEvent: {
            readonly name: "DecodeEvent";
            readonly requestType: typeof DecodeEventRequest;
            readonly requestStream: false;
            readonly responseType: typeof EventData;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
export interface CoreServiceImplementation<CallContextExt = {}> {
    domainSeparator(request: DomainSeparatorRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DomainSeparatorResponse>>;
    getPdv(request: GetPdvRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdvResponse>>;
    generateOrderId(request: GenerateOrderIdRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderIdResponse>>;
    deriveOrderTracker(request: DeriveOrderTrackerRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTrackerResponse>>;
    readOrderTrackerByAddress(request: ReadOrderTrackerByAddressRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTrackerData>>;
    readOrderTrackerByIds(request: ReadOrderTrackerByIdsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTrackerData>>;
    createOrder(request: CreateOrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    replenish(request: ReplenishRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    transfer(request: TransferRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    attestOrder(request: AttestOrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
}
export interface CoreClient<CallOptionsExt = {}> {
    domainSeparator(request: DeepPartial<DomainSeparatorRequest>, options?: CallOptions & CallOptionsExt): Promise<DomainSeparatorResponse>;
    getPdv(request: DeepPartial<GetPdvRequest>, options?: CallOptions & CallOptionsExt): Promise<PdvResponse>;
    generateOrderId(request: DeepPartial<GenerateOrderIdRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderIdResponse>;
    deriveOrderTracker(request: DeepPartial<DeriveOrderTrackerRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTrackerResponse>;
    readOrderTrackerByAddress(request: DeepPartial<ReadOrderTrackerByAddressRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTrackerData>;
    readOrderTrackerByIds(request: DeepPartial<ReadOrderTrackerByIdsRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTrackerData>;
    createOrder(request: DeepPartial<CreateOrderRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    replenish(request: DeepPartial<ReplenishRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    transfer(request: DeepPartial<TransferRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    attestOrder(request: DeepPartial<AttestOrderRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    decodeEvent(request: DeepPartial<DecodeEventRequest>, options?: CallOptions & CallOptionsExt): Promise<EventData>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
//# sourceMappingURL=core.d.ts.map