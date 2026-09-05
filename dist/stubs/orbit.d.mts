import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, DecodeEventRequest, EventData } from './base.mjs';

declare const protobufPackage = "orbit";
declare enum UserType {
    LP = 0,
    NCW = 1,
    ICV = 2,
    UNRECOGNIZED = -1
}
declare function userTypeFromJSON(object: any): UserType;
declare function userTypeToJSON(object: UserType): string;
declare enum WhitelistAction {
    ADD = 0,
    REMOVE = 1,
    UNRECOGNIZED = -1
}
declare function whitelistActionFromJSON(object: any): WhitelistAction;
declare function whitelistActionToJSON(object: WhitelistAction): string;
interface GetPdaRequest {
    key: string;
}
declare const GetPdaRequest: MessageFns<GetPdaRequest>;
interface GetPositionPdaRequest {
    userId: string;
    orderId: string;
}
declare const GetPositionPdaRequest: MessageFns<GetPositionPdaRequest>;
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
    vaultId?: string | undefined;
}
declare const DisburseRequest: MessageFns<DisburseRequest>;
interface MetaArg {
    key: string;
    value: string;
}
declare const MetaArg: MessageFns<MetaArg>;
interface PositionArgs {
    userId: string;
    amount: string;
    /** NCW only: vault id whose PDA holds the token delegate approval. */
    vaultId?: string | undefined;
    /** NCW only: wallet holding the source tokens. Defaults to the user PDA. */
    address?: string | undefined;
}
declare const PositionArgs: MessageFns<PositionArgs>;
interface PledgeRequest {
    userId: string;
    address: string;
    amount: string;
    token?: Token | undefined;
    requestId?: string | undefined;
}
declare const PledgeRequest: MessageFns<PledgeRequest>;
interface BorrowRequest {
    requestId: string;
    partnerId: string;
    beneficiary: string;
    amount: string;
    positions: PositionArgs[];
    token?: Token | undefined;
    zovId?: string | undefined;
    orderId?: string | undefined;
    meta: MetaArg[];
}
declare const BorrowRequest: MessageFns<BorrowRequest>;
interface RepayRequest {
    requestId: string;
    partnerId: string;
    amount: string;
    orderId: string;
    positions: PositionArgs[];
    token?: Token | undefined;
    zovId?: string | undefined;
    meta: MetaArg[];
}
declare const RepayRequest: MessageFns<RepayRequest>;
interface TxResponse {
    orderId: string;
    signature: string;
    position: number;
}
declare const TxResponse: MessageFns<TxResponse>;
interface LPState {
    status: string;
    pda: string;
    txPda?: string | undefined;
}
declare const LPState: MessageFns<LPState>;
/**
 * VerifyUser: read-only check – returns LPState for the user's Record PDA.
 * status = "active" when the user record exists, "unavailable" otherwise.
 */
interface VerifyUserRequest {
    userId: string;
}
declare const VerifyUserRequest: MessageFns<VerifyUserRequest>;
interface RegisterUserRequest {
    userId: string;
    userType: UserType;
    /**
     * 1 to 3 authorised wallet addresses. Missing slots are padded with the
     * system public key (11111111111111111111111111111111) on-chain.
     */
    wallets: string[];
    /** Unix timestamp string. Omit → i64::MAX (no lock). */
    cliffPeriod?: string | undefined;
    /** u32 cap. Omit → u32::MAX (uncapped). */
    maxDeposit?: number | undefined;
    memo?: string | undefined;
}
declare const RegisterUserRequest: MessageFns<RegisterUserRequest>;
interface RevokeRequest {
    userId: string;
    memo?: string | undefined;
}
declare const RevokeRequest: MessageFns<RevokeRequest>;
interface UpdatePartnerWhitelistRequest {
    userId: string;
    action: WhitelistAction;
    partnerId: number;
    memo?: string | undefined;
}
declare const UpdatePartnerWhitelistRequest: MessageFns<UpdatePartnerWhitelistRequest>;
interface UpdateWalletsRequest {
    userId: string;
    /**
     * 1 to 3 replacement wallet addresses. Missing slots are padded with the
     * system public key (11111111111111111111111111111111) on-chain.
     */
    wallets: string[];
    memo?: string | undefined;
}
declare const UpdateWalletsRequest: MessageFns<UpdateWalletsRequest>;
interface UpdateMaxPrincipalRequest {
    userId: string;
    maxDeposit: number;
    memo?: string | undefined;
}
declare const UpdateMaxPrincipalRequest: MessageFns<UpdateMaxPrincipalRequest>;
interface UpdateCliffPeriodRequest {
    userId: string;
    /** Unix timestamp string. Omit → preserves existing cliff on-chain. */
    cliffPeriod?: string | undefined;
    memo?: string | undefined;
}
declare const UpdateCliffPeriodRequest: MessageFns<UpdateCliffPeriodRequest>;
interface ApproveWithdrawRequest {
    userId: string;
    token?: Token | undefined;
    memo?: string | undefined;
}
declare const ApproveWithdrawRequest: MessageFns<ApproveWithdrawRequest>;
interface RejectWithdrawRequest {
    userId: string;
    memo?: string | undefined;
}
declare const RejectWithdrawRequest: MessageFns<RejectWithdrawRequest>;
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
        readonly getUserPda: {
            readonly name: "GetUserPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getWithdrawRequestPda: {
            readonly name: "GetWithdrawRequestPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getUpdateCliffPeriodRequestPda: {
            readonly name: "GetUpdateCliffPeriodRequestPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getPositionPda: {
            readonly name: "GetPositionPda";
            readonly requestType: typeof GetPositionPdaRequest;
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
        readonly pledge: {
            readonly name: "Pledge";
            readonly requestType: typeof PledgeRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly borrow: {
            readonly name: "Borrow";
            readonly requestType: typeof BorrowRequest;
            readonly requestStream: false;
            readonly responseType: typeof TxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly repay: {
            readonly name: "Repay";
            readonly requestType: typeof RepayRequest;
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
        /** ── LP / user-management (admin-signed, published via Squads) ──────────── */
        readonly verifyUser: {
            readonly name: "VerifyUser";
            readonly requestType: typeof VerifyUserRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly registerUser: {
            readonly name: "RegisterUser";
            readonly requestType: typeof RegisterUserRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly revokeLP: {
            readonly name: "RevokeLP";
            readonly requestType: typeof RevokeRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updatePartnerWhitelist: {
            readonly name: "UpdatePartnerWhitelist";
            readonly requestType: typeof UpdatePartnerWhitelistRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateWallets: {
            readonly name: "UpdateWallets";
            readonly requestType: typeof UpdateWalletsRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateMaxPrincipal: {
            readonly name: "UpdateMaxPrincipal";
            readonly requestType: typeof UpdateMaxPrincipalRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateCliffPeriod: {
            readonly name: "UpdateCliffPeriod";
            readonly requestType: typeof UpdateCliffPeriodRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly approveWithdraw: {
            readonly name: "ApproveWithdraw";
            readonly requestType: typeof ApproveWithdrawRequest;
            readonly requestStream: false;
            readonly responseType: typeof LPState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly rejectWithdraw: {
            readonly name: "RejectWithdraw";
            readonly requestType: typeof RejectWithdrawRequest;
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
    getUserPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getWithdrawRequestPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getUpdateCliffPeriodRequestPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getPositionPda(request: GetPositionPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    readOrderPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderData>>;
    collect(request: CollectRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    disburse(request: DisburseRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    pledge(request: PledgeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    borrow(request: BorrowRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    repay(request: RepayRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TxResponse>>;
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
    /** ── LP / user-management (admin-signed, published via Squads) ──────────── */
    verifyUser(request: VerifyUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    registerUser(request: RegisterUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    revokeLP(request: RevokeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    updatePartnerWhitelist(request: UpdatePartnerWhitelistRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    updateWallets(request: UpdateWalletsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    updateMaxPrincipal(request: UpdateMaxPrincipalRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    updateCliffPeriod(request: UpdateCliffPeriodRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    approveWithdraw(request: ApproveWithdrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
    rejectWithdraw(request: RejectWithdrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LPState>>;
}
interface OrbitClient<CallOptionsExt = {}> {
    getVaultPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getOrderPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getUserPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getWithdrawRequestPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getUpdateCliffPeriodRequestPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getPositionPda(request: DeepPartial<GetPositionPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    readOrderPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderData>;
    collect(request: DeepPartial<CollectRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    disburse(request: DeepPartial<DisburseRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    pledge(request: DeepPartial<PledgeRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    borrow(request: DeepPartial<BorrowRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    repay(request: DeepPartial<RepayRequest>, options?: CallOptions & CallOptionsExt): Promise<TxResponse>;
    decodeEvent(request: DeepPartial<DecodeEventRequest>, options?: CallOptions & CallOptionsExt): Promise<EventData>;
    /** ── LP / user-management (admin-signed, published via Squads) ──────────── */
    verifyUser(request: DeepPartial<VerifyUserRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    registerUser(request: DeepPartial<RegisterUserRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    revokeLP(request: DeepPartial<RevokeRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    updatePartnerWhitelist(request: DeepPartial<UpdatePartnerWhitelistRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    updateWallets(request: DeepPartial<UpdateWalletsRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    updateMaxPrincipal(request: DeepPartial<UpdateMaxPrincipalRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    updateCliffPeriod(request: DeepPartial<UpdateCliffPeriodRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    approveWithdraw(request: DeepPartial<ApproveWithdrawRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
    rejectWithdraw(request: DeepPartial<RejectWithdrawRequest>, options?: CallOptions & CallOptionsExt): Promise<LPState>;
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

export { ApproveWithdrawRequest, BorrowRequest, CollectRequest, type DeepPartial, DisburseRequest, type Exact, GetPdaRequest, GetPositionPdaRequest, LPState, type MessageFns, MetaArg, type OrbitClient, OrbitDefinition, type OrbitServiceImplementation, OrderData, PdaResponse, PledgeRequest, PositionArgs, RegisterUserRequest, RejectWithdrawRequest, RepayRequest, RevokeRequest, TxResponse, UpdateCliffPeriodRequest, UpdateMaxPrincipalRequest, UpdatePartnerWhitelistRequest, UpdateWalletsRequest, UserType, VerifyUserRequest, WhitelistAction, protobufPackage, userTypeFromJSON, userTypeToJSON, whitelistActionFromJSON, whitelistActionToJSON };
