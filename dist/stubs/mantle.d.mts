import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, Balance, TxIx, DecodeEventRequest, EventData } from './base.mjs';

declare const protobufPackage = "mantle";
/** Suffixes name the partner's PDVs: "" for ALM, "::onramp" and "::offramp". */
interface InitializeRequest {
    partnerId: string;
    wallets: string[];
    suffixes: string[];
}
declare const InitializeRequest: MessageFns<InitializeRequest>;
interface ReadMvaultRequest {
    partnerId: string;
}
declare const ReadMvaultRequest: MessageFns<ReadMvaultRequest>;
/** `amount` is a UI amount of `token`. */
interface Obligation {
    suffix: string;
    token: Token;
    amount: string;
}
declare const Obligation: MessageFns<Obligation>;
interface TokenAccount {
    token: Token;
    address: string;
}
declare const TokenAccount: MessageFns<TokenAccount>;
interface MvaultData {
    programId: string;
    address: string;
    wallets: string[];
    suffixes: string[];
    lastExecutedAt: number;
    /** 64 hex characters. */
    lastMerkleRoot: string;
    /** What is still owed, per suffix and token. */
    state: Obligation[];
    /** The mvault's token account per token, where the partner deposits. */
    tokenAccounts: TokenAccount[];
    balances: Balance[];
    /** The PDV of each allowed suffix. */
    pdvs: {
        [key: string]: string;
    };
    /** The creating transaction, answered by Initialize. */
    signature?: string | undefined;
}
declare const MvaultData: MessageFns<MvaultData>;
interface MvaultData_PdvsEntry {
    key: string;
    value: string;
}
declare const MvaultData_PdvsEntry: MessageFns<MvaultData_PdvsEntry>;
interface ReadMvaultResponse {
    mvault?: MvaultData | undefined;
}
declare const ReadMvaultResponse: MessageFns<ReadMvaultResponse>;
interface ExecuteRequest {
    partnerId: string;
    requestId: string;
    /** 64 hex characters. */
    merkleRoot: string;
    /** Only what is new since the last run: the program adds it to what is owed. */
    obligations: Obligation[];
    /**
     * A whitelisted wallet that receives what is left; the mvault keeps it when
     * unset.
     */
    surplusTo?: string | undefined;
}
declare const ExecuteRequest: MessageFns<ExecuteRequest>;
/** UI amounts of `token`. */
interface Settlement {
    suffix: string;
    token: Token;
    requested: string;
    transferred: string;
    remaining: string;
}
declare const Settlement: MessageFns<Settlement>;
interface ExecuteResponse {
    signature: string;
    merkleRoot: string;
    executedAt: number;
    settlements: Settlement[];
}
declare const ExecuteResponse: MessageFns<ExecuteResponse>;
/**
 * With `wallet`, a whitelisted wallet acts for the partner and the instruction
 * comes back unsigned for it. Without it, the admin multisig acts through
 * Squads.
 */
interface WalletsUpdateRequest {
    partnerId: string;
    wallets: string[];
    wallet?: string | undefined;
    memo?: string | undefined;
}
declare const WalletsUpdateRequest: MessageFns<WalletsUpdateRequest>;
interface SuffixesUpdateRequest {
    partnerId: string;
    suffixes: string[];
    wallet?: string | undefined;
    memo?: string | undefined;
}
declare const SuffixesUpdateRequest: MessageFns<SuffixesUpdateRequest>;
/** `wallet` as in WalletsUpdateRequest. Only the admin multisig revokes. */
interface RequestActionRequest {
    partnerId: string;
    /** WALLETS or SUFFIXES. */
    kind: string;
    wallet?: string | undefined;
    memo?: string | undefined;
}
declare const RequestActionRequest: MessageFns<RequestActionRequest>;
/**
 * `status` is "pending" for a Squads proposal (`tx_pda`) and "unsigned" for an
 * instruction the wallet signs (`ix`). `address` is the request's.
 */
interface RequestState {
    status: string;
    address: string;
    txPda?: string | undefined;
    ix?: TxIx | undefined;
}
declare const RequestState: MessageFns<RequestState>;
interface ReadRequestsRequest {
    partnerId: string;
}
declare const ReadRequestsRequest: MessageFns<ReadRequestsRequest>;
interface RequestData {
    address: string;
    /** WALLETS or SUFFIXES. */
    kind: string;
    requestedByAdmin: boolean;
    wallets: string[];
    suffixes: string[];
}
declare const RequestData: MessageFns<RequestData>;
interface ReadRequestsResponse {
    wallets?: RequestData | undefined;
    suffixes?: RequestData | undefined;
}
declare const ReadRequestsResponse: MessageFns<ReadRequestsResponse>;
type MantleDefinition = typeof MantleDefinition;
declare const MantleDefinition: {
    readonly name: "Mantle";
    readonly fullName: "mantle.Mantle";
    readonly methods: {
        readonly initialize: {
            readonly name: "Initialize";
            readonly requestType: typeof InitializeRequest;
            readonly requestStream: false;
            readonly responseType: typeof MvaultData;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readMvault: {
            readonly name: "ReadMvault";
            readonly requestType: typeof ReadMvaultRequest;
            readonly requestStream: false;
            readonly responseType: typeof ReadMvaultResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly execute: {
            readonly name: "Execute";
            readonly requestType: typeof ExecuteRequest;
            readonly requestStream: false;
            readonly responseType: typeof ExecuteResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly requestWalletsUpdate: {
            readonly name: "RequestWalletsUpdate";
            readonly requestType: typeof WalletsUpdateRequest;
            readonly requestStream: false;
            readonly responseType: typeof RequestState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly requestSuffixesUpdate: {
            readonly name: "RequestSuffixesUpdate";
            readonly requestType: typeof SuffixesUpdateRequest;
            readonly requestStream: false;
            readonly responseType: typeof RequestState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly resolveRequest: {
            readonly name: "ResolveRequest";
            readonly requestType: typeof RequestActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof RequestState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly revokeRequest: {
            readonly name: "RevokeRequest";
            readonly requestType: typeof RequestActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof RequestState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readRequests: {
            readonly name: "ReadRequests";
            readonly requestType: typeof ReadRequestsRequest;
            readonly requestStream: false;
            readonly responseType: typeof ReadRequestsResponse;
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
interface MantleServiceImplementation<CallContextExt = {}> {
    initialize(request: InitializeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<MvaultData>>;
    readMvault(request: ReadMvaultRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ReadMvaultResponse>>;
    execute(request: ExecuteRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ExecuteResponse>>;
    requestWalletsUpdate(request: WalletsUpdateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RequestState>>;
    requestSuffixesUpdate(request: SuffixesUpdateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RequestState>>;
    resolveRequest(request: RequestActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RequestState>>;
    revokeRequest(request: RequestActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RequestState>>;
    readRequests(request: ReadRequestsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ReadRequestsResponse>>;
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
}
interface MantleClient<CallOptionsExt = {}> {
    initialize(request: DeepPartial<InitializeRequest>, options?: CallOptions & CallOptionsExt): Promise<MvaultData>;
    readMvault(request: DeepPartial<ReadMvaultRequest>, options?: CallOptions & CallOptionsExt): Promise<ReadMvaultResponse>;
    execute(request: DeepPartial<ExecuteRequest>, options?: CallOptions & CallOptionsExt): Promise<ExecuteResponse>;
    requestWalletsUpdate(request: DeepPartial<WalletsUpdateRequest>, options?: CallOptions & CallOptionsExt): Promise<RequestState>;
    requestSuffixesUpdate(request: DeepPartial<SuffixesUpdateRequest>, options?: CallOptions & CallOptionsExt): Promise<RequestState>;
    resolveRequest(request: DeepPartial<RequestActionRequest>, options?: CallOptions & CallOptionsExt): Promise<RequestState>;
    revokeRequest(request: DeepPartial<RequestActionRequest>, options?: CallOptions & CallOptionsExt): Promise<RequestState>;
    readRequests(request: DeepPartial<ReadRequestsRequest>, options?: CallOptions & CallOptionsExt): Promise<ReadRequestsResponse>;
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

export { type DeepPartial, type Exact, ExecuteRequest, ExecuteResponse, InitializeRequest, type MantleClient, MantleDefinition, type MantleServiceImplementation, type MessageFns, MvaultData, MvaultData_PdvsEntry, Obligation, ReadMvaultRequest, ReadMvaultResponse, ReadRequestsRequest, ReadRequestsResponse, RequestActionRequest, RequestData, RequestState, Settlement, SuffixesUpdateRequest, TokenAccount, WalletsUpdateRequest, protobufPackage };
