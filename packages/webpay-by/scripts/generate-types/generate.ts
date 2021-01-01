import { getDate, capitalize } from "./utils";
import { IFields, ITable, ITableResult } from "./fields.d";

export const generateTypes = (tables: ITableResult[]) => {
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
    const name = capitalize(tableItem.table.id);
    const interfaceName = `IFormFields${name}`;

    interfaces.push(interfaceName);

    let fields: string[] = [];
    tableItem.fields.forEach((fieldItem) => {
      let title = `/** ${fieldItem.description} ${
        fieldItem.note ? `\n* @remarks ${fieldItem.note}\n` : ""
      } */`;

      let content = `
      "${fieldItem.name}"${fieldItem.required ? "" : "?"}: ${
        fieldItem.type ?? "string"
      };
     `;

      fields.push(`${title}${content}\n`);
    });

    result.push(`
    /** ${tableItem.table.name} */
    export interface ${interfaceName} {
      ${fields.join("")}
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

// export const generateDefaults = (tables: ITable[]) => {
//   let result: string[] = [];

//   tables.forEach((tableItem) => {
//     const name = capitalize(tableItem.id);
//     const interfaceName = `IFormFields${name}`;

//     let fields = tableItem.fields
//       .map((fieldItem) => {
//         return `"${fieldItem.name}": ${fieldItem.default ?? `""`},`;
//       })
//       .join("");

//     result.push(`
//     /** ${tableItem.name} */
//     export const default_${tableItem.id} : ${interfaceName} = {
//       ${fields}
//     }`);
//   });

//   return result.join("");
// };
