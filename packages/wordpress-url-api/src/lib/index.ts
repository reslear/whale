import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  Method,
  AxiosResponse,
} from "axios";

interface IBasicAuth {
  login: string;
  password: string;
}
interface IOptions {
  host?: string;
  prefix?: string;
  axiosConfig?: AxiosRequestConfig;
  auth?: IBasicAuth;
}
interface IMethodOptions {
  returnHeaders?: boolean;
}

export class WordpressUrlApi {
  axios: AxiosInstance;
  host: string = "";
  prefix: string = "/wp-json";

  // TODO: app like https://gist.github.com/georgestephanis/44d16dfdd17bd18b9c45d1d5e6d7ec7b
  // https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/
  // https://rudrastyh.com/wordpress/rest-api-create-delete-posts.html

  auth: IBasicAuth = {
    login: "",
    password: "",
  };

  constructor({ auth, axiosConfig, host, prefix }: IOptions = {}) {
    if (auth) {
      this.auth = { ...this.auth, ...auth };
    }

    if (host) {
      this.host = host;
    }
    if (prefix) this.prefix = prefix;

    this.axios = axios.create(axiosConfig);
  }

  get isUseAuth() {
    return this.auth.login && this.auth.password;
  }

  get authHeader() {
    if (!this.isUseAuth) {
      return {};
    }
    let result = Buffer.from(
      `${this.auth.login}:${this.auth.password}`
    ).toString("base64");
    return {
      Authorization: `Basic ${result}`,
    };
  }

  async request({
    path = "",
    data = {},
    _method = "get",
    config = {},
    options = {
      returnHeaders: false,
    },
  }: {
    path: string;
    data: any;
    _method?: Method;
    config?: AxiosRequestConfig;
    options?: IMethodOptions;
  }) {
    const { returnHeaders } = options;

    let url = this.getUrl(path);
    const method = _method.toLowerCase() as Method;

    const params = {
      [method === "get" ? "params" : "data"]: data,
    };

    const headers = {
      headers: { ...this.authHeader, ...(config.headers ?? {}) },
    };

    try {
      const result = await this.axios({
        method,
        url,
        ...params,
        ...config,
        ...headers,
      });

      if (returnHeaders) {
        return {
          headers: result.headers,
          data: result.data,
        };
      } else {
        return result.data;
      }
    } catch (e) {
      this.showErrors(e);
    }
  }

  showErrors(e: any) {
    const resp: AxiosResponse = e.response;

    if (resp) {
      console.log(resp.config, resp.status, resp.headers, resp.data);
      return false;
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("Error", e.message);
    }
    console.log(e);
  }

  urlFix(value: string = "") {
    return value.replace(/^\/|\/$/, "");
  }

  getUrl(path: string) {
    return [this.host, this.prefix, path]
      .map((item) => this.urlFix(item))
      .join("/");
  }

  async get(path: string, data?: any, options?: IMethodOptions) {
    return await this.request({ path, data, options });
  }

  async post(
    path: string,
    data: any = {},
    { returnHeaders = false }: IMethodOptions = {}
  ) {
    const req = await this.request(path, data, "post", {
      headers: { "Content-Type": "application/json" },
    });

    if (!req) return null;

    if (returnHeaders) {
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
