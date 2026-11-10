import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { CallOptions, CallContext } from 'nice-grpc-common';
import { Token, EventData } from './base.js';

declare const protobufPackage = "evm";
declare enum WhitelistAction {
    ADD = 0,
    REMOVE = 1,
    UNRECOGNIZED = -1
}
declare function whitelistActionFromJSON(object: any): WhitelistAction;
declare function whitelistActionToJSON(object: WhitelistAction): string;
/** Atmos UserType. LP = 0 and ICV = 1. Solana also has NCW, which this diamond does not. */
declare enum UserType {
    LP = 0,
    ICV = 1,
    UNRECOGNIZED = -1
}
declare function userTypeFromJSON(object: any): UserType;
declare function userTypeToJSON(object: UserType): string;
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
interface ChainRequest {
    chainId: number;
}
declare const ChainRequest: MessageFns<ChainRequest>;
interface BeneficiaryRequest {
    chainId: number;
    partnerId: string;
    beneficiary: string;
    memo?: string | undefined;
    transient?: boolean | undefined;
}
declare const BeneficiaryRequest: MessageFns<BeneficiaryRequest>;
interface BeneficiaryState {
    status: string;
    recordKey: string;
    transientAllowed?: boolean | undefined;
    txHash?: string | undefined;
}
declare const BeneficiaryState: MessageFns<BeneficiaryState>;
interface UpdateWhitelistedTokenMintRequest {
    chainId: number;
    mint: string;
    action: WhitelistAction;
    memo?: string | undefined;
}
declare const UpdateWhitelistedTokenMintRequest: MessageFns<UpdateWhitelistedTokenMintRequest>;
interface TokenMintState {
    status: string;
    mints: string[];
    txHash?: string | undefined;
}
declare const TokenMintState: MessageFns<TokenMintState>;
interface UpdatePartnerWhitelistRequest {
    chainId: number;
    userId: string;
    action: WhitelistAction;
    partnerId: number;
    memo?: string | undefined;
}
declare const UpdatePartnerWhitelistRequest: MessageFns<UpdatePartnerWhitelistRequest>;
interface WhitelistState {
    status: string;
    recordKey: string;
    partnerIds: number[];
    txHash?: string | undefined;
}
declare const WhitelistState: MessageFns<WhitelistState>;
interface CctpRecipient {
    destinationDomain: number;
    mintRecipient: string;
}
declare const CctpRecipient: MessageFns<CctpRecipient>;
interface RequestCctpRecipientUpdateRequest {
    chainId: number;
    userId: string;
    action: WhitelistAction;
    recipient?: CctpRecipient | undefined;
    memo?: string | undefined;
}
declare const RequestCctpRecipientUpdateRequest: MessageFns<RequestCctpRecipientUpdateRequest>;
interface CctpRecipientDecisionRequest {
    chainId: number;
    userId: string;
    requestHash: string;
    memo?: string | undefined;
}
declare const CctpRecipientDecisionRequest: MessageFns<CctpRecipientDecisionRequest>;
interface GetCctpRecipientUpdateRequest {
    chainId: number;
    userId: string;
}
declare const GetCctpRecipientUpdateRequest: MessageFns<GetCctpRecipientUpdateRequest>;
interface CctpRecipientUpdateState {
    status: string;
    recordKey: string;
    exists: boolean;
    action: WhitelistAction;
    recipient?: CctpRecipient | undefined;
    requestHash: string;
    txHash?: string | undefined;
}
declare const CctpRecipientUpdateState: MessageFns<CctpRecipientUpdateState>;
interface OvaultCctpRecipientRequest {
    chainId: number;
    recipient?: CctpRecipient | undefined;
    memo?: string | undefined;
}
declare const OvaultCctpRecipientRequest: MessageFns<OvaultCctpRecipientRequest>;
interface MetaArg {
    key: string;
    value: string;
}
declare const MetaArg: MessageFns<MetaArg>;
interface CreateOrderRequest {
    chainId: number;
    requestId: string;
    partnerId: string;
    beneficiary: string;
    token: Token;
    amount: string;
    zovId?: string | undefined;
    transient?: boolean | undefined;
    pull?: boolean | undefined;
    meta: MetaArg[];
}
declare const CreateOrderRequest: MessageFns<CreateOrderRequest>;
interface ReplenishOrderRequest {
    chainId: number;
    requestId: string;
    partnerId: string;
    orderId: string;
    token: Token;
    amount: string;
    doNotClose?: boolean | undefined;
    meta: MetaArg[];
}
declare const ReplenishOrderRequest: MessageFns<ReplenishOrderRequest>;
interface OrderRef {
    partnerId: string;
    orderId: string;
}
declare const OrderRef: MessageFns<OrderRef>;
interface CloseOrderRequest {
    chainId: number;
    requestId: string;
    orders: OrderRef[];
    meta: MetaArg[];
}
declare const CloseOrderRequest: MessageFns<CloseOrderRequest>;
interface OrderTxResponse {
    requestId: string;
    orderKey: string;
    orderId: string;
    txHash: string;
    closed: boolean;
}
declare const OrderTxResponse: MessageFns<OrderTxResponse>;
interface CloseOrderResponse {
    requestId: string;
    orderKeys: string[];
    txHash: string;
}
declare const CloseOrderResponse: MessageFns<CloseOrderResponse>;
interface DepositRequest {
    chainId: number;
    requestId: string;
    userId: string;
    source: string;
    token: Token;
    amount: string;
}
declare const DepositRequest: MessageFns<DepositRequest>;
interface PositionArgs {
    userId: string;
    amount?: string | undefined;
    vaultId?: string | undefined;
    address?: string | undefined;
}
declare const PositionArgs: MessageFns<PositionArgs>;
interface BorrowRequest {
    chainId: number;
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
    chainId: number;
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
interface WithdrawRequest {
    chainId: number;
    requestId: string;
    userId: string;
    destination: string;
    token: Token;
    amount: string;
}
declare const WithdrawRequest: MessageFns<WithdrawRequest>;
interface WithdrawActionRequest {
    chainId: number;
    requestId: string;
    userId: string;
}
declare const WithdrawActionRequest: MessageFns<WithdrawActionRequest>;
interface GetWithdrawRequestRequest {
    chainId: number;
    userId: string;
}
declare const GetWithdrawRequestRequest: MessageFns<GetWithdrawRequestRequest>;
interface GetPdaRequest {
    chainId: number;
    key: string;
}
declare const GetPdaRequest: MessageFns<GetPdaRequest>;
interface PdaResponse {
    pda: string;
    key: string;
    type: string;
}
declare const PdaResponse: MessageFns<PdaResponse>;
interface VerifyUserRequest {
    chainId: number;
    userId: string;
}
declare const VerifyUserRequest: MessageFns<VerifyUserRequest>;
interface UserState {
    status: string;
    pda: string;
}
declare const UserState: MessageFns<UserState>;
interface AccountTxResponse {
    requestId: string;
    recordKey: string;
    txHash: string;
    status: string;
}
declare const AccountTxResponse: MessageFns<AccountTxResponse>;
interface WithdrawState {
    requestId: string;
    recordKey: string;
    status: string;
    amount: string;
    destination: string;
    mint: string;
    txHash?: string | undefined;
}
declare const WithdrawState: MessageFns<WithdrawState>;
interface RegisterUserRequest {
    chainId: number;
    userId: string;
    userType: UserType;
    /** One to three wallets. Empty slots are stored as the zero address. */
    wallets: string[];
    token: Token;
    /** Unix seconds. Omit for no cliff (int64 max on-chain). */
    cliffPeriod?: string | undefined;
    /** Human token units. Omit for no cap (uint64 max on-chain). */
    maxPrincipal?: string | undefined;
    partnerIds: number[];
    cctpRecipients: CctpRecipient[];
    /** Defaults to true. False selects the configured Solana USDC settlement route. */
    chainBound?: boolean | undefined;
    solanaMintRecipient?: string | undefined;
    requestId?: string | undefined;
}
declare const RegisterUserRequest: MessageFns<RegisterUserRequest>;
interface UpdateMaxPrincipalRequest {
    chainId: number;
    requestId: string;
    userId: string;
    /** Human token units of the user's allowed mint. */
    maxPrincipal: string;
}
declare const UpdateMaxPrincipalRequest: MessageFns<UpdateMaxPrincipalRequest>;
interface UpdateCliffPeriodRequest {
    chainId: number;
    requestId: string;
    userId: string;
    /** Unix seconds. Omit to keep the user's current cliff in the pending request. */
    cliffPeriod?: string | undefined;
}
declare const UpdateCliffPeriodRequest: MessageFns<UpdateCliffPeriodRequest>;
interface CliffActionRequest {
    chainId: number;
    requestId: string;
    userId: string;
}
declare const CliffActionRequest: MessageFns<CliffActionRequest>;
interface CliffState {
    requestId: string;
    recordKey: string;
    status: string;
    cliffPeriod: string;
    txHash?: string | undefined;
}
declare const CliffState: MessageFns<CliffState>;
interface PledgeRequest {
    chainId: number;
    requestId: string;
    userId: string;
    amount: string;
    token?: Token | undefined;
}
declare const PledgeRequest: MessageFns<PledgeRequest>;
interface DisburseRequest {
    chainId: number;
    requestId: string;
    userId: string;
    destination: string;
    amount: string;
    token?: Token | undefined;
}
declare const DisburseRequest: MessageFns<DisburseRequest>;
interface RequestWalletUpdateRequest {
    chainId: number;
    requestId: string;
    userId: string;
    /** One to three replacement wallets. Empty slots are stored as the zero address. */
    wallets: string[];
}
declare const RequestWalletUpdateRequest: MessageFns<RequestWalletUpdateRequest>;
interface WalletUpdateDecisionRequest {
    chainId: number;
    requestId: string;
    userId: string;
    requestHash: string;
}
declare const WalletUpdateDecisionRequest: MessageFns<WalletUpdateDecisionRequest>;
interface WalletUpdateState {
    requestId: string;
    recordKey: string;
    status: string;
    requestHash: string;
    wallets: string[];
    txHash?: string | undefined;
}
declare const WalletUpdateState: MessageFns<WalletUpdateState>;
interface DecodeEventRequest {
    chainId: number;
    signature: string;
    eventName?: string | undefined;
}
declare const DecodeEventRequest: MessageFns<DecodeEventRequest>;
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
        /** WhitelistingFacet — same beneficiary and partner flows as Core / Orbit on Solana. */
        readonly verifyBeneficiary: {
            readonly name: "VerifyBeneficiary";
            readonly requestType: typeof BeneficiaryRequest;
            readonly requestStream: false;
            readonly responseType: typeof BeneficiaryState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly whitelistBeneficiary: {
            readonly name: "WhitelistBeneficiary";
            readonly requestType: typeof BeneficiaryRequest;
            readonly requestStream: false;
            readonly responseType: typeof BeneficiaryState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly toggleBeneficiary: {
            readonly name: "ToggleBeneficiary";
            readonly requestType: typeof BeneficiaryRequest;
            readonly requestStream: false;
            readonly responseType: typeof BeneficiaryState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly revokeBeneficiary: {
            readonly name: "RevokeBeneficiary";
            readonly requestType: typeof BeneficiaryRequest;
            readonly requestStream: false;
            readonly responseType: typeof BeneficiaryState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly whitelistedMints: {
            readonly name: "WhitelistedMints";
            readonly requestType: typeof ChainRequest;
            readonly requestStream: false;
            readonly responseType: typeof TokenMintState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateWhitelistedTokenMint: {
            readonly name: "UpdateWhitelistedTokenMint";
            readonly requestType: typeof UpdateWhitelistedTokenMintRequest;
            readonly requestStream: false;
            readonly responseType: typeof TokenMintState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updatePartnerWhitelist: {
            readonly name: "UpdatePartnerWhitelist";
            readonly requestType: typeof UpdatePartnerWhitelistRequest;
            readonly requestStream: false;
            readonly responseType: typeof WhitelistState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly requestCctpRecipientUpdate: {
            readonly name: "RequestCctpRecipientUpdate";
            readonly requestType: typeof RequestCctpRecipientUpdateRequest;
            readonly requestStream: false;
            readonly responseType: typeof CctpRecipientUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly approveCctpRecipientUpdate: {
            readonly name: "ApproveCctpRecipientUpdate";
            readonly requestType: typeof CctpRecipientDecisionRequest;
            readonly requestStream: false;
            readonly responseType: typeof CctpRecipientUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly rejectCctpRecipientUpdate: {
            readonly name: "RejectCctpRecipientUpdate";
            readonly requestType: typeof CctpRecipientDecisionRequest;
            readonly requestStream: false;
            readonly responseType: typeof CctpRecipientUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getCctpRecipientUpdate: {
            readonly name: "GetCctpRecipientUpdate";
            readonly requestType: typeof GetCctpRecipientUpdateRequest;
            readonly requestStream: false;
            readonly responseType: typeof CctpRecipientUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly addOvaultCctpRecipient: {
            readonly name: "AddOvaultCctpRecipient";
            readonly requestType: typeof OvaultCctpRecipientRequest;
            readonly requestStream: false;
            readonly responseType: typeof WhitelistState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly removeOvaultCctpRecipient: {
            readonly name: "RemoveOvaultCctpRecipient";
            readonly requestType: typeof OvaultCctpRecipientRequest;
            readonly requestStream: false;
            readonly responseType: typeof WhitelistState;
            readonly responseStream: false;
            readonly options: {};
        };
        /** TransactionsFacet — same order flows as Core on Solana. */
        readonly createOrder: {
            readonly name: "CreateOrder";
            readonly requestType: typeof CreateOrderRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly replenishOrder: {
            readonly name: "ReplenishOrder";
            readonly requestType: typeof ReplenishOrderRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly closeOrder: {
            readonly name: "CloseOrder";
            readonly requestType: typeof CloseOrderRequest;
            readonly requestStream: false;
            readonly responseType: typeof CloseOrderResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        /** TransactionsFacet — Orbit borrow/repay and user liquidity. */
        readonly deposit: {
            readonly name: "Deposit";
            readonly requestType: typeof DepositRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly borrow: {
            readonly name: "Borrow";
            readonly requestType: typeof BorrowRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly repay: {
            readonly name: "Repay";
            readonly requestType: typeof RepayRequest;
            readonly requestStream: false;
            readonly responseType: typeof OrderTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly requestWithdraw: {
            readonly name: "RequestWithdraw";
            readonly requestType: typeof WithdrawRequest;
            readonly requestStream: false;
            readonly responseType: typeof WithdrawState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly approveWithdraw: {
            readonly name: "ApproveWithdraw";
            readonly requestType: typeof WithdrawActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof WithdrawState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly rejectWithdraw: {
            readonly name: "RejectWithdraw";
            readonly requestType: typeof WithdrawActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof WithdrawState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly readWithdrawRequestPda: {
            readonly name: "ReadWithdrawRequestPda";
            readonly requestType: typeof GetWithdrawRequestRequest;
            readonly requestStream: false;
            readonly responseType: typeof WithdrawState;
            readonly responseStream: false;
            readonly options: {};
        };
        /** Both return predictVault(UserCustody, orbitHash(key)). */
        readonly getUserPda: {
            readonly name: "GetUserPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly getVaultPda: {
            readonly name: "GetVaultPda";
            readonly requestType: typeof GetPdaRequest;
            readonly requestStream: false;
            readonly responseType: typeof PdaResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly verifyUser: {
            readonly name: "VerifyUser";
            readonly requestType: typeof VerifyUserRequest;
            readonly requestStream: false;
            readonly responseType: typeof UserState;
            readonly responseStream: false;
            readonly options: {};
        };
        /** UserOperationsFacet. Cliff updates stay pending until a user wallet approves them. */
        readonly registerUser: {
            readonly name: "RegisterUser";
            readonly requestType: typeof RegisterUserRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateMaxPrincipal: {
            readonly name: "UpdateMaxPrincipal";
            readonly requestType: typeof UpdateMaxPrincipalRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly updateCliffPeriod: {
            readonly name: "UpdateCliffPeriod";
            readonly requestType: typeof UpdateCliffPeriodRequest;
            readonly requestStream: false;
            readonly responseType: typeof CliffState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly approveCliffPeriod: {
            readonly name: "ApproveCliffPeriod";
            readonly requestType: typeof CliffActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof CliffState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly rejectCliffPeriod: {
            readonly name: "RejectCliffPeriod";
            readonly requestType: typeof CliffActionRequest;
            readonly requestStream: false;
            readonly responseType: typeof CliffState;
            readonly responseStream: false;
            readonly options: {};
        };
        /** UserOperationsFacet. Replaces Orbit updateWallets: the admin proposes, a current wallet approves. */
        readonly requestWalletUpdate: {
            readonly name: "RequestWalletUpdate";
            readonly requestType: typeof RequestWalletUpdateRequest;
            readonly requestStream: false;
            readonly responseType: typeof WalletUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly approveWalletUpdate: {
            readonly name: "ApproveWalletUpdate";
            readonly requestType: typeof WalletUpdateDecisionRequest;
            readonly requestStream: false;
            readonly responseType: typeof WalletUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly rejectWalletUpdate: {
            readonly name: "RejectWalletUpdate";
            readonly requestType: typeof WalletUpdateDecisionRequest;
            readonly requestStream: false;
            readonly responseType: typeof WalletUpdateState;
            readonly responseStream: false;
            readonly options: {};
        };
        /** TransactionsFacet. Pledge credits principal; disburse only transfers tokens. */
        readonly pledge: {
            readonly name: "Pledge";
            readonly requestType: typeof PledgeRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly disburse: {
            readonly name: "Disburse";
            readonly requestType: typeof DisburseRequest;
            readonly requestStream: false;
            readonly responseType: typeof AccountTxResponse;
            readonly responseStream: false;
            readonly options: {};
        };
        /** Same result as Solana decodeEvent. `signature` is the transaction hash. */
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
interface EvmServiceImplementation<CallContextExt = {}> {
    getChainByName(request: GetChainByNameRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ChainDetails>>;
    getChainById(request: GetChainByIdRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ChainDetails>>;
    getTokenDetails(request: GetTokenDetailsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TokenDetails>>;
    getAllChains(request: GetAllChainsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AllChains>>;
    getAllTokens(request: GetAllTokensRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AllTokens>>;
    /** WhitelistingFacet — same beneficiary and partner flows as Core / Orbit on Solana. */
    verifyBeneficiary(request: BeneficiaryRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BeneficiaryState>>;
    whitelistBeneficiary(request: BeneficiaryRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BeneficiaryState>>;
    toggleBeneficiary(request: BeneficiaryRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BeneficiaryState>>;
    revokeBeneficiary(request: BeneficiaryRequest, context: CallContext & CallContextExt): Promise<DeepPartial<BeneficiaryState>>;
    whitelistedMints(request: ChainRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TokenMintState>>;
    updateWhitelistedTokenMint(request: UpdateWhitelistedTokenMintRequest, context: CallContext & CallContextExt): Promise<DeepPartial<TokenMintState>>;
    updatePartnerWhitelist(request: UpdatePartnerWhitelistRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WhitelistState>>;
    requestCctpRecipientUpdate(request: RequestCctpRecipientUpdateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CctpRecipientUpdateState>>;
    approveCctpRecipientUpdate(request: CctpRecipientDecisionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CctpRecipientUpdateState>>;
    rejectCctpRecipientUpdate(request: CctpRecipientDecisionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CctpRecipientUpdateState>>;
    getCctpRecipientUpdate(request: GetCctpRecipientUpdateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CctpRecipientUpdateState>>;
    addOvaultCctpRecipient(request: OvaultCctpRecipientRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WhitelistState>>;
    removeOvaultCctpRecipient(request: OvaultCctpRecipientRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WhitelistState>>;
    /** TransactionsFacet — same order flows as Core on Solana. */
    createOrder(request: CreateOrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTxResponse>>;
    replenishOrder(request: ReplenishOrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTxResponse>>;
    closeOrder(request: CloseOrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CloseOrderResponse>>;
    /** TransactionsFacet — Orbit borrow/repay and user liquidity. */
    deposit(request: DepositRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountTxResponse>>;
    borrow(request: BorrowRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTxResponse>>;
    repay(request: RepayRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrderTxResponse>>;
    requestWithdraw(request: WithdrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WithdrawState>>;
    approveWithdraw(request: WithdrawActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WithdrawState>>;
    rejectWithdraw(request: WithdrawActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WithdrawState>>;
    readWithdrawRequestPda(request: GetWithdrawRequestRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WithdrawState>>;
    /** Both return predictVault(UserCustody, orbitHash(key)). */
    getUserPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    getVaultPda(request: GetPdaRequest, context: CallContext & CallContextExt): Promise<DeepPartial<PdaResponse>>;
    verifyUser(request: VerifyUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UserState>>;
    /** UserOperationsFacet. Cliff updates stay pending until a user wallet approves them. */
    registerUser(request: RegisterUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountTxResponse>>;
    updateMaxPrincipal(request: UpdateMaxPrincipalRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountTxResponse>>;
    updateCliffPeriod(request: UpdateCliffPeriodRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CliffState>>;
    approveCliffPeriod(request: CliffActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CliffState>>;
    rejectCliffPeriod(request: CliffActionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CliffState>>;
    /** UserOperationsFacet. Replaces Orbit updateWallets: the admin proposes, a current wallet approves. */
    requestWalletUpdate(request: RequestWalletUpdateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WalletUpdateState>>;
    approveWalletUpdate(request: WalletUpdateDecisionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WalletUpdateState>>;
    rejectWalletUpdate(request: WalletUpdateDecisionRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WalletUpdateState>>;
    /** TransactionsFacet. Pledge credits principal; disburse only transfers tokens. */
    pledge(request: PledgeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountTxResponse>>;
    disburse(request: DisburseRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AccountTxResponse>>;
    /** Same result as Solana decodeEvent. `signature` is the transaction hash. */
    decodeEvent(request: DecodeEventRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EventData>>;
}
interface EvmClient<CallOptionsExt = {}> {
    getChainByName(request: DeepPartial<GetChainByNameRequest>, options?: CallOptions & CallOptionsExt): Promise<ChainDetails>;
    getChainById(request: DeepPartial<GetChainByIdRequest>, options?: CallOptions & CallOptionsExt): Promise<ChainDetails>;
    getTokenDetails(request: DeepPartial<GetTokenDetailsRequest>, options?: CallOptions & CallOptionsExt): Promise<TokenDetails>;
    getAllChains(request: DeepPartial<GetAllChainsRequest>, options?: CallOptions & CallOptionsExt): Promise<AllChains>;
    getAllTokens(request: DeepPartial<GetAllTokensRequest>, options?: CallOptions & CallOptionsExt): Promise<AllTokens>;
    /** WhitelistingFacet — same beneficiary and partner flows as Core / Orbit on Solana. */
    verifyBeneficiary(request: DeepPartial<BeneficiaryRequest>, options?: CallOptions & CallOptionsExt): Promise<BeneficiaryState>;
    whitelistBeneficiary(request: DeepPartial<BeneficiaryRequest>, options?: CallOptions & CallOptionsExt): Promise<BeneficiaryState>;
    toggleBeneficiary(request: DeepPartial<BeneficiaryRequest>, options?: CallOptions & CallOptionsExt): Promise<BeneficiaryState>;
    revokeBeneficiary(request: DeepPartial<BeneficiaryRequest>, options?: CallOptions & CallOptionsExt): Promise<BeneficiaryState>;
    whitelistedMints(request: DeepPartial<ChainRequest>, options?: CallOptions & CallOptionsExt): Promise<TokenMintState>;
    updateWhitelistedTokenMint(request: DeepPartial<UpdateWhitelistedTokenMintRequest>, options?: CallOptions & CallOptionsExt): Promise<TokenMintState>;
    updatePartnerWhitelist(request: DeepPartial<UpdatePartnerWhitelistRequest>, options?: CallOptions & CallOptionsExt): Promise<WhitelistState>;
    requestCctpRecipientUpdate(request: DeepPartial<RequestCctpRecipientUpdateRequest>, options?: CallOptions & CallOptionsExt): Promise<CctpRecipientUpdateState>;
    approveCctpRecipientUpdate(request: DeepPartial<CctpRecipientDecisionRequest>, options?: CallOptions & CallOptionsExt): Promise<CctpRecipientUpdateState>;
    rejectCctpRecipientUpdate(request: DeepPartial<CctpRecipientDecisionRequest>, options?: CallOptions & CallOptionsExt): Promise<CctpRecipientUpdateState>;
    getCctpRecipientUpdate(request: DeepPartial<GetCctpRecipientUpdateRequest>, options?: CallOptions & CallOptionsExt): Promise<CctpRecipientUpdateState>;
    addOvaultCctpRecipient(request: DeepPartial<OvaultCctpRecipientRequest>, options?: CallOptions & CallOptionsExt): Promise<WhitelistState>;
    removeOvaultCctpRecipient(request: DeepPartial<OvaultCctpRecipientRequest>, options?: CallOptions & CallOptionsExt): Promise<WhitelistState>;
    /** TransactionsFacet — same order flows as Core on Solana. */
    createOrder(request: DeepPartial<CreateOrderRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTxResponse>;
    replenishOrder(request: DeepPartial<ReplenishOrderRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTxResponse>;
    closeOrder(request: DeepPartial<CloseOrderRequest>, options?: CallOptions & CallOptionsExt): Promise<CloseOrderResponse>;
    /** TransactionsFacet — Orbit borrow/repay and user liquidity. */
    deposit(request: DeepPartial<DepositRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountTxResponse>;
    borrow(request: DeepPartial<BorrowRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTxResponse>;
    repay(request: DeepPartial<RepayRequest>, options?: CallOptions & CallOptionsExt): Promise<OrderTxResponse>;
    requestWithdraw(request: DeepPartial<WithdrawRequest>, options?: CallOptions & CallOptionsExt): Promise<WithdrawState>;
    approveWithdraw(request: DeepPartial<WithdrawActionRequest>, options?: CallOptions & CallOptionsExt): Promise<WithdrawState>;
    rejectWithdraw(request: DeepPartial<WithdrawActionRequest>, options?: CallOptions & CallOptionsExt): Promise<WithdrawState>;
    readWithdrawRequestPda(request: DeepPartial<GetWithdrawRequestRequest>, options?: CallOptions & CallOptionsExt): Promise<WithdrawState>;
    /** Both return predictVault(UserCustody, orbitHash(key)). */
    getUserPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    getVaultPda(request: DeepPartial<GetPdaRequest>, options?: CallOptions & CallOptionsExt): Promise<PdaResponse>;
    verifyUser(request: DeepPartial<VerifyUserRequest>, options?: CallOptions & CallOptionsExt): Promise<UserState>;
    /** UserOperationsFacet. Cliff updates stay pending until a user wallet approves them. */
    registerUser(request: DeepPartial<RegisterUserRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountTxResponse>;
    updateMaxPrincipal(request: DeepPartial<UpdateMaxPrincipalRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountTxResponse>;
    updateCliffPeriod(request: DeepPartial<UpdateCliffPeriodRequest>, options?: CallOptions & CallOptionsExt): Promise<CliffState>;
    approveCliffPeriod(request: DeepPartial<CliffActionRequest>, options?: CallOptions & CallOptionsExt): Promise<CliffState>;
    rejectCliffPeriod(request: DeepPartial<CliffActionRequest>, options?: CallOptions & CallOptionsExt): Promise<CliffState>;
    /** UserOperationsFacet. Replaces Orbit updateWallets: the admin proposes, a current wallet approves. */
    requestWalletUpdate(request: DeepPartial<RequestWalletUpdateRequest>, options?: CallOptions & CallOptionsExt): Promise<WalletUpdateState>;
    approveWalletUpdate(request: DeepPartial<WalletUpdateDecisionRequest>, options?: CallOptions & CallOptionsExt): Promise<WalletUpdateState>;
    rejectWalletUpdate(request: DeepPartial<WalletUpdateDecisionRequest>, options?: CallOptions & CallOptionsExt): Promise<WalletUpdateState>;
    /** TransactionsFacet. Pledge credits principal; disburse only transfers tokens. */
    pledge(request: DeepPartial<PledgeRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountTxResponse>;
    disburse(request: DeepPartial<DisburseRequest>, options?: CallOptions & CallOptionsExt): Promise<AccountTxResponse>;
    /** Same result as Solana decodeEvent. `signature` is the transaction hash. */
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

export { AccountTxResponse, AllChains, AllTokens, BeneficiaryRequest, BeneficiaryState, BorrowRequest, CctpRecipient, CctpRecipientDecisionRequest, CctpRecipientUpdateState, ChainDetails, ChainRequest, CliffActionRequest, CliffState, CloseOrderRequest, CloseOrderResponse, CreateOrderRequest, DecodeEventRequest, type DeepPartial, DepositRequest, DisburseRequest, type EvmClient, EvmDefinition, type EvmServiceImplementation, type Exact, GetAllChainsRequest, GetAllTokensRequest, GetCctpRecipientUpdateRequest, GetChainByIdRequest, GetChainByNameRequest, GetPdaRequest, GetTokenDetailsRequest, GetWithdrawRequestRequest, type MessageFns, MetaArg, OrderRef, OrderTxResponse, OvaultCctpRecipientRequest, PdaResponse, PledgeRequest, PositionArgs, RegisterUserRequest, RepayRequest, ReplenishOrderRequest, RequestCctpRecipientUpdateRequest, RequestWalletUpdateRequest, TokenDetails, TokenMintState, UpdateCliffPeriodRequest, UpdateMaxPrincipalRequest, UpdatePartnerWhitelistRequest, UpdateWhitelistedTokenMintRequest, UserState, UserType, VerifyUserRequest, WalletUpdateDecisionRequest, WalletUpdateState, WhitelistAction, WhitelistState, WithdrawActionRequest, WithdrawRequest, WithdrawState, protobufPackage, userTypeFromJSON, userTypeToJSON, whitelistActionFromJSON, whitelistActionToJSON };
