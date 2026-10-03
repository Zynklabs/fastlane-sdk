declare const applicableMethods: Set<string>;
declare const transformTxIx: (obj: any, direction: "toWire" | "fromWire", transformed?: boolean) => any;

export { applicableMethods, transformTxIx };
