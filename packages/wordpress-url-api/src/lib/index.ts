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
  returnHeaders: boolean;
  config: AxiosRequestConfig;
}

export type IMethodArgs = [
  path: string,
  data?: any,
  options?: Partial<IMethodOptions>
];

export class WordpressUrlApi {
  axios: AxiosInstance;
  host: string = "";
  prefix: string = "/wp-json";

  // TODO: app like https://gist.github.com/georgestephanis/44d16dfdd17bd18b9c45d1d5e6d7ec7b
  // https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/
  // https://rudrastyh.com/wordpress/rest-api-create-delete-posts.html
  // https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#authentication-plugins

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

  async request(
    method: Method = "get",
    [path, data, options = {}]: IMethodArgs
  ) {
    const { returnHeaders = false, config = {} } = options;

    let url = this.getUrl(path);
    method = method.toLowerCase() as Method;

    const params = {
      [method === "get" ? "params" : "data"]: data,
    };

    let headers = {
      ...this.authHeader,
      ...{ "Content-Type": "application/json" },
      ...(config.headers ?? {}),
    };

    try {
      const result = await this.axios({
        method,
        url,
        ...params,
        ...config,
        headers,
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
    if (e.response) {
      const { request, ...other }: AxiosResponse = e.response;
      console.log(other);
    } else if (e.request) {
      console.log(e.request);
    } else if (e.message) {
      console.log("Error", e.message);
    } else {
      console.log(e);
    }
  }

  urlFix(value: string = "") {
    return value.replace(/^\/|\/$/, "");
  }

  getUrl(path: string) {
    return [this.host, this.prefix, path]
      .map((item) => this.urlFix(item))
      .join("/");
  }

  async post(...args: IMethodArgs) {
    return await this.request("post", args);
  }

  async get(...args: IMethodArgs) {
    return await this.request("get", args);
  }

  async put(...args: IMethodArgs) {
    return await this.request("put", args);
  }
}

export default WordpressUrlApi;
