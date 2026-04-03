import { RetryPolicy } from '@grpc/grpc-js';

interface IOverrides {
    pkgName?: string;
    envName?: string;
}
interface ILogger {
    loggerCallbackFn: (level: "info" | "error" | "debug", context: any, error?: {
        code?: string | number;
        raw?: any;
        message?: string;
    }) => Promise<any>;
    metricsCallbackFn?: (method: string, path: string, status: number | string, duration: number) => Promise<any>;
}
interface IOptions {
    overrides?: IOverrides;
    logger?: ILogger;
    retryPolicy?: RetryPolicy;
}

export type { ILogger, IOptions, IOverrides };
