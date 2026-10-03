import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token } from './base.mjs';

declare const protobufPackage = "evm";
interface GetChainByNameRequest {
    name: string;
}
declare const GetChainByNameRequest: MessageFns<GetChainByNameRequest>;
interface GetChainByIdRequest {
    id: number;
}
declare const GetChainByIdRequest: MessageFns<GetChainByIdRequest>;
interface ChainDetails {
    id: number;
    name: string;
    shortName: string;
    ogName: string;
}
declare const ChainDetails: MessageFns<ChainDetails>;
interface GetTokenDetailsRequest {
    token: Token;
    chainId?: number | undefined;
    chainName?: string | undefined;
}
declare const GetTokenDetailsRequest: MessageFns<GetTokenDetailsRequest>;
interface TokenDetails {
    symbol: string;
    address: string;
    decimals: number;
    chain?: ChainDetails | undefined;
}
declare const TokenDetails: MessageFns<TokenDetails>;
interface GetAllChainsRequest {
}
declare const GetAllChainsRequest: MessageFns<GetAllChainsRequest>;
interface AllChains {
    chains: ChainDetails[];
}
declare const AllChains: MessageFns<AllChains>;
interface GetAllTokensRequest {
}
declare const GetAllTokensRequest: MessageFns<GetAllTokensRequest>;
interface AllTokens {
    tokens: TokenDetails[];
}
declare const AllTokens: MessageFns<AllTokens>;
type EvmDefinition = typeof EvmDefinition;
declare const EvmDefinition: {
    readonly name: "Evm";
    readonly fullName: "evm.Evm";
    readonly methods: {
        readonly getChainByName: {
            readonly name: "GetChainByName";
            readonly requestType: typeof GetChainByNameRequest;
            readonly requestStream: false;
            readonly responseType: typeof ChainDetails;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getChainById: {
            readonly name: "GetChainById";
            readonly requestType: typeof GetChainByIdRequest;
            readonly requestStream: false;
            readonly responseType: typeof ChainDetails;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getTokenDetails: {
            readonly name: "GetTokenDetails";
            readonly requestType: typeof GetTokenDetailsRequest;
            readonly requestStream: false;
            readonly responseType: typeof TokenDetails;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getAllChains: {
            readonly name: "GetAllChains";
            readonly requestType: typeof GetAllChainsRequest;
            readonly requestStream: false;
            readonly responseType: typeof AllChains;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getAllTokens: {
            readonly name: "GetAllTokens";
            readonly requestType: typeof GetAllTokensRequest;
            readonly requestStream: false;
            readonly responseType: typeof AllTokens;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
interface EvmServiceImplementation<CallContextExt = {}> {
    getChainByName(request: GetChainByNameRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ChainDetails>>;
    getChainById(request: GetChainByIdRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ChainDetails>>;
    getTokenDetails(request: GetTokenDetailsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TokenDetails>>;
    getAllChains(request: GetAllChainsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AllChains>>;
    getAllTokens(request: GetAllTokensRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AllTokens>>;
}
interface EvmClient<CallOptionsExt = {}> {
    getChainByName(request: DeepPartial<GetChainByNameRequest>, options?: CallOptions & CallOptionsExt): Promise<ChainDetails>;
    getChainById(request: DeepPartial<GetChainByIdRequest>, options?: CallOptions & CallOptionsExt): Promise<ChainDetails>;
    getTokenDetails(request: DeepPartial<GetTokenDetailsRequest>, options?: CallOptions & CallOptionsExt): Promise<TokenDetails>;
    getAllChains(request: DeepPartial<GetAllChainsRequest>, options?: CallOptions & CallOptionsExt): Promise<AllChains>;
    getAllTokens(request: DeepPartial<GetAllTokensRequest>, options?: CallOptions & CallOptionsExt): Promise<AllTokens>;
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

export { AllChains, AllTokens, ChainDetails, type DeepPartial, type EvmClient, EvmDefinition, type EvmServiceImplementation, type Exact, GetAllChainsRequest, GetAllTokensRequest, GetChainByIdRequest, GetChainByNameRequest, GetTokenDetailsRequest, type MessageFns, TokenDetails, protobufPackage };
