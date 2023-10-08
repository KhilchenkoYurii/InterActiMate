import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home/HomePage';
import { IRoute } from './routes.interface';
import { ReactElement } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { AppFooter } from '../../components/AppFooter/AppFooter';
import { SignUpPage } from '../../pages/auth/SignUpPage';
import { RequestPage } from '../../pages/request/RequestPage';
import { AddRequestPage } from '../../pages/add-request/AddRequestPage';
import { ChatPage } from '../../pages/chat/ChatPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import MyRequests from '../../pages/my-requests/MyRequestsPage';
import MyFavorites from '../../pages/my-favorites/MyFavorites';

const DisplayedRoute = (
  element: ReactElement,
  hasHeader: boolean = true,
  hasFooter: boolean = true,
) => {
  return (
    <>
      {hasHeader && <AppHeader />}
      <div className="app-content">{element}</div>
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
    hasFooter: false,
  },
  {
    path: '/my-favorites',
    component: <MyFavorites />,
    hasFooter: false,
  },
  {
    path: '/my-requests',
    component: <MyRequests />,
  },
  {
    path: '/chat',
    component: <ChatPage />,
    hasFooter: false,
  },
];

export const AllRoutes = () => {
  return (
    <Routes>
      {allRoutes.map(({ path, component, hasHeader, hasFooter }) => (
        <Route
          key={path}
          path={path}
          element={DisplayedRoute(component, hasHeader, hasFooter)}
        />
      ))}
    </Routes>
  );
};
