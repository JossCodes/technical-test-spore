import { IApiResponse } from "./api-client";

export interface IVehicleCoordinates {
  latitude: number;
  longitude: number;
  write?: boolean;
}

export interface IVehicle {
  id: number;
  brand: string;
  name: string;
  write: boolean;
  color?: string;
  image?: string;
  model?: string;
  plates?: string;
  createdAt?: string;
  updatedAt?: string;
  coordinates?: IVehicleCoordinates;
}

export interface IGetVehiclesPayload {
  page?: number;
  pageSize?: number;
}

export interface IGetVehiclesResponse extends IApiResponse {
  data: {
    vehicles: IVehicle[];
    totalPages: number;
  };
}

export interface IGetVehiclePayload {
  id: number;
}

export interface IGetVehicleResponse extends IApiResponse {
  data: {
    vehicle: IVehicle;
  };
}

export interface IGetVehicleCoordinatesResponse extends IApiResponse {
  data: {
    coordinates: IVehicleCoordinates;
  };
}

export interface ICreateVehiclePayload {
  brand: string;
  name: string;
  color?: string;
  image?: string;
  model?: string;
  plates?: string;
}

export interface ICreateVehicleResponse extends IApiResponse {
  data: {
    newVehicle: IVehicle;
  };
}

export interface IEditVehiclePayload {
  id: number;
  brand?: string;
  name?: string;
  color?: string;
  image?: string;
  model?: string;
  plates?: string;
}

export interface IEditVehicleCoordinatesPayload {
  id: number;
  latitude: number;
  longitude: number;
}

export interface IEditVehicleResponse extends IApiResponse {
  data: {
    vehicle: IVehicle;
  };
}
