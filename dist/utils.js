"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallerAndEnv = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getCallerAndEnv = (overrides) => {
    let { pkgName, envName } = overrides || {};
    if (!pkgName) {
        let dir = process.cwd();
        while (true) {
            const pkgPath = path_1.default.join(dir, "package.json");
            if (fs_1.default.existsSync(pkgPath)) {
                try {
                    const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
                    pkgName = pkg.name;
                    break;
                }
                catch {
                    break;
                }
            }
            const parent = path_1.default.dirname(dir);
            if (parent === dir)
                break;
            dir = parent;
        }
    }
    if (!envName) {
        envName = process.env.ZYNK_ENV || "default";
        if (pkgName === "anomaly" &&
            envName === "production" &&
            process.env.IS_PREPROD)
            envName = "pre-prod";
    }
    return [pkgName ?? "fastlane", envName];
};
exports.getCallerAndEnv = getCallerAndEnv;
