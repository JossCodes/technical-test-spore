import { IApiResponse } from "../api-client";

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse extends IApiResponse {
  data: {
    token: string;
  };
}
