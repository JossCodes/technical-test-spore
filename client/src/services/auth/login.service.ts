import { apiPublicRequest } from "@api";
import {
  ILoginCredentials,
  ILoginResponse,
  IRegisterCredentials,
  IRegisterResponse,
} from "@interfaces";

export const loginUser = async ({
  email,
  password,
}: ILoginCredentials): Promise<ILoginResponse> => {
  const response = await apiPublicRequest({
    method: "post",
    endpoint: "/auth/login",
    data: { email, password },
  });

  return response as ILoginResponse;
};

export const registerUser = async (
  payload: IRegisterCredentials
): Promise<IRegisterResponse> => {
  const response = await apiPublicRequest({
    method: "post",
    endpoint: "/auth/register",
    data: { ...payload },
  });

  return response as IRegisterResponse;
};
