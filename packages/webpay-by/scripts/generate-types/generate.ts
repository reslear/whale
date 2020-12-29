import { IFields, ITable } from "./fields.d";

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const generateTypes = (tables: ITable[]) => {
  let date = new Date().toLocaleString("ru", { timeZoneName: "short" });
  let result: string[] = [
    `
    /* 
      Auto generated Webpay types
      ${date}
    */\n`,
  ];

  tables.forEach((tableItem) => {
    let fields = tableItem.fields
      .map((fieldItem) => {
        return `
      /** ${fieldItem.description}
       * @remarks ${fieldItem.note}
      */
      "${fieldItem.name}"${fieldItem.required ? "" : "?"}: ${
          fieldItem.type ?? "string"
        };
     `;
      })
      .join("");

    result.push(`
    /** ${tableItem.name} */
    export interface IFormFields${capitalize(tableItem.id)} {
      ${fields}
    }`);
  });

  return result.join("");
};
