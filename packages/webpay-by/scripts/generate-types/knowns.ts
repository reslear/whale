import { IFields, ITableInputs } from "./fields";

export const eachItemHook = (fields: IFields, table: ITableInputs) => {
  let result: IFields = fields;

  if (table.id === "pay") {
    if (fields.name === "wsb_language_id") {
      result.type = `"russian" | "english"`;
    }
  }

  return result;
};
/* 
/^[a-z$_][a-z$_0-9]*$/i.test(el);
let a = {
  123d: {

  }
} */
