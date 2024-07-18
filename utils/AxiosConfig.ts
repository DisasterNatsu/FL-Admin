import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://fl.kolkataff.space",
  timeout: 50000,
});
