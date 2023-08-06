import { IApiResponse } from "../api-client";

export interface IRegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface IRegisterResponse extends IApiResponse {
  data: {
    token: string;
  };
}
