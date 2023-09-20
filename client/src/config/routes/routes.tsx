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
import { ChatPage } from "../../pages/chat/ChatPage";

const DisplayedRoute = (element: ReactElement, hasHeader: boolean = true, hasFooter: boolean = true) => {
  return (
    <>
      {hasHeader && <AppHeader />}
      <div className='app-content'>
        {element}
      </div>
      {hasFooter && <AppFooter />}
    </>
  );
};

export const allRoutes: IRoute[] = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/login',
    component: <LoginPage />,
    hasHeader: false,
    hasFooter: false,
  },
  {
    path: '/sign-up',
    component: <SignUpPage />,
    hasHeader: false,
    hasFooter: false,
  },
  {
    path: '/request',
    component: <RequestPage />,
  },
  {
    path: '/add-request',
    component: <AddRequestPage />,
  },
  {
    path: '/chat',
    component: <ChatPage />,
    hasFooter: false,
  }
];

export const AllRoutes = () => {
  return (
    <Routes>
      {allRoutes.map(({ path, component, hasHeader, hasFooter }) => (
        <Route key={path} path={path} element={DisplayedRoute(component, hasHeader, hasFooter)} />
      ))}
    </Routes>
  );
};