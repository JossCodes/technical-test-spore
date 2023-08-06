import { createBrowserRouter, Navigate } from "react-router-dom";

import { getUserSession } from "@utils";

import { AuthOutlet, MainOutlet } from "./Outlets";
import { authRoutes, mainRoutes } from "./";

export const router = createBrowserRouter([
  {
    path: "/",
    element: getUserSession() ? <MainOutlet /> : <Navigate to="/auth" />,
    errorElement: <>Error Page</>,
    children: mainRoutes,
  },
  {
    path: "/auth",
    element: getUserSession() ? <Navigate to="/dashboard" /> : <AuthOutlet />,
    children: authRoutes,
  },
]);
