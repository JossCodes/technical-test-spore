import { AxiosRequestConfig } from "axios";

export interface IApiClientRequest {
  method: AxiosRequestConfig["method"];
  endpoint: string;
  data?: Record<string, unknown>;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  data?: Record<string, unknown>;
}

export interface IApiResponse {
  message: string;
  data: unknown;
}
