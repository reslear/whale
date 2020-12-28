import { prompt } from "enquirer";
import ejs from "ejs";
import fse from "fs-extra";
import { promises as fsp } from "fs";
import fg from "fast-glob";

import validateNpmPackageName from "validate-npm-package-name";

export const checkPackageName = async (val: string) => {
  const isNpm = validateNpmPackageName(val).validForNewPackages;
  const isNotExist = !(await fse.pathExists(`./packages/${val}`));

  return isNpm && isNotExist;
};

const init = async () => {
  const answers: Record<"name" | "description", string> = await prompt([
    {
      type: "input",
      name: "name",
      message: "Package name",
      initial: "my-new-package",
      validate: (value) => checkPackageName(value),
    },

    {
      type: "input",
      name: "description",
      message: "Package description",
    },
  ]);

  const pkgPath = `./packages/${answers.name}`;

  await fse.copy("./scripts/template", pkgPath);

  const entries = await fg(`${pkgPath}/**/*`);

  await Promise.all(
    entries.map(async (entry) => {
      const data = await fsp.readFile(entry, "utf8");
      const result = await ejs.render(data, answers, { async: true });

      await fsp.writeFile(entry, result);
    })
  );
};

init();
