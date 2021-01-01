import { capitalize } from "./utils";
import { generateTypes } from "./generate";
import { parseTables } from "./parse";
import axios from "axios";
import fse from "fs-extra";
import { promises as fsp } from "fs";
import prettier from "prettier";

const date = new Date().toISOString().split("T")[0];
const sourceList = [
  { locale: "ru", link: "https://docs.webpay.by/indexRU.html" },
  //{ locale: "en", link: "https://docs.webpay.by/en/index.html" },
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

  console.time("parse");
  const tables = parseTables(source);
  console.timeEnd("parse");

  console.time("generate");
  let types = generateTypes(tables);
  //let defaults = generateDefaults(tables);
  console.timeEnd("generate");

  console.time("prettier");
  let output = [types].join("\n");

  output = prettier.format(output, {
    parser: "typescript",
  });
  console.timeEnd("prettier");

  console.time("save");
  await fse.outputFile(
    `./src/types/generated/types${capitalize(locale)}.d.ts`,
    output
  );
  console.timeEnd("save");
};

sourceList.forEach(({ locale, link }) => {
  start(locale, link);
});
