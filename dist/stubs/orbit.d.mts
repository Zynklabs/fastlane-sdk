import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, DecodeEventRequest, EventData } from './base.mjs';

declare const protobufPackage = "orbit";
interface GetPdaRequest {
    key: string;
}
declare const GetPdaRequest: MessageFns<GetPdaRequest>;
interface PdaResponse {
    pda: string;
    key: string;
    type: string;
}
declare const PdaResponse: MessageFns<PdaResponse>;
interface OrderData {
    orderId: string;
    amount: string;
    address: string;
}
declare const OrderData: MessageFns<OrderData>;
interface CollectRequest {
    orderId: string;
    vaultId: string;
    userId: string;
    address: string;
    amount: string;
    token?: Token | undefined;
}
declare const CollectRequest: MessageFns<CollectRequest>;
interface DisburseRequest {
    requestId: string;
    userId: string;
    address: string;
    amount: string;
    orderId?: string | undefined;
    token?: Token | undefined;
}
declare const DisburseRequest: MessageFns<DisburseRequest>;
interface TxResponse {
    orderId: string;
    signature: string;
    position: number;
}
declare const TxResponse: MessageFns<TxResponse>;
interface LPRequest {
    userId: string;
    address: string;
    memo?: string | undefined;
}
declare const LPRequest: MessageFns<LPRequest>;
interface LPState {
    status: string;
    pda: string;
    txPda?: string | undefined;
}
declare const LPState: MessageFns<LPState>;
type OrbitDefinition = typeof OrbitDefinition;
declare const OrbitDefinition: {
    readonly name: "Orbit";
    readonly fullName: "orbit.Orbit";
    readonly methods: {
        readonly getVaultPda: {
            readonly name: "GetVaultPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getOrderPda: {
            readonly name: "GetOrderPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readOrderPda: {
            readonly name: "ReadOrderPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly collect: {
            readonly name: "Collect";
            readonly requestType: typeof CollectRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly disburse: {
            readonly name: "Disburse";
            readonly requestType: typeof DisburseRequest;
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
        readonly verifyLP: {
            readonly name: "VerifyLP";
            readonly requestType: typeof LPRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly whitelistLP: {
            readonly name: "WhitelistLP";
            readonly requestType: typeof LPRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly revokeLP: {
            readonly name: "RevokeLP";
            readonly requestType: typeof LPRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
interface OrbitServiceImplementation<CallContextExt = {}> {
    getVaultPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getOrderPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    readOrderPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderData>>;
    collect(request: CollectRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    disburse(request: DisburseRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
    verifyLP(request: LPRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    whitelistLP(request: LPRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    revokeLP(request: LPRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
}
interface OrbitClient<CallOptionsExt = {}> {
    getVaultPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getOrderPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    readOrderPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderData>;
    collect(request: DeepPartial<CollectRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    disburse(request: DeepPartial<DisburseRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    decodeEvent(request: DeepPartial<DecodeEventRequest>, options?: CallOptions & CallOptionsExt): Promise<EventData>;
    verifyLP(request: DeepPartial<LPRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    whitelistLP(request: DeepPartial<LPRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    revokeLP(request: DeepPartial<LPRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
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

export { CollectRequest, type DeepPartial, DisburseRequest, type Exact, GetPdaRequest, LPRequest, LPState, type MessageFns, type OrbitClient, OrbitDefinition, type OrbitServiceImplementation, OrderData, PdaResponse, TxResponse, protobufPackage };
