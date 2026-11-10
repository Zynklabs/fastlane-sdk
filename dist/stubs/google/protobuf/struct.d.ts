import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';

declare const protobufPackage = "google.protobuf";
/**
 * Represents a JSON `null`.
 *
 * `NullValue` is a sentinel, using an enum with only one value to represent
 * the null value for the `Value` type union.
 *
 * A field of type `NullValue` with any value other than `0` is considered
 * invalid. Most ProtoJSON serializers will emit a `Value` with a `null_value`
 * set as a JSON `null` regardless of the integer value, and so will round trip
 * to a `0` value.
 */
declare enum NullValue {
    /** NULL_VALUE - Null value. */
    NULL_VALUE = 0,
    UNRECOGNIZED = -1
}
declare function nullValueFromJSON(object: any): NullValue;
declare function nullValueToJSON(object: NullValue): string;
/**
 * Represents a JSON object.
 *
 * An unordered key-value map, intending to perfectly capture the semantics of a
 * JSON object. This enables parsing any arbitrary JSON payload as a message
 * field in ProtoJSON format.
 *
 * This follows RFC 8259 guidelines for interoperable JSON: notably this type
 * cannot represent large Int64 values or `NaN`/`Infinity` numbers,
 * since the JSON format generally does not support those values in its number
 * type.
 *
 * If you do not intend to parse arbitrary JSON into your message, a custom
 * typed message should be preferred instead of using this type.
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
 * Represents a JSON value.
 *
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant is an invalid state.
 */
interface Value {
    /** Represents a JSON `null`. */
    nullValue?: NullValue | undefined;
    /**
     * Represents a JSON number. Must not be `NaN`, `Infinity` or
     * `-Infinity`, since those are not supported in JSON. This also cannot
     * represent large Int64 values, since JSON format generally does not
     * support them in its number type.
     */
    numberValue?: number | undefined;
    /** Represents a JSON string. */
    stringValue?: string | undefined;
    /** Represents a JSON boolean (`true` or `false` literal in JSON). */
    boolValue?: boolean | undefined;
    /** Represents a JSON object. */
    structValue?: {
        [key: string]: any;
    } | undefined;
    /** Represents a JSON array. */
    listValue?: Array<any> | undefined;
}
declare const Value: MessageFns<Value> & AnyValueWrapperFns;
/** Represents a JSON array. */
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
