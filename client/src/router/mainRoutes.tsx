import { CreateVehicle, Dashboard, EditVehicle, MapVehicle } from "@views";
import { Navigate } from "react-router-dom";

export const mainRoutes = [
  {
    path: "",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/vehicle/create",
    element: <CreateVehicle />,
  },
  {
    path: "/vehicle/edit/:id",
    element: <EditVehicle />,
  },
  {
    path: "/vehicle/map/:id",
    element: <MapVehicle />,
  },
];
