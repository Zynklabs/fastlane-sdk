import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';

declare const protobufPackage = "google.protobuf";
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 */
declare enum NullValue {
    /** NULL_VALUE - Null value. */
    NULL_VALUE = 0,
    UNRECOGNIZED = -1
}
declare function nullValueFromJSON(object: any): NullValue;
declare function nullValueToJSON(object: NullValue): string;
/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
interface Struct {
    /** Unordered map of dynamically typed values. */
    fields: {
        [key: string]: any | undefined;
    };
}
declare const Struct: MessageFns<Struct> & StructWrapperFns;
interface Struct_FieldsEntry {
    key: string;
    value?: any | undefined;
}
declare const Struct_FieldsEntry: MessageFns<Struct_FieldsEntry>;
/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
interface Value {
    /** Represents a null value. */
    nullValue?: NullValue | undefined;
    /** Represents a double value. */
    numberValue?: number | undefined;
    /** Represents a string value. */
    stringValue?: string | undefined;
    /** Represents a boolean value. */
    boolValue?: boolean | undefined;
    /** Represents a structured value. */
    structValue?: {
        [key: string]: any;
    } | undefined;
    /** Represents a repeated `Value`. */
    listValue?: Array<any> | undefined;
}
declare const Value: MessageFns<Value> & AnyValueWrapperFns;
/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
interface ListValue {
    /** Repeated field of dynamically typed values. */
    values: any[];
}
declare const ListValue: MessageFns<ListValue> & ListValueWrapperFns;
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
interface StructWrapperFns {
    wrap(object: {
        [key: string]: any;
    } | undefined): Struct;
    unwrap(message: Struct): {
        [key: string]: any;
    };
}
interface AnyValueWrapperFns {
    wrap(value: any): Value;
    unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined;
}
interface ListValueWrapperFns {
    wrap(array: Array<any> | undefined): ListValue;
    unwrap(message: ListValue): Array<any>;
}

export { type AnyValueWrapperFns, type DeepPartial, type Exact, ListValue, type ListValueWrapperFns, type MessageFns, NullValue, Struct, type StructWrapperFns, Struct_FieldsEntry, Value, nullValueFromJSON, nullValueToJSON, protobufPackage };
