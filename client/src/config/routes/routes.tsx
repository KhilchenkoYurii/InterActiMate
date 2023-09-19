import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { IRoute } from "./routes.interface";
import { LoginPage } from "../../pages/auth/LoginPage";
import { ReactElement } from "react";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";
import { SignUpPage } from "../../pages/auth/SignUpPage";
import { RequestPage } from "../../pages/request/RequestPage";
import { AddRequestPage } from "../../pages/add-request/AddRequestPage";

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
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/login',
    component: <LoginPage />,
    hasWrappers: false,
  },
  {
    path: '/sign-up',
    component: <SignUpPage />,
    hasWrappers: false,
  },
  {
    path: '/request',
    component: <RequestPage />,
    hasWrappers: true,
  },
  {
    path: '/add-request',
    component: <AddRequestPage />,
    hasWrappers: true,
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