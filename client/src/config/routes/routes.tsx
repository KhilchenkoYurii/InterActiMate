import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { IRoute } from "./routes.interface";

export const allRoutes: IRoute[] = [
  {
    path: '/',
    component: <HomePage />,
  }
];

export const AllRoutes = () => {
  return (
    <Routes>
      {allRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};