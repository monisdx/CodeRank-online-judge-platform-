import axios from "axios";
import { serverUrl } from "../config";
import { clearTokenFromLocalStorage } from "./utils";
import { Problem, Testcase, Testresult, User } from "../types";

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

  auth: {
    async login(email: string, password: string) {
      const response = await client.post<{ result: User; token: string }>(
        "/auth/signin",
        { email, password }
      );

      const userData = response.data;

      checkAndHandleError(userData);

      if (userData.token) {
        setJwt(userData.token);
        return userData;
      }

      return false;
    },

    async register(
      name: string,
      email: string,
      password: string,
      confirmpassword: string
    ) {
      const response = await client.post<{ result: User; token: string }>(
        "/auth/signup",
        {
          name,
          email,
          password,
          confirmpassword,
        }
      );
      const userData = response.data;

      checkAndHandleError(userData);

      if (userData.token) {
        setJwt(userData.token);
        return userData;
      }

      return false;
    },

    async loginWithGoogle(googletoken: string) {
      const response = await client.post<{ result: User; token: string }>(
        "/auth/google-oauth",
        { googletoken }
      );

      const userData = response.data;

      checkAndHandleError(userData);

      if (userData.token) {
        setJwt(userData.token);
        return userData;
      }

      return false;
    },

    async logout() {
      clearTokenFromLocalStorage();
      clearJwt();
      location.reload();
    },
  },
  problem: {
    async getAllProblems() {
      const response = await client.get<{ problemlist: Problem[] }>("/problem");

      const data = response.data;

      checkAndHandleError(data);

      return data;
    },

    async addProblem(
      title: string,
      description: string,
      difficulty: string,
      constraints: string[],
      inputformat: string,
      outputformat: string,
      exampleinput: string[],
      exampleoutput: string[]
    ) {
      const response = await client.post<{ message: string }>("/problem", {
        title,
        description,
        difficulty,
        constraints,
        inputformat,
        outputformat,
        exampleinput,
        exampleoutput,
      });

      const data = response.data;

      checkAndHandleError(data);

      return data.message;
    },

    async updateProblem(
      id: string,
      title: string,
      description: string,
      difficulty: string,
      constraints: string[],
      inputformat: string,
      outputformat: string,
      exampleinput: string[],
      exampleoutput: string[]
    ) {
      const response = await client.put<{ message: string }>(`/problem/${id}`, {
        title,
        description,
        difficulty,
        constraints,
        inputformat,
        outputformat,
        exampleinput,
        exampleoutput,
      });

      const data = response.data;

      checkAndHandleError(data);

      return data.message;
    },

    async removeProblem(id: string) {
      const response = await client.delete<{ message: string }>(
        `/problem/${id}`
      );

      const data = response.data;

      checkAndHandleError(data);

      return data.message;
    },

    async getProblemById(id: string) {
      const response = await client.get<{ problem: Problem }>(`/problem/${id}`);

      const data = response.data;

      checkAndHandleError(data);

      return data;
    },
  },

  compiler: {
    async runCode(language: string, code: string, input: string) {
      const response = await client.post("/compiler/run", {
        language,
        code,
        input,
      });

      const data = response.data;
      console.log(data);

      checkAndHandleError(data);

      return data;
    },

    async submitCode(language: string, code: string, testcases: Testcase[]) {
      const response = await client.post<{
        testresults: Testresult[];
        verdict: string;
      }>("/compiler/submit", {
        language,
        code,
        testcases,
      });

      const data = response.data;

      checkAndHandleError(data);

      return data;
    },
  },
};

export default api;
