import fs from "fs";
import path from "path";

export interface IOverrides {
  pkgName?: string;
  envName?: string;
}

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
