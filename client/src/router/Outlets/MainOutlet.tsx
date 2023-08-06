import { MainLayout } from "@components/layouts";
import { Outlet } from "react-router-dom";

export const MainOutlet = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
