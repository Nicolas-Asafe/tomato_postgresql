import Type from "./models/type.js";

/*
|--------------------------------------------------------------------------
| STRING TYPES (FIXOS)
|--------------------------------------------------------------------------
*/

const types = {
  // STRING BÁSICA
  "tomato_postgresql:types_string": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") {
        throw new Error(`[TomatoPostgresqlTypes] ${name} must be string`);
      }
    }
  ),

  "tomato_postgresql:types_stringMax4": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (value.length > 4) throw new Error(`[Types] ${name} max length is 4`);
    }
  ),

  "tomato_postgresql:types_stringMax8": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (value.length > 8) throw new Error(`[Types] ${name} max length is 8`);
    }
  ),

  "tomato_postgresql:types_stringMax12": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (value.length > 12) throw new Error(`[Types] ${name} max length is 12`);
    }
  ),

  "tomato_postgresql:types_stringMax32": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (value.length > 32) throw new Error(`[Types] ${name} max length is 32`);
    }
  ),

  "tomato_postgresql:types_stringMax255": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (value.length > 255) throw new Error(`[Types] ${name} max length is 255`);
    }
  ),

  /*
  |--------------------------------------------------------------------------
  | STRING ESPECÍFICAS
  |--------------------------------------------------------------------------
  */

  "tomato_postgresql:types_email": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error(`[Types] ${name} must be a valid email`);
      }
    }
  ),

  "tomato_postgresql:types_slug": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (!/^[a-z0-9-]+$/.test(value)) {
        throw new Error(`[Types] ${name} must be a valid slug`);
      }
    }
  ),

  "tomato_postgresql:types_uuid": new Type(
    "string",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "string") throw new Error(`[Types] ${name} must be string`);
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          value
        )
      ) {
        throw new Error(`[Types] ${name} must be a valid UUID`);
      }
    }
  ),

  /*
  |--------------------------------------------------------------------------
  | NUMBER / INT TYPES
  |--------------------------------------------------------------------------
  */

  "tomato_postgresql:types_int": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) {
        throw new Error(`[Types] ${name} must be integer`);
      }
    }
  ),

  "tomato_postgresql:types_intMin0": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value < 0) throw new Error(`[Types] ${name} must be >= 0`);
    }
  ),

  "tomato_postgresql:types_intMin1": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value < 1) throw new Error(`[Types] ${name} must be >= 1`);
    }
  ),

  "tomato_postgresql:types_intMax10": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value > 10) throw new Error(`[Types] ${name} must be <= 10`);
    }
  ),

  "tomato_postgresql:types_intMax60": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value > 60) throw new Error(`[Types] ${name} must be <= 60`);
    }
  ),

  "tomato_postgresql:types_intMax100": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value > 100) throw new Error(`[Types] ${name} must be <= 100`);
    }
  ),

  "tomato_postgresql:types_intRange_1_10": new Type(
    "number",
    "tomato_postgresql",
    (name, value) => {
      if (!Number.isInteger(value)) throw new Error(`[Types] ${name} must be integer`);
      if (value < 1 || value > 10) {
        throw new Error(`[Types] ${name} must be between 1 and 10`);
      }
    }
  ),

  /*
  |--------------------------------------------------------------------------
  | BOOLEAN
  |--------------------------------------------------------------------------
  */

  "tomato_postgresql:types_boolean": new Type(
    "boolean",
    "tomato_postgresql",
    (name, value) => {
      if (typeof value !== "boolean") {
        throw new Error(`[Types] ${name} must be boolean`);
      }
    }
  )
};

export default types;
