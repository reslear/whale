import { IFields, ITable } from "./fields.d";

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
      "${fieldItem.name}"${fieldItem.required ? "" : "?"}: string;
     `;
      })
      .join("");

    result.push(`
    /** ${tableItem.name} */
    export interface I${tableItem.id} {
      ${fields}
    }`);
  });

  return result.join("");
};
