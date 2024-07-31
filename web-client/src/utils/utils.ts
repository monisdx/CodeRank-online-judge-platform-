import { AxiosResponse } from "axios";
import { Testcase, UnionToTuple } from "../types";

export function deepEqual<T>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function generateTestcases(inputs: string[], outputs: string[]) {
  if (inputs.length !== outputs.length) {
    return false;
  }

  return inputs.map((input, index) => ({
    input,
    expectedoutput: outputs[index],
  }));
}

export function generateInputsOutputs(testcases: Testcase[]) {
  const inputs: string[] = [];
  const outputs: string[] = [];

  testcases.forEach((testcase) => {
    inputs.push(testcase.input);
    outputs.push(testcase.expectedoutput);
  });

  return { inputs, outputs };
}
export function generateArray(str: string): string[] {
  return str.split(",").map((s) => s.trim());
}

export function generateString(array: string[]): string {
  return array.join(", ");
}

export function generateRandomString(length: number, seed?: string) {
  let result = "";
  const characters =
    seed ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function isEmail(script: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(script);
}

export function getObjectKeys<T extends object>(obj: T) {
  if (typeof obj !== "object")
    throw new Error("Not a valid object to get keys");

  return Object.keys(obj) as Array<keyof T>;
}

export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem("codemaster_JWT_stored", token);
}

export function getTokenFromLocalStorage() {
  const localCookie = localStorage.getItem("codemaster_JWT_stored");
  if (!localCookie) return false;
  return localCookie;
}

export function clearTokenFromLocalStorage() {
  localStorage.removeItem("codemaster_JWT_stored");
}

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const paramsObject: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }

  return paramsObject;
}

export function objectToQueryString(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryString;
}
