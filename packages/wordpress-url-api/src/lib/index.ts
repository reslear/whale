import axios, { AxiosRequestConfig, AxiosInstance, Method } from "axios";

export class WordpressUrlApi {
  prefix_wp_json = "/wp-json";
  prefix_wp = "/wp/v2";
  axios: AxiosInstance;

  get prefix() {
    return `${this.prefix_wp_json}${this.prefix_wp}`;
  }

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.axios = axios.create(axiosConfig);
  }

  async request(
    url: string,
    data: any = {},
    method: Method = "get",
    config: AxiosRequestConfig = {}
  ) {
    const params = {
      [method.toLowerCase() === "get" ? "params" : "data"]: data,
    };

    try {
      const result = await this.axios({
        method,
        url: `${url}`,
        ...params,
        ...config,
      });

      return result;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("Error", e.message);
      }
      console.log(e);
    }
  }

  async get(
    url: string,
    data: any = {},
    options: {
      headers?: boolean;
      prefix?: string;
    } = {}
  ) {
    const req = await this.request((options.prefix ?? this.prefix) + url, data);

    if (!req) return null;

    if (options.headers) {
      return {
        headers: req.headers,
        data: req.data,
      };
    } else {
      return req.data;
    }
  }

  async post(
    url: string,
    data: any = {},
    options: {
      headers?: boolean;
      prefix?: string;
    } = {}
  ) {
    const req = await this.request(
      (options.prefix ?? this.prefix) + url,
      data,
      "post",
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    if (!req) return null;

    if (options.headers) {
      return {
        headers: req.headers,
        data: req.data,
      };
    } else {
      return req.data;
    }
  }
}

export default WordpressUrlApi;
