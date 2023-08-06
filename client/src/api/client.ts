import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ApiRequestConfig, IApiClientRequest, IApiResponse } from "@interfaces";
import { removeUserSession } from "@utils";
const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url,
});

const getToken = () => {
  return Cookies.get("user_token");
};

const checkIfTokenExists = (token: string | undefined) => {
  if (!token) {
    window.location.reload();
  }
};

export const apiPublicRequest = async ({
  method,
  endpoint,
  data,
}: IApiClientRequest): Promise<IApiResponse> => {
  const config: ApiRequestConfig = {
    method,
    url: endpoint,
    data,
  };

  if (data) {
    if (method === "get") {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  const response = await apiClient(config);
  return response.data;
};

export const apiAuthRequest = async ({
  method,
  endpoint,
  data,
}: IApiClientRequest) => {
  try {
    const token = getToken();
    checkIfTokenExists(token);
    const config: ApiRequestConfig = {
      method,
      url: endpoint,
      data,
      headers: {
        authorization: token,
      },
    };

    if (data) {
      if (method === "get") {
        config.params = data;
      } else {
        config.data = data;
      }
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        removeUserSession();
        window.location.reload();
      }
    } else {
      throw error;
    }
  }
};
