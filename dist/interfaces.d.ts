import { RetryPolicy } from '@grpc/grpc-js';

interface IOverrides {
    pkgName?: string;
    envName?: string;
}
interface IExtensions {
    logger: (level: "info" | "error" | "debug", context: any, error?: {
        code?: string | number;
        raw?: any;
        message?: string;
    }) => Promise<any>;
    metrics?: (method: string, path: string, status: number | string, duration: number) => Promise<any>;
}
interface IOptions {
    overrides?: IOverrides;
    extensions?: IExtensions;
    retryPolicy?: RetryPolicy;
}

export type { IExtensions, IOptions, IOverrides };
