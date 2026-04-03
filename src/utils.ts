import fs from "fs";
import path from "path";
import { IOverrides } from "./_";

export const nonRetryables = new Set([
  "ExecuteTx",
  "Replenish",
  "Transfer",
  "AttestOrder",
  "Deposit",
  "Borrow",
  "Repay",
  "Withdraw",
  "DepositCollateral",
  "SpendTokens",
  "TransferToLp",
  "TransferPdaToWallet",
]);

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const backoffWithJitter = (
  attempt: number,
  initialBackoff: string | number = 500,
  maxBackoff: string | number = 5000,
  multiplier: number = 1.2,
) => {
  const base = +initialBackoff * Math.pow(multiplier, attempt - 1);
  const capped = Math.min(base, +maxBackoff);

  return capped * (0.573 + Math.random());
};

export const getCallerAndEnv = (overrides?: IOverrides): [string, string] => {
  let { pkgName, envName } = overrides || {};

  if (!pkgName) {
    let dir = process.cwd();

    while (true) {
      const pkgPath = path.join(dir, "package.json");

      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
          pkgName = pkg.name;

          break;
        } catch {
          break;
        }
      }

      const parent = path.dirname(dir);
      if (parent === dir) break;

      dir = parent;
    }
  }

  if (!envName) {
    envName = process.env.ZYNK_ENV || "default";
    if (
      pkgName === "anomaly" &&
      envName === "production" &&
      process.env.IS_PREPROD
    )
      envName = "pre-prod";
  }

  return [pkgName ?? "fastlane", envName];
};
