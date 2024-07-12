import axios from "axios";
import { serverUrl } from "../config";
import { clearTokenFromLocalStorage } from "./utils";

let jwt: string | null = null;

let client = createApi();

function createApi() {
  const client = axios.create({
    baseURL: serverUrl,
    timeout: 32000,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  // Request Middleware
  client.interceptors.request.use(
    function (config) {
      // Config before Request
      return config;
    },
    function (err) {
      // If Request error
      return Promise.reject(err);
    }
  );

  // Response Middleware
  client.interceptors.response.use(
    function (res) {
      return res;
    },

    function (error) {
      const res = error?.response || error;
      if (
        (res?.data?.message == "invalid token" ||
          res?.data?.message == "Invalid or expired token") &&
        jwt != null
      ) {
        // api.auth.logout();
      }

      const errMsg = JSON.stringify(
        error?.response?.data?.error ||
          error?.response?.data?.errors?.at(0)?.error ||
          error?.message ||
          error ||
          `"unknown error happened"`
      );

      return Promise.reject(errMsg.slice(1, -1));
    }
  );

  return client;
}

function checkAndHandleError(data: any) {
  if (data.error) throw new Error(data.error);
  if (data.errors) throw new Error(data.errors);
}

export function setJwt(token: string) {
  jwt = token;
  client.defaults.headers["Authorization"] = `Bearer ${jwt}`;
}

export function clearJwt() {
  jwt = null;
  client.defaults.headers["Authorization"] = null;
}

export function isAuthTokenPresent() {
  const authHeader = api.client.defaults.headers["Authorization"] as
    | string
    | undefined
    | null;
  const token = authHeader && authHeader.split(" ")[1];

  const auth = token && token != "null";

  return auth ? true : false;
}

function ensureToken() {
  if (!jwt) throw new Error("jwt is required for this api call");
}

const api = {
  client: client,
};


export default api;