import { RetryPolicy } from "@grpc/grpc-js";

export interface IOverrides {
  pkgName?: string;
  envName?: string;
}

export interface ILogger {
  loggerCallbackFn: (
    level: "info" | "error" | "debug",
    context: any,
    error?: { code?: string | number; raw?: any; message?: string },
  ) => Promise<any>;
  metricsCallbackFn?: (
    method: string,
    path: string,
    status: number | string,
    duration: number,
  ) => Promise<any>;
}

export interface IOptions {
  overrides?: IOverrides;
  logger?: ILogger;
  retryPolicy?: RetryPolicy;
}
