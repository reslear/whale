import { getDate, capitalize } from "./utils";
import { IFields, ITable } from "./fields.d";

export const generateTypes = (tables: ITable[]) => {
  let result: string[] = [
    `
    /* 
      Auto generated Webpay types
      ${getDate()}
    */\n`,
  ];
  let interfaces: string[] = [];

  result.push(`
    export type TCurrency = "BYN" | "USD" | "EUR" | "RUB";
    export type TLanguage = "russian" | "english";
  `);

  tables.forEach((tableItem) => {
    const name = capitalize(tableItem.id);
    const interfaceName = `IFormFields${name}`;

    interfaces.push(interfaceName);

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
    export interface ${interfaceName} {
      ${fields}
    }    
    `);
  });

  // TODO: parse name
  result.push(`
  
    /** Поля формы оплаты */
    export interface IFormFields extends ${interfaces.join(",")}{  
    }
  `);

  return result.join("");
};

export const generateDefaults = (tables: ITable[]) => {
  let result: string[] = [];

  tables.forEach((tableItem) => {
    const name = capitalize(tableItem.id);
    const interfaceName = `IFormFields${name}`;

    let fields = tableItem.fields
      .map((fieldItem) => {
        return `"${fieldItem.name}": ${fieldItem.default ?? `""`},`;
      })
      .join("");

    result.push(`
    /** ${tableItem.name} */
    export const default_${tableItem.id} : ${interfaceName} = {
      ${fields}
    }`);
  });

  return result.join("");
};
