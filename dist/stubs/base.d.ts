import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';

declare const protobufPackage = "base";
declare enum Token {
    USDC = 0,
    USDT = 1,
    PYUSD = 2,
    USD1 = 3,
    RLUSD = 4,
    UNRECOGNIZED = -1
}
declare function tokenFromJSON(object: any): Token;
declare function tokenToJSON(object: Token): string;
declare enum Denom {
    LAMPORTS = 0,
    SOL = 1,
    UNRECOGNIZED = -1
}
declare function denomFromJSON(object: any): Denom;
declare function denomToJSON(object: Denom): string;
interface TxIxAccount {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
}
declare const TxIxAccount: MessageFns<TxIxAccount>;
interface TxIx {
    programId: string;
    data: Buffer;
    keys: TxIxAccount[];
}
declare const TxIx: MessageFns<TxIx>;
interface GenerateHashedArrayRequest {
    input: string;
}
declare const GenerateHashedArrayRequest: MessageFns<GenerateHashedArrayRequest>;
interface HashedArrayResponse {
    hashed: Buffer;
}
declare const HashedArrayResponse: MessageFns<HashedArrayResponse>;
interface BuildEd25519IxRequest {
    message: string;
    signer: string;
}
declare const BuildEd25519IxRequest: MessageFns<BuildEd25519IxRequest>;
interface Ed25519Pair {
    ed25519Sig: Buffer;
    ed25519Ix?: TxIx | undefined;
}
declare const Ed25519Pair: MessageFns<Ed25519Pair>;
interface GetBalanceRequest {
    of: string;
    token?: Token | undefined;
}
declare const GetBalanceRequest: MessageFns<GetBalanceRequest>;
interface GetBalancesRequest {
    of: string[];
    token?: Token | undefined;
}
declare const GetBalancesRequest: MessageFns<GetBalancesRequest>;
interface GetAddressRequest {
    key: string;
}
declare const GetAddressRequest: MessageFns<GetAddressRequest>;
interface AddressResponse {
    address: string;
    key: string;
}
declare const AddressResponse: MessageFns<AddressResponse>;
interface Asset {
    symbol: string;
    address?: string | undefined;
    token?: Token | undefined;
}
declare const Asset: MessageFns<Asset>;
interface Balance {
    amount: string;
    uiAmount: string;
    of?: string | undefined;
    address?: string | undefined;
    asset?: Asset | undefined;
}
declare const Balance: MessageFns<Balance>;
interface BalancesItem {
    of: string;
    address: string;
    balances: {
        [key: string]: Balance;
    };
}
declare const BalancesItem: MessageFns<BalancesItem>;
interface BalancesItem_BalancesEntry {
    key: string;
    value?: Balance | undefined;
}
declare const BalancesItem_BalancesEntry: MessageFns<BalancesItem_BalancesEntry>;
interface Balances {
    data: BalancesItem[];
}
declare const Balances: MessageFns<Balances>;
interface GetAccountInfoRequest {
    address: string;
}
declare const GetAccountInfoRequest: MessageFns<GetAccountInfoRequest>;
interface AccountInfoResponse {
    owner?: string | undefined;
    lamports?: number | undefined;
    data?: Buffer | undefined;
    executable?: boolean | undefined;
}
declare const AccountInfoResponse: MessageFns<AccountInfoResponse>;
interface GetOwnerRequest {
    address: string;
}
declare const GetOwnerRequest: MessageFns<GetOwnerRequest>;
interface GetOwnerResponse {
    owner: string;
}
declare const GetOwnerResponse: MessageFns<GetOwnerResponse>;
interface GetTokenAccountOwnerRequest {
    address: string;
}
declare const GetTokenAccountOwnerRequest: MessageFns<GetTokenAccountOwnerRequest>;
interface TokenAccountOwnerResponse {
    owner: string;
}
declare const TokenAccountOwnerResponse: MessageFns<TokenAccountOwnerResponse>;
interface GetAtaAddressRequest {
    token: Token;
    owner: string;
}
declare const GetAtaAddressRequest: MessageFns<GetAtaAddressRequest>;
interface AtaAddressResponse {
    ata: string;
}
declare const AtaAddressResponse: MessageFns<AtaAddressResponse>;
interface GetOrCreateAtaRequest {
    token: Token;
    owner: string;
    maxAttempts?: number | undefined;
}
declare const GetOrCreateAtaRequest: MessageFns<GetOrCreateAtaRequest>;
interface GetOrCreateAtaResponse {
    ata: string;
    tokenAccount?: AccountInfoResponse | undefined;
    signature?: string | undefined;
}
declare const GetOrCreateAtaResponse: MessageFns<GetOrCreateAtaResponse>;
interface ExecuteTxRequest {
    requestId: string;
    ixs: TxIx[];
    signers: string[];
}
declare const ExecuteTxRequest: MessageFns<ExecuteTxRequest>;
interface ExecuteTxResponse {
    requestId: string;
    signature: string;
}
declare const ExecuteTxResponse: MessageFns<ExecuteTxResponse>;
interface GetTxStatusRequest {
    signature: string;
    confirmation?: string | undefined;
}
declare const GetTxStatusRequest: MessageFns<GetTxStatusRequest>;
interface TxStatus {
    status: string;
    slot: number;
}
declare const TxStatus: MessageFns<TxStatus>;
interface GetTxDetailsRequest {
    signature: string;
    commitment?: string | undefined;
}
declare const GetTxDetailsRequest: MessageFns<GetTxDetailsRequest>;
interface TxDetails {
    stringified: string;
}
declare const TxDetails: MessageFns<TxDetails>;
interface GetTxCostRequest {
    signature: string;
    denom?: Denom | undefined;
}
declare const GetTxCostRequest: MessageFns<GetTxCostRequest>;
interface TxCost {
    txCost: number;
    denom: string;
}
declare const TxCost: MessageFns<TxCost>;
interface DecodeEventRequest {
    signature: string;
    eventName?: string | undefined;
}
declare const DecodeEventRequest: MessageFns<DecodeEventRequest>;
interface EventData {
    eventName: string;
    ixName: string;
    content?: {
        [key: string]: any;
    } | undefined;
}
declare const EventData: MessageFns<EventData>;
interface GetAssetPriceRequest {
    currency: string;
    token?: Token | undefined;
    native?: string | undefined;
}
declare const GetAssetPriceRequest: MessageFns<GetAssetPriceRequest>;
interface AssetPrice {
    price: string;
    symbol: string;
    conversionRate: string;
}
declare const AssetPrice: MessageFns<AssetPrice>;
type BaseDefinition = typeof BaseDefinition;
declare const BaseDefinition: {
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
        readonly getAssetPrice: {
            readonly name: "GetAssetPrice";
            readonly requestType: typeof GetAssetPriceRequest;
            readonly requestStream: false;
            readonly responseType: typeof AssetPrice;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
interface BaseServiceImplementation<CallContextExt = {}> {
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
    getAssetPrice(request: GetAssetPriceRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AssetPrice>>;
}
interface BaseClient<CallOptionsExt = {}> {
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
    getAssetPrice(request: DeepPartial<GetAssetPriceRequest>, options?: CallOptions & CallOptionsExt): Promise<AssetPrice>;
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

export { AccountInfoResponse, AddressResponse, Asset, AssetPrice, AtaAddressResponse, Balance, Balances, BalancesItem, BalancesItem_BalancesEntry, type BaseClient, BaseDefinition, type BaseServiceImplementation, BuildEd25519IxRequest, DecodeEventRequest, type DeepPartial, Denom, Ed25519Pair, EventData, type Exact, ExecuteTxRequest, ExecuteTxResponse, GenerateHashedArrayRequest, GetAccountInfoRequest, GetAddressRequest, GetAssetPriceRequest, GetAtaAddressRequest, GetBalanceRequest, GetBalancesRequest, GetOrCreateAtaRequest, GetOrCreateAtaResponse, GetOwnerRequest, GetOwnerResponse, GetTokenAccountOwnerRequest, GetTxCostRequest, GetTxDetailsRequest, GetTxStatusRequest, HashedArrayResponse, type MessageFns, Token, TokenAccountOwnerResponse, TxCost, TxDetails, TxIx, TxIxAccount, TxStatus, denomFromJSON, denomToJSON, protobufPackage, tokenFromJSON, tokenToJSON };
