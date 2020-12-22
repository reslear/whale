import { AxiosRequestConfig } from "axios";
import chalk from "chalk";

export interface INiceLogOptions {
  prefix?: string;
}

export const niceLog = (options: INiceLogOptions | AxiosRequestConfig) => {
  // is axios
  if ("method" in options) {
  } else {
    // is options
  }

  return (config: AxiosRequestConfig) => {
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
};

export default niceLog;
