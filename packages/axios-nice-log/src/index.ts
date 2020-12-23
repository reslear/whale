import axios, { AxiosRequestConfig } from "axios";
import chalk from "chalk";

export type keys =
  | "prefix"
  | "time"
  | "method"
  | "url"
  | "params"
  | "separator"
  | "delimiter";

export type fields = Partial<Record<keys, string>>;

export interface INiceLogOptions {
  prefix?: string;
  colors?: fields;
  template?: string;
  templates?: fields;
  logger?: (value: string) => void;
}

let defaults: INiceLogOptions = {
  prefix: "axios",
  colors: {
    prefix: "green",
    time: "reset",
    method: "yellow",
    url: "cyan",
    params: "reset",
    separator: "yellow",
    delimiter: "gray",
  },
  template: "%prefix %time %method %url%params",
  templates: {
    prefix: "[%s]",
    time: "%s",
    method: "%s",
    url: "%s",
    params: "%s",
    separator: "?",
    delimiter: "=",
  },
  logger: console.log,
};

// TODO: deep merge
export const setGlobal = (options?: INiceLogOptions): INiceLogOptions =>
  (defaults = { ...defaults, ...options });

export class NiceLog {
  options: INiceLogOptions = {};

  constructor(options: INiceLogOptions = {}) {
    this.setOptions(options);
  }

  setOptions(options: INiceLogOptions = {}) {
    // TODO: deep merge
    this.options = Object.assign(this.options, options);
  }

  get(config: AxiosRequestConfig): AxiosRequestConfig {
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

    // TODO: paint params
    params = params ? `${chalk.yellow("?")}${params}` : "";

    let result = this.paint({
      params,
      prefix: this.options.prefix,
      time,
      method,
      url,
    });

    this.print(result);

    return config;
  }

  print(value: string) {
    this.options.logger(value);
  }

  /**
   * @see issue https://github.com/chalk/chalk/issues/258
   * */
  chalkTemplate(str: string) {
    return chalk(Object.assign([], { raw: [str] }));
  }

  paint(fields: fields) {
    let result = this.options.template;

    Object.entries(fields).forEach(([key, value]) => {
      const color = this.options.colors[key] || "reset";
      const val = this.options.templates[key].replace("%s", value || "");

      result = result.replace(`%${key}`, `{${color} ${val}}`);
    });

    result = this.chalkTemplate(result);

    return result;
  }
}

export const axiosNiceLog = (
  config: AxiosRequestConfig,
  options: INiceLogOptions = {}
): AxiosRequestConfig => {
  return new NiceLog({ ...defaults, ...options }).get(config);
};

export default axiosNiceLog;
