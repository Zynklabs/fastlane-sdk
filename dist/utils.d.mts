interface IOverrides {
    pkgName?: string;
    envName?: string;
}
declare const getCallerAndEnv: (overrides?: IOverrides) => [string, string];

export { type IOverrides, getCallerAndEnv };
