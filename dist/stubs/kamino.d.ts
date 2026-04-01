import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
import { Token } from "./base";
export declare const protobufPackage = "kamino";
export interface BorrowCapacityRequest {
}
export interface BorrowCapacityResponse {
    borrowCapacity: number;
}
export interface GetStatsRequest {
}
export interface RefreshStatsRequest {
}
export interface StatsResponse {
    collateralDeposited: number;
    borrowLimit: number;
    collateralUtilization: number;
    borrowCapacity: number;
    totalBorrowed: number;
    ltv: number;
    depositTvl: number;
    borrowTvl: number;
    accumulatedProtocolFees: number;
    liquidityAvailable: number;
    misc?: {
        [key: string]: any;
    } | undefined;
}
export interface CbrRequest {
    token?: Token | undefined;
}
export interface CbrResponse {
    cumulativeBorrowRate: number;
}
export interface EstimateYieldRequest {
    amount: string;
    prevCumulativeBorrowRate: string;
    token?: Token | undefined;
}
export interface EstimateYieldResponse {
    yieldEstimate: number;
}
export interface DepositRequest {
    amount: string;
    token?: Token | undefined;
}
export interface BorrowRequest {
    requestId: string;
    amount: string;
    token?: Token | undefined;
}
export interface RepayRequest {
    requestId: string;
    amount: string;
    token?: Token | undefined;
}
export interface WithdrawRequest {
    amount: string;
    token?: Token | undefined;
}
export interface DepositCollateralRequest {
    amount: string;
}
export interface KaminoTx {
    amount: string;
    asset: string;
    txType: string;
    signature: string;
    txCost: number;
    timeStamp: number;
    requestId?: string | undefined;
}
export declare const BorrowCapacityRequest: MessageFns<BorrowCapacityRequest>;
export declare const BorrowCapacityResponse: MessageFns<BorrowCapacityResponse>;
export declare const GetStatsRequest: MessageFns<GetStatsRequest>;
export declare const RefreshStatsRequest: MessageFns<RefreshStatsRequest>;
export declare const StatsResponse: MessageFns<StatsResponse>;
export declare const CbrRequest: MessageFns<CbrRequest>;
export declare const CbrResponse: MessageFns<CbrResponse>;
export declare const EstimateYieldRequest: MessageFns<EstimateYieldRequest>;
export declare const EstimateYieldResponse: MessageFns<EstimateYieldResponse>;
export declare const DepositRequest: MessageFns<DepositRequest>;
export declare const BorrowRequest: MessageFns<BorrowRequest>;
export declare const RepayRequest: MessageFns<RepayRequest>;
export declare const WithdrawRequest: MessageFns<WithdrawRequest>;
export declare const DepositCollateralRequest: MessageFns<DepositCollateralRequest>;
export declare const KaminoTx: MessageFns<KaminoTx>;
export type KaminoDefinition = typeof KaminoDefinition;
export declare const KaminoDefinition: {
    readonly name: "Kamino";
    readonly fullName: "kamino.Kamino";
    readonly methods: {
        readonly getBorrowCapacity: {
            readonly name: "GetBorrowCapacity";
            readonly requestType: typeof BorrowCapacityRequest;
            readonly requestStream: false;
            readonly responseType: typeof BorrowCapacityResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getStats: {
            readonly name: "GetStats";
            readonly requestType: typeof GetStatsRequest;
            readonly requestStream: false;
            readonly responseType: typeof StatsResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly refreshStats: {
            readonly name: "RefreshStats";
            readonly requestType: typeof RefreshStatsRequest;
            readonly requestStream: false;
            readonly responseType: typeof StatsResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getCumulativeBorrowRate: {
            readonly name: "GetCumulativeBorrowRate";
            readonly requestType: typeof CbrRequest;
            readonly requestStream: false;
            readonly responseType: typeof CbrResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly estimateYield: {
            readonly name: "EstimateYield";
            readonly requestType: typeof EstimateYieldRequest;
            readonly requestStream: false;
            readonly responseType: typeof EstimateYieldResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly deposit: {
            readonly name: "Deposit";
            readonly requestType: typeof DepositRequest;
            readonly requestStream: false;
            readonly responseType: typeof KaminoTx;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly borrow: {
            readonly name: "Borrow";
            readonly requestType: typeof BorrowRequest;
            readonly requestStream: false;
            readonly responseType: typeof KaminoTx;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly repay: {
            readonly name: "Repay";
            readonly requestType: typeof RepayRequest;
            readonly requestStream: false;
            readonly responseType: typeof KaminoTx;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly withdraw: {
            readonly name: "Withdraw";
            readonly requestType: typeof WithdrawRequest;
            readonly requestStream: false;
            readonly responseType: typeof KaminoTx;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly depositCollateral: {
            readonly name: "DepositCollateral";
            readonly requestType: typeof DepositCollateralRequest;
            readonly requestStream: false;
            readonly responseType: typeof KaminoTx;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
export interface KaminoServiceImplementation<CallContextExt = {}> {
    getBorrowCapacity(request: BorrowCapacityRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BorrowCapacityResponse>>;
    getStats(request: GetStatsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<StatsResponse>>;
    refreshStats(request: RefreshStatsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<StatsResponse>>;
    getCumulativeBorrowRate(request: CbrRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CbrResponse>>;
    estimateYield(request: EstimateYieldRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EstimateYieldResponse>>;
    deposit(request: DepositRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KaminoTx>>;
    borrow(request: BorrowRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KaminoTx>>;
    repay(request: RepayRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KaminoTx>>;
    withdraw(request: WithdrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KaminoTx>>;
    depositCollateral(request: DepositCollateralRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KaminoTx>>;
}
export interface KaminoClient<CallOptionsExt = {}> {
    getBorrowCapacity(request: DeepPartial<BorrowCapacityRequest>, options?: CallOptions & CallOptionsExt): Promise<BorrowCapacityResponse>;
    getStats(request: DeepPartial<GetStatsRequest>, options?: CallOptions & CallOptionsExt): Promise<StatsResponse>;
    refreshStats(request: DeepPartial<RefreshStatsRequest>, options?: CallOptions & CallOptionsExt): Promise<StatsResponse>;
    getCumulativeBorrowRate(request: DeepPartial<CbrRequest>, options?: CallOptions & CallOptionsExt): Promise<CbrResponse>;
    estimateYield(request: DeepPartial<EstimateYieldRequest>, options?: CallOptions & CallOptionsExt): Promise<EstimateYieldResponse>;
    deposit(request: DeepPartial<DepositRequest>, options?: CallOptions & CallOptionsExt): Promise<KaminoTx>;
    borrow(request: DeepPartial<BorrowRequest>, options?: CallOptions & CallOptionsExt): Promise<KaminoTx>;
    repay(request: DeepPartial<RepayRequest>, options?: CallOptions & CallOptionsExt): Promise<KaminoTx>;
    withdraw(request: DeepPartial<WithdrawRequest>, options?: CallOptions & CallOptionsExt): Promise<KaminoTx>;
    depositCollateral(request: DeepPartial<DepositCollateralRequest>, options?: CallOptions & CallOptionsExt): Promise<KaminoTx>;
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
