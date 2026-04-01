import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, Ed25519Pair, DecodeEventRequest, EventData } from './base.mjs';

declare const protobufPackage = "orbit";
interface DomainSeparatorRequest {
}
declare const DomainSeparatorRequest: MessageFns<DomainSeparatorRequest>;
interface DomainSeparatorResponse {
    domainSeparator: number;
}
declare const DomainSeparatorResponse: MessageFns<DomainSeparatorResponse>;
interface GetPdaRequest {
    key?: string | undefined;
}
declare const GetPdaRequest: MessageFns<GetPdaRequest>;
interface PdaResponse {
    pda: string;
    key: string;
    type: string;
}
declare const PdaResponse: MessageFns<PdaResponse>;
interface SpendTokensRequest {
    requestId: string;
    approver: string;
    amount: string;
    delegateKey?: string | undefined;
    token?: Token | undefined;
}
declare const SpendTokensRequest: MessageFns<SpendTokensRequest>;
interface TransferToLpRequest {
    requestId: string;
    to: string;
    amount: string;
    token?: Token | undefined;
}
declare const TransferToLpRequest: MessageFns<TransferToLpRequest>;
interface TransferPdaToWalletRequest {
    requestId: string;
    userKey: string;
    to: string;
    amount: string;
    ed25519Pair?: Ed25519Pair | undefined;
    token?: Token | undefined;
}
declare const TransferPdaToWalletRequest: MessageFns<TransferPdaToWalletRequest>;
interface TxResponse {
    requestId: string;
    signature: string;
    position: number;
}
declare const TxResponse: MessageFns<TxResponse>;
type OrbitDefinition = typeof OrbitDefinition;
declare const OrbitDefinition: {
    readonly name: "Orbit";
    readonly fullName: "orbit.Orbit";
    readonly methods: {
        readonly domainSeparator: {
            readonly name: "DomainSeparator";
            readonly requestType: typeof DomainSeparatorRequest;
            readonly requestStream: false;
            readonly responseType: typeof DomainSeparatorResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getUserPda: {
            readonly name: "GetUserPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getDelegatePda: {
            readonly name: "GetDelegatePda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly spendTokens: {
            readonly name: "SpendTokens";
            readonly requestType: typeof SpendTokensRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly transferToLp: {
            readonly name: "TransferToLp";
            readonly requestType: typeof TransferToLpRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly transferPdaToWallet: {
            readonly name: "TransferPdaToWallet";
            readonly requestType: typeof TransferPdaToWalletRequest;
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
interface OrbitServiceImplementation<CallContextExt = {}> {
    domainSeparator(request: DomainSeparatorRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DomainSeparatorResponse>>;
    getUserPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getDelegatePda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    spendTokens(request: SpendTokensRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    transferToLp(request: TransferToLpRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    transferPdaToWallet(request: TransferPdaToWalletRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
}
interface OrbitClient<CallOptionsExt = {}> {
    domainSeparator(request: DeepPartial<DomainSeparatorRequest>, options?: CallOptions & CallOptionsExt): Promise<DomainSeparatorResponse>;
    getUserPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getDelegatePda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    spendTokens(request: DeepPartial<SpendTokensRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    transferToLp(request: DeepPartial<TransferToLpRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    transferPdaToWallet(request: DeepPartial<TransferPdaToWalletRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
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

export { type DeepPartial, DomainSeparatorRequest, DomainSeparatorResponse, type Exact, GetPdaRequest, type MessageFns, type OrbitClient, OrbitDefinition, type OrbitServiceImplementation, PdaResponse, SpendTokensRequest, TransferPdaToWalletRequest, TransferToLpRequest, TxResponse, protobufPackage };
