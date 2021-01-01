import { IFields, ITableInputs } from "./fields";

export const eachItemHook = (fields: IFields, table: ITableInputs) => {
  let result: IFields = fields;

  if (table.id === "pay") {
    if (fields.name === "wsb_language_id") {
      result.type = `"russian" | "english"`;
      result.default = `"russian"`;
    }
  }

  if (table.id === "cart") {
    if (fields.name === "wsb_invoice_item_name[{n}]") {
      result.name = "wsb_invoice_item_name";
      result.type = "string[]";
    }

    if (fields.name === "wsb_invoice_item_quantity[{n}]") {
      result.name = "wsb_invoice_item_quantity";
      result.type = "number[]";
    }

    if (fields.name === "wsb_invoice_item_price[{n}]") {
      result.name = "wsb_invoice_item_price";
      result.type = "number[]";
    }
  }

  return result;
};
