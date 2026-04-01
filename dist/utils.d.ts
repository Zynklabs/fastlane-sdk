export interface IOverrides {
    pkgName?: string;
    envName?: string;
}
export declare const getCallerAndEnv: (overrides?: IOverrides) => [string, string];
