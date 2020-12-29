import cheerio from "cheerio";
import { IFields, ITable, ITableInputs } from "./fields.d";

const parseTable = (data: string, tableData: ITableInputs): IFields[] => {
  const $ = cheerio.load(data);
  const pay_table = $(tableData.selector);

  let result: IFields[] = [];

  pay_table.each((i, el) => {
    let tds: any = [];

    $("td", el).each((td_i, td_el) => {
      let td_result: any = $(td_el).text();
      if (td_i === 1) {
        td_result = /да/.test(td_result);
      }

      tds.push(td_result);
    });

    let [name, required, description, note] = tds;

    result.push({
      name: name,
      required,
      description,
      note,
    });
  });

  return result;
};

export const parseTables = (source: string) => {
  let inputs: ITableInputs[] = [
    {
      id: "PayFields",
      name: "Поля формы оплаты",
      selector: "#POSTRequest ~ table tbody tr",
    },
    {
      id: "CartFields",
      name: "Поля для формирования корзины товаров/услуг",
      selector: "#cartFields ~ table tbody tr",
    },
  ];

  let result: ITable[] = [];

  inputs.forEach((table) => {
    const fields = parseTable(source, table);
    result.push({ fields, id: table.id, name: table.name });
  });

  return result;
};
