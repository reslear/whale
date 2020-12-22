import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosLog } from "@reslear/axios-log";
import qs from "qs";

export interface StrapiOptions {
  baseURL?: string;
  login?: string;
  password?: string;
}

export class StrapiApi {
  axios: AxiosInstance;

  private token: string = "";
  user: object = {};

  private identifier: string;
  private password: string;

  constructor({ baseURL = "", login = "", password = "" }: StrapiOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL,
    };

    this.axios = axios.create(axiosConfig);

    this.identifier = login;
    this.password = password;

    if (process.env.NODE_ENV !== "production") {
      this.initAxiosLogger();
    }

    this.initAutoRefreshToken();
  }

  initAxiosLogger() {
    this.axios.interceptors.request.use(axiosLog);
  }

  setAuthHeader() {
    const value = `Bearer ${this.token}`;
    this.axios.defaults.headers.common["Authorization"] = value;

    console.log(value);
  }

  initAutoRefreshToken() {
    this.axios.interceptors.response.use(
      (value) => value,
      async (error) => {
        try {
          let { config, response } = error;

          if (response.status === 403 && !config._retry) {
            config._retry = true;

            await this.login();
            config.headers["Authorization"] = `Bearer ${this.token}`;

            return this.axios(config);
          }
        } catch (e) {
          return Promise.reject(error);
        }
      }
    );
  }

  clearToken() {
    delete this.axios.defaults.headers.common["Authorization"];
    this.token = "";
    this.user = {};
  }

  async login(identifier?: string, password?: string) {
    console.log("Login");

    this.clearToken();

    if (identifier) {
      this.identifier = identifier;
    }

    if (password) {
      this.password = password;
    }

    if (!(this.identifier && this.password)) {
      return false;
    }

    try {
      let response = await this.axios.post("/auth/local", {
        identifier: this.identifier,
        password: this.password,
      });

      if (response.data && response.data.jwt) {
        this.token = response.data.jwt;
        this.user = response.data.user;

        this.setAuthHeader();
        return true;
      }
    } catch (e) {
      console.error("/auth/local", e.response.config, e.response.data);
    }
    return false;
  }

  async find(entity: string, searchParams: any = {}, isDebug: boolean = false) {
    const query = qs.stringify(searchParams);
    const response = await this.axios.get(`/${entity}/?${query}`);
    return response.data;
  }

  async findOne(entity: string, id: number) {
    const response = await this.axios.get(`/${entity}/${id}`);
    return response.data;
  }

  async create(entity: string, data?: any, isDebug: boolean = false) {
    const response = await this.axios.post(`/${entity}/`, data);

    if (isDebug) {
      console.log(response);
    }

    return response.data;
  }

  async update(entity: string, id: number, data: any) {
    const response = await this.axios.post(`/${entity}/${id}`, data);
    return response.data;
  }

  async delete(entity: string, id: number, data: any) {
    const response = await this.axios.post(`/${entity}/${id}`, data);
    return response.data;
  }

  async count(entity: string, params: any = {}) {
    const query = qs.stringify(params);
    const response = await this.axios.get(`/${entity}/count?${query}`);

    return response.data;
  }
}

export default StrapiApi;
