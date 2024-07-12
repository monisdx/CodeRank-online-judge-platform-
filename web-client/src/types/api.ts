import { AxiosRequestConfig } from "axios";

type ApiEndpoints = [
  {
    uri: "/auth/login";
    response: { token: string };
    parms: { email: string; password: string };
  },
];

export type ApiEndpoint = ApiEndpoints[number]["uri"];

type EndpointByUri<T extends ApiEndpoint> = Extract<
  ApiEndpoints[number],
  { uri: T }
>;

export type ApiResponse<T extends ApiEndpoint> = EndpointByUri<T>["response"];

export type ApiParams<T extends ApiEndpoint> =
  EndpointByUri<T> extends {
    params: any;
  }
    ? EndpointByUri<T>["params"]
    : never;

type BaseApiCallConfig = {
  method?: "get" | "post" | "put" | "delete";
};

export type ApiCallConfig<T extends ApiEndpoint> = BaseApiCallConfig &
  (ApiParams<T> extends undefined
    ? AxiosRequestConfig
    : Omit<AxiosRequestConfig, "params"> & { params: ApiParams<T> });
