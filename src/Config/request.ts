import axios from "axios";
import { loadState } from "./storage";
// function getAccessToken() {
//   const userData = loadState("token");
//   return userData ? userData.accessToken : null;
// }

const request = axios.create({
  baseURL: "https://dev.api-erp.najotedu.uz",
});
request.interceptors.request.use((config) => {
  const user = loadState("Token");

  if (user) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return config;
});
export { request };
