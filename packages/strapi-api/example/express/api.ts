import StrapiApi from "../../src/index";
import { axiosLog } from "@reslear/axios-log";

const api = new StrapiApi({
  baseURL: "",
  login: "",
  password: "",
});

// set logger
if (process.env.NODE_ENV !== "production") {
  api.axios.interceptors.request.use(axiosLog);
}

export default api;
