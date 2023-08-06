import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/Home/HomePage";
import { IRoute } from "./routes.interface";
import { LoginPage } from "../../pages/Login/LoginPage";
import { ReactElement } from "react";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

const DisplayedRoute = (element: ReactElement, hasWrappers: boolean = true) => {
  return hasWrappers ?
    (<>
      <AppHeader />
      <div className="app-content">
        {element}
      </div>
      <AppFooter />
    </>) : (
      <>
        {element}
      </>
    )
};

export const allRoutes: IRoute[] = [
  {
    path: '/Home',
    component: <HomePage />,
  },
  {
    path: '/Login',
    component: <LoginPage />,
    hasWrappers: false,
  }
];

export const AllRoutes = () => {
  return (
    <Routes>
      {allRoutes.map(({ path, component, hasWrappers }) => (
        <Route key={path} path={path} element={DisplayedRoute(component, hasWrappers)} />
      ))}
    </Routes>
  );
};