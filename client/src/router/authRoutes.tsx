import { LogingPage, RegisterPage } from "@views";
import { Navigate } from "react-router-dom";

export const authRoutes = [
  {
    path: "",
    element: <Navigate to="login" />,
  },
  {
    path: "login",
    element: <LogingPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];
