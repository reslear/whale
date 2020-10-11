import axios from "axios";
import { axiosLog } from "../src/axios-log";

axios.interceptors.request.use(axiosLog);

const data = axios("https://jsonplaceholder.typicode.com/todos/1?a=12", {
  params: {
    _fields: "acf",
  },
});
