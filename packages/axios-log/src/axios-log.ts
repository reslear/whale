import { AxiosRequestConfig } from "axios";
import chalk from "chalk";

export const axiosLog = (request: AxiosRequestConfig) => {
  const params = Object.entries(request.params)
    .map(([key, val]) => `${key}${chalk.gray("=")}${val}`)
    .join(chalk.yellow("&"));
  const time = new Date().toLocaleTimeString();

  console.log(
    `${chalk.green("[axios]")} ${time} ${chalk.yellow(
      (request.method || "").toUpperCase()
    )} ${chalk.cyan(`${request.baseURL}${request.url}`)}${chalk.yellow(
      "?"
    )}${params}`
  );

  return request;
};
