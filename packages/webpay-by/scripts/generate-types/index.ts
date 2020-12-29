import { generateTypes } from "./generate";
import { parseTables } from "./parse";
import axios from "axios";
import fse from "fs-extra";
import { promises as fsp } from "fs";

const date = new Date().toISOString().split("T")[0];
const sourceList = [
  { locale: "ru", link: "https://docs.webpay.by/indexRU.html" },
  //{ locale: "en", link: "https://docs.webpay.by/indexEN.html" },
];

const start = async (locale: string, link: string) => {
  const file = `./scripts/generate-types/.cache/${date}-${locale}.html`;
  const isCached = await fse.pathExists(file);

  let source = "";

  console.time("get");
  if (!isCached) {
    source = (await axios.get(link)).data;
    fse.outputFile(file, source);
  } else {
    source = await fsp.readFile(file, "utf-8");
  }
  console.timeEnd("get");

  const tables = parseTables(source);
  const typesData = generateTypes(tables);

  await fse.outputFile(`./types-${locale}.d.ts`, typesData);
};

sourceList.forEach(({ locale, link }) => {
  start(locale, link);
});
