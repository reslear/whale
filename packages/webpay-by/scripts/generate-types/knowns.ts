import { IFields, ITableInputs } from "./fields";

export const eachItemHook = (fields: IFields, table: ITableInputs) => {
  let result: IFields = fields;

  if (table.id === "pay") {
    if (fields.name === "wsb_language_id") {
      result.type = `"russian" | "english"`;
      result.default = `"russian"`;
    }
  }

  return result;
};
