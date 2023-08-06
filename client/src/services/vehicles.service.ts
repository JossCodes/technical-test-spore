import { apiAuthRequest } from "@api";
import {
  ICreateVehiclePayload,
  ICreateVehicleResponse,
  IGetVehiclesPayload,
  IGetVehiclePayload,
  IGetVehiclesResponse,
  IGetVehicleResponse,
  IEditVehiclePayload,
  IEditVehicleResponse,
  IGetVehicleCoordinatesResponse,
  IEditVehicleCoordinatesPayload,
} from "@interfaces";

export const getAllVehicles = async (
  payload: IGetVehiclesPayload
): Promise<IGetVehiclesResponse> => {
  const response = await apiAuthRequest({
    method: "get",
    endpoint: "/vehicles/get-all",
    data: { ...payload },
  });

  return response as IGetVehiclesResponse;
};

export const getOneVehicle = async (
  payload: IGetVehiclePayload
): Promise<IGetVehicleResponse> => {
  const response = await apiAuthRequest({
    method: "get",
    endpoint: `/vehicles/get-one/${payload.id}`,
  });

  return response as IGetVehicleResponse;
};

export const getVehicleCoordinates = async (
  id: number
): Promise<IGetVehicleCoordinatesResponse> => {
  const response = await apiAuthRequest({
    method: "get",
    endpoint: `/vehicles/get-coordinates/${id}`,
  });

  return response as IGetVehicleCoordinatesResponse;
};

export const createVehicle = async (payload: ICreateVehiclePayload) => {
  const response = await apiAuthRequest({
    method: "post",
    endpoint: "/vehicles/create",
    data: { ...payload },
  });

  return response as ICreateVehicleResponse;
};

export const updateVehicle = async ({
  id,
  ...payload
}: IEditVehiclePayload) => {
  const response = await apiAuthRequest({
    method: "put",
    endpoint: `/vehicles/update/${id}`,
    data: { ...payload },
  });

  return response as IEditVehicleResponse;
};

export const updateVehicleCoordinates = async ({
  id,
  ...coordinates
}: IEditVehicleCoordinatesPayload) => {
  const response = await apiAuthRequest({
    method: "put",
    endpoint: `/vehicles/update-coordinates/${id}`,
    data: { ...coordinates },
  });

  return response;
};

export const deleteVehicle = async (id: number) => {
  const response = await apiAuthRequest({
    method: "delete",
    endpoint: `/vehicles/delete/${id}`,
  });

  return response;
};
