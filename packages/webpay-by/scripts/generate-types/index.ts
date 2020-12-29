import { generateTypes } from "./generate";
import { parseTables } from "./parse";
import axios from "axios";
import { promises as fsp } from "fs";

const sourceList = [
  { locale: "ru", link: "https://docs.webpay.by/indexRU.html" },
  //{ locale: "en", link: "https://docs.webpay.by/indexEN.html" },
];

const start = async (locale: string, link: string) => {
  const { data } = await axios.get(link);

  const tables = parseTables(data);
  const typesData = generateTypes(tables);

  await fsp.writeFile(`./types-${locale}.d.ts`, typesData);
};

sourceList.forEach(({ locale, link }) => {
  start(locale, link);
});
