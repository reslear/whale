import { AxiosRequestConfig } from "axios";
import chalk from "chalk";

export const axiosLog = (request: AxiosRequestConfig) => {
  const params = request.params
    ? Object.entries(request.params)
        .map(([key, val]) => `${key}${chalk.gray("=")}${val}`)
        .join(chalk.yellow("&"))
    : "";
  const time = new Date().toLocaleTimeString();

  const base = request.baseURL ?? "";

  console.log(
    `${chalk.green("[axios]")} ${time} ${chalk.yellow(
      (request.method || "").toUpperCase()
    )} ${chalk.cyan(`${base}${request.url}`)}${
      params ? `${chalk.yellow("?")}${params}` : ""
    }`.trim()
  );

  return request;
};
