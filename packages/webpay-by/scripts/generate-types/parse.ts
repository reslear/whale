import $ from "cheerio";
import TurndownService from "turndown";

import { IFields, ITable, ITableInputs, IFieldsSource } from "./fields.d";
import { eachItemHook } from "./knowns";

const turndownService = new TurndownService();

/* turndownService.addRule("br-doc", {
  filter: ["linebreak"],
  replacement: (content) => "*" + content,
}); */

const parseField = (source: string) => {
  let result = turndownService.turndown(source);

  result = result.replace(/[\r\n]+/g, "\r\n\t\t\t\t* ").trim();

  return result;
};

const parseTable = (data: string, tableInputs: ITableInputs): IFields[] => {
  let result: IFields[] = [];

  const trList = $(tableInputs.selector, data);

  trList.each((i, el) => {
    let fields: IFields = {
      name: $("td:eq(0)", el).html(),
      required: /да|yes/.test($("td:eq(1)", el).html()),
      description: parseField($("td:eq(2)", el).html()),
      note: parseField($("td:eq(3)", el).html()),
    };

    fields = eachItemHook(fields, tableInputs);
    result.push(fields);
  });

  return result;
};

export const parseTables = (source: string) => {
  let inputs: ITableInputs[] = [
    {
      id: "pay",
      name: "Поля формы оплаты",
      selector: "#POSTRequest ~ table tbody tr",
    },
    /* {
      id: "CartFields",
      name: "Поля для формирования корзины товаров/услуг",
      selector: "#cartFields ~ table tbody tr",
    }, */
  ];

  let result: ITable[] = [];

  inputs.forEach((table) => {
    const fields = parseTable(source, table);
    result.push({ fields, id: table.id, name: table.name });
  });

  return result;
};
