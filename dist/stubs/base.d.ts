import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
export declare const protobufPackage = "base";
export declare enum Token {
    USDC = 0,
    USDT = 1,
    PYUSD = 2,
    USD1 = 3,
    RLUSD = 4,
    UNRECOGNIZED = -1
}
export declare function tokenFromJSON(object: any): Token;
export declare function tokenToJSON(object: Token): string;
export declare enum Denom {
    LAMPORTS = 0,
    SOL = 1,
    UNRECOGNIZED = -1
}
export declare function denomFromJSON(object: any): Denom;
export declare function denomToJSON(object: Denom): string;
export interface TxIxAccount {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
}
export interface TxIx {
    programId: string;
    data: Buffer;
    keys: TxIxAccount[];
}
export interface GenerateHashedArrayRequest {
    input: string;
}
export interface HashedArrayResponse {
    hashed: Buffer;
}
export interface BuildEd25519IxRequest {
    message: string;
    signer: string;
}
export interface Ed25519Pair {
    ed25519Sig: Buffer;
    ed25519Ix?: TxIx | undefined;
}
export interface GetBalanceRequest {
    of: string;
    token?: Token | undefined;
}
export interface GetBalancesRequest {
    of: string[];
    token?: Token | undefined;
}
export interface GetAddressRequest {
    key: string;
}
export interface AddressResponse {
    address: string;
    key: string;
}
export interface Asset {
    symbol: string;
    address?: string | undefined;
    token?: Token | undefined;
}
export interface Balance {
    amount: string;
    uiAmount: string;
    of?: string | undefined;
    address?: string | undefined;
    asset?: Asset | undefined;
}
export interface BalancesItem {
    of: string;
    address: string;
    balances: {
        [key: string]: Balance;
    };
}
export interface BalancesItem_BalancesEntry {
    key: string;
    value?: Balance | undefined;
}
export interface Balances {
    data: BalancesItem[];
}
export interface GetAccountInfoRequest {
    address: string;
}
export interface AccountInfoResponse {
    owner?: string | undefined;
    lamports?: number | undefined;
    data?: Buffer | undefined;
    executable?: boolean | undefined;
}
export interface GetOwnerRequest {
    address: string;
}
export interface GetOwnerResponse {
    owner: string;
}
export interface GetTokenAccountOwnerRequest {
    address: string;
}
export interface TokenAccountOwnerResponse {
    owner: string;
}
export interface GetAtaAddressRequest {
    token: Token;
    owner: string;
}
export interface AtaAddressResponse {
    ata: string;
}
export interface GetOrCreateAtaRequest {
    token: Token;
    owner: string;
    maxAttempts?: number | undefined;
}
export interface GetOrCreateAtaResponse {
    ata: string;
    tokenAccount?: AccountInfoResponse | undefined;
    signature?: string | undefined;
}
export interface ExecuteTxRequest {
    requestId: string;
    ixs: TxIx[];
    signers: string[];
}
export interface ExecuteTxResponse {
    requestId: string;
    signature: string;
}
export interface GetTxStatusRequest {
    signature: string;
    confirmation?: string | undefined;
}
export interface TxStatus {
    status: string;
    slot: number;
}
export interface GetTxDetailsRequest {
    signature: string;
    commitment?: string | undefined;
}
export interface TxDetails {
    stringified: string;
}
export interface GetTxCostRequest {
    signature: string;
    denom?: Denom | undefined;
}
export interface TxCost {
    txCost: number;
    denom: string;
}
export declare const TxIxAccount: MessageFns<TxIxAccount>;
export declare const TxIx: MessageFns<TxIx>;
export declare const GenerateHashedArrayRequest: MessageFns<GenerateHashedArrayRequest>;
export declare const HashedArrayResponse: MessageFns<HashedArrayResponse>;
export declare const BuildEd25519IxRequest: MessageFns<BuildEd25519IxRequest>;
export declare const Ed25519Pair: MessageFns<Ed25519Pair>;
export declare const GetBalanceRequest: MessageFns<GetBalanceRequest>;
export declare const GetBalancesRequest: MessageFns<GetBalancesRequest>;
export declare const GetAddressRequest: MessageFns<GetAddressRequest>;
export declare const AddressResponse: MessageFns<AddressResponse>;
export declare const Asset: MessageFns<Asset>;
export declare const Balance: MessageFns<Balance>;
export declare const BalancesItem: MessageFns<BalancesItem>;
export declare const BalancesItem_BalancesEntry: MessageFns<BalancesItem_BalancesEntry>;
export declare const Balances: MessageFns<Balances>;
export declare const GetAccountInfoRequest: MessageFns<GetAccountInfoRequest>;
export declare const AccountInfoResponse: MessageFns<AccountInfoResponse>;
export declare const GetOwnerRequest: MessageFns<GetOwnerRequest>;
export declare const GetOwnerResponse: MessageFns<GetOwnerResponse>;
export declare const GetTokenAccountOwnerRequest: MessageFns<GetTokenAccountOwnerRequest>;
export declare const TokenAccountOwnerResponse: MessageFns<TokenAccountOwnerResponse>;
export declare const GetAtaAddressRequest: MessageFns<GetAtaAddressRequest>;
export declare const AtaAddressResponse: MessageFns<AtaAddressResponse>;
export declare const GetOrCreateAtaRequest: MessageFns<GetOrCreateAtaRequest>;
export declare const GetOrCreateAtaResponse: MessageFns<GetOrCreateAtaResponse>;
export declare const ExecuteTxRequest: MessageFns<ExecuteTxRequest>;
export declare const ExecuteTxResponse: MessageFns<ExecuteTxResponse>;
export declare const GetTxStatusRequest: MessageFns<GetTxStatusRequest>;
export declare const TxStatus: MessageFns<TxStatus>;
export declare const GetTxDetailsRequest: MessageFns<GetTxDetailsRequest>;
export declare const TxDetails: MessageFns<TxDetails>;
export declare const GetTxCostRequest: MessageFns<GetTxCostRequest>;
export declare const TxCost: MessageFns<TxCost>;
export type BaseDefinition = typeof BaseDefinition;
export declare const BaseDefinition: {
    readonly name: "Base";
    readonly fullName: "base.Base";
    readonly methods: {
        readonly generateHashedArray: {
            readonly name: "GenerateHashedArray";
            readonly requestType: typeof GenerateHashedArrayRequest;
            readonly requestStream: false;
            readonly responseType: typeof HashedArrayResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly buildEd25519Ix: {
            readonly name: "BuildEd25519Ix";
            readonly requestType: typeof BuildEd25519IxRequest;
            readonly requestStream: false;
            readonly responseType: typeof Ed25519Pair;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getBalance: {
            readonly name: "GetBalance";
            readonly requestType: typeof GetBalanceRequest;
            readonly requestStream: false;
            readonly responseType: typeof Balance;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getBalances: {
            readonly name: "GetBalances";
            readonly requestType: typeof GetBalancesRequest;
            readonly requestStream: false;
            readonly responseType: typeof Balances;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getAddress: {
            readonly name: "GetAddress";
            readonly requestType: typeof GetAddressRequest;
            readonly requestStream: false;
            readonly responseType: typeof AddressResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getAccountInfo: {
            readonly name: "GetAccountInfo";
            readonly requestType: typeof GetAccountInfoRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountInfoResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getOwner: {
            readonly name: "GetOwner";
            readonly requestType: typeof GetOwnerRequest;
            readonly requestStream: false;
            readonly responseType: typeof GetOwnerResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getTokenAccountOwner: {
            readonly name: "GetTokenAccountOwner";
            readonly requestType: typeof GetTokenAccountOwnerRequest;
            readonly requestStream: false;
            readonly responseType: typeof TokenAccountOwnerResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getAtaAddress: {
            readonly name: "GetAtaAddress";
            readonly requestType: typeof GetAtaAddressRequest;
            readonly requestStream: false;
            readonly responseType: typeof AtaAddressResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getOrCreateAta: {
            readonly name: "GetOrCreateAta";
            readonly requestType: typeof GetOrCreateAtaRequest;
            readonly requestStream: false;
            readonly responseType: typeof GetOrCreateAtaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly executeTx: {
            readonly name: "ExecuteTx";
            readonly requestType: typeof ExecuteTxRequest;
            readonly requestStream: false;
            readonly responseType: typeof ExecuteTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getTxStatus: {
            readonly name: "GetTxStatus";
            readonly requestType: typeof GetTxStatusRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxStatus;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getTxDetails: {
            readonly name: "GetTxDetails";
            readonly requestType: typeof GetTxDetailsRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxDetails;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getTxCost: {
            readonly name: "GetTxCost";
            readonly requestType: typeof GetTxCostRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxCost;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
export interface BaseServiceImplementation<CallContextExt = {}> {
    generateHashedArray(request: GenerateHashedArrayRequest, context: CallContext & CallContextExt): Promise<DeepPartial<HashedArrayResponse>>;
    buildEd25519Ix(request: BuildEd25519IxRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Ed25519Pair>>;
    getBalance(request: GetBalanceRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Balance>>;
    getBalances(request: GetBalancesRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Balances>>;
    getAddress(request: GetAddressRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AddressResponse>>;
    getAccountInfo(request: GetAccountInfoRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountInfoResponse>>;
    getOwner(request: GetOwnerRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetOwnerResponse>>;
    getTokenAccountOwner(request: GetTokenAccountOwnerRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TokenAccountOwnerResponse>>;
    getAtaAddress(request: GetAtaAddressRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AtaAddressResponse>>;
    getOrCreateAta(request: GetOrCreateAtaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetOrCreateAtaResponse>>;
    executeTx(request: ExecuteTxRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ExecuteTxResponse>>;
    getTxStatus(request: GetTxStatusRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxStatus>>;
    getTxDetails(request: GetTxDetailsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxDetails>>;
    getTxCost(request: GetTxCostRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxCost>>;
}
export interface BaseClient<CallOptionsExt = {}> {
    generateHashedArray(request: DeepPartial<GenerateHashedArrayRequest>, options?: CallOptions & CallOptionsExt): Promise<HashedArrayResponse>;
    buildEd25519Ix(request: DeepPartial<BuildEd25519IxRequest>, options?: CallOptions & CallOptionsExt): Promise<Ed25519Pair>;
    getBalance(request: DeepPartial<GetBalanceRequest>, options?: CallOptions & CallOptionsExt): Promise<Balance>;
    getBalances(request: DeepPartial<GetBalancesRequest>, options?: CallOptions & CallOptionsExt): Promise<Balances>;
    getAddress(request: DeepPartial<GetAddressRequest>, options?: CallOptions & CallOptionsExt): Promise<AddressResponse>;
    getAccountInfo(request: DeepPartial<GetAccountInfoRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountInfoResponse>;
    getOwner(request: DeepPartial<GetOwnerRequest>, options?: CallOptions & CallOptionsExt): Promise<GetOwnerResponse>;
    getTokenAccountOwner(request: DeepPartial<GetTokenAccountOwnerRequest>, options?: CallOptions & CallOptionsExt): Promise<TokenAccountOwnerResponse>;
    getAtaAddress(request: DeepPartial<GetAtaAddressRequest>, options?: CallOptions & CallOptionsExt): Promise<AtaAddressResponse>;
    getOrCreateAta(request: DeepPartial<GetOrCreateAtaRequest>, options?: CallOptions & CallOptionsExt): Promise<GetOrCreateAtaResponse>;
    executeTx(request: DeepPartial<ExecuteTxRequest>, options?: CallOptions & CallOptionsExt): Promise<ExecuteTxResponse>;
    getTxStatus(request: DeepPartial<GetTxStatusRequest>, options?: CallOptions & CallOptionsExt): Promise<TxStatus>;
    getTxDetails(request: DeepPartial<GetTxDetailsRequest>, options?: CallOptions & CallOptionsExt): Promise<TxDetails>;
    getTxCost(request: DeepPartial<GetTxCostRequest>, options?: CallOptions & CallOptionsExt): Promise<TxCost>;
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
//# sourceMappingURL=base.d.ts.map