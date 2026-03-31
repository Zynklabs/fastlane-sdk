"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const nice_grpc_1 = require("nice-grpc");
const base_1 = require("./stubs/base");
const core_1 = require("./stubs/core");
const kamino_1 = require("./stubs/kamino");
const utils_1 = require("./utils");
const txIx_1 = require("./txIx");
const callerMiddleware = (callerAndEnv) => async function* (call, options) {
    const metadata = options.metadata ?? new nice_grpc_1.Metadata();
    const [caller, env] = callerAndEnv;
    metadata.set("z-caller", caller);
    metadata.set("z-env", env);
    options.metadata = metadata;
    return yield* call.next(call.request, options);
};
const txIxMiddleware = () => async function* (call, options) {
    const { transformed, ...req } = (0, txIx_1.transformTxIx)(call, "toWire");
    const res = yield* call.next(req, options);
    return (0, txIx_1.transformTxIx)(res, "fromWire", transformed);
};
exports.default = (endpoint, overrides) => {
    const callerAndEnv = (0, utils_1.getCallerAndEnv)(overrides);
    const clientFactory = (0, nice_grpc_1.createClientFactory)()
        .use(callerMiddleware(callerAndEnv))
        .use(txIxMiddleware());
    const channel = (0, nice_grpc_1.createChannel)(endpoint);
    const core = clientFactory.create(core_1.CoreDefinition, channel);
    const base = clientFactory.create(base_1.BaseDefinition, channel);
    const kamino = clientFactory.create(kamino_1.KaminoDefinition, channel);
    return { core, base, kamino, Token: base_1.Token, Denom: base_1.Denom };
};
__exportStar(require("./stubs"), exports);
