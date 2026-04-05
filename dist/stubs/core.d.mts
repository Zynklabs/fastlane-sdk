import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, Ed25519Pair, DecodeEventRequest, EventData } from './base.mjs';

declare const protobufPackage = "core";
interface DomainSeparatorRequest {
}
declare const DomainSeparatorRequest: MessageFns<DomainSeparatorRequest>;
interface DomainSeparatorResponse {
    domainSeparator: number;
}
declare const DomainSeparatorResponse: MessageFns<DomainSeparatorResponse>;
interface GetPdvRequest {
    partnerId?: string | undefined;
}
declare const GetPdvRequest: MessageFns<GetPdvRequest>;
interface PdvResponse {
    pdv: string;
}
declare const PdvResponse: MessageFns<PdvResponse>;
interface GenerateOrderIdRequest {
    partnerId: string;
    requestId: string;
}
declare const GenerateOrderIdRequest: MessageFns<GenerateOrderIdRequest>;
interface OrderIdResponse {
    orderId: string;
}
declare const OrderIdResponse: MessageFns<OrderIdResponse>;
interface DeriveOrderTrackerRequest {
    orderId: string;
    beneficiary: string;
    asString?: boolean | undefined;
}
declare const DeriveOrderTrackerRequest: MessageFns<DeriveOrderTrackerRequest>;
interface OrderTrackerResponse {
    orderTracker: string;
}
declare const OrderTrackerResponse: MessageFns<OrderTrackerResponse>;
interface ReadOrderTrackerByAddressRequest {
    orderTracker: string;
}
declare const ReadOrderTrackerByAddressRequest: MessageFns<ReadOrderTrackerByAddressRequest>;
interface ReadOrderTrackerByIdsRequest {
    beneficiary: string;
    orderId?: string | undefined;
    partnerId?: string | undefined;
    requestId?: string | undefined;
}
declare const ReadOrderTrackerByIdsRequest: MessageFns<ReadOrderTrackerByIdsRequest>;
interface OrderTrackerData {
    orderId: string;
    partnerId: string;
    amountIn: string;
    amountOut: string;
    beneficiary: string;
    pdv: string;
}
declare const OrderTrackerData: MessageFns<OrderTrackerData>;
interface MetaArg {
    key: string;
    value: string;
}
declare const MetaArg: MessageFns<MetaArg>;
interface CreateOrderRequest {
    requestId: string;
    partnerId: string;
    beneficiary: string;
    token: Token;
    amount: string;
    pull?: boolean | undefined;
    meta: MetaArg[];
}
declare const CreateOrderRequest: MessageFns<CreateOrderRequest>;
interface ReplenishRequest {
    requestId: string;
    orderTracker: string;
    token: Token;
    amount: string;
    doNotClose?: boolean | undefined;
    kaminoAmount?: string | undefined;
    meta: MetaArg[];
}
declare const ReplenishRequest: MessageFns<ReplenishRequest>;
interface TransferRequest {
    requestId: string;
    from: string;
    to: string;
    amount: string;
    token: Token;
    toToken?: Token | undefined;
    ed25519Pair?: Ed25519Pair | undefined;
    meta: MetaArg[];
}
declare const TransferRequest: MessageFns<TransferRequest>;
interface AttestOrderRequest {
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
declare const AttestOrderRequest: MessageFns<AttestOrderRequest>;
interface TxResponse {
    requestId: string;
    orderTracker: string;
    orderId: string;
    signature: string;
    position: number;
    meta: {
        [key: string]: string;
    };
}
declare const TxResponse: MessageFns<TxResponse>;
interface TxResponse_MetaEntry {
    key: string;
    value: string;
}
declare const TxResponse_MetaEntry: MessageFns<TxResponse_MetaEntry>;
type CoreDefinition = typeof CoreDefinition;
declare const CoreDefinition: {
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
interface CoreServiceImplementation<CallContextExt = {}> {
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
interface CoreClient<CallOptionsExt = {}> {
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

export { AttestOrderRequest, type CoreClient, CoreDefinition, type CoreServiceImplementation, CreateOrderRequest, type DeepPartial, DeriveOrderTrackerRequest, DomainSeparatorRequest, DomainSeparatorResponse, type Exact, GenerateOrderIdRequest, GetPdvRequest, type MessageFns, MetaArg, OrderIdResponse, OrderTrackerData, OrderTrackerResponse, PdvResponse, ReadOrderTrackerByAddressRequest, ReadOrderTrackerByIdsRequest, ReplenishRequest, TransferRequest, TxResponse, TxResponse_MetaEntry, protobufPackage };
