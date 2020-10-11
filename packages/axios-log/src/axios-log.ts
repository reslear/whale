import { AxiosRequestConfig } from "axios";
import chalk from "chalk";

export const axiosLog = (config: AxiosRequestConfig) => {
  let params = config.params
    ? Object.entries(config.params)
        .map(([key, val]) => `${key}${chalk.gray("=")}${val}`)
        .join(chalk.yellow("&"))
    : "";

  // TODO: refactor
  let urlParams = new URLSearchParams(config.params);

  let time = new Date().toLocaleTimeString();
  let method = config.method ?? "";
  let url = new URL(config.url, config.baseURL).href;

  // colorize
  method = method.toUpperCase();
  params = params ? `${chalk.yellow("?")}${params}` : "";

  console.log(
    chalk`{green [axios]} ${time} {yellow ${method}} {cyan ${url}}${params}`
  );

  return config;
};
