import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import { MyProfilePage } from '../../pages/my-profile/MyProfilePage';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';

interface IDisplayedRoute {
  component: ReactElement,
  hasHeader: boolean,
  isGuarded: boolean,
  userId?: string,
};

const DisplayedRoute = ({
  component,
  hasHeader = true,
  isGuarded = false,
  userId,
}: IDisplayedRoute) => {
  if (isGuarded && !userId) {
    return <Navigate to='/login'/>
  }

  return (
    <>
      {hasHeader && <AppHeader />}
      <div className={`app-content ${hasHeader && 'mt-16 mb-10'}`}>
        {component}
      </div>
      <AppFooter />
    </>
  );
};

export const allRoutes: IRoute[] = [
  {
    path: '/',
    component: <HomePage />,
    hasHeader: true,
    isGuarded: false,
  },
  {
    path: '/login',
    component: <LoginPage />,
    hasHeader: false,
    isGuarded: false,
  },
  {
    path: '/sign-up',
    component: <SignUpPage />,
    hasHeader: false,
    isGuarded: false,
  },
  {
    path: '/request',
    component: <RequestPage />,
    hasHeader: true,
    isGuarded: false,
  },
  {
    path: '/add-request',
    component: <AddRequestPage />,
    hasHeader: true,
    isGuarded: true,
  },
  {
    path: '/my-requests',
    component: <MyRequests />,
    hasHeader: true,
    isGuarded: true,
  },
  {
    path: '/chat',
    component: <ChatPage />,
    hasHeader: true,
    isGuarded: true,
  },
  {
    path: '/my-profile',
    component: <MyProfilePage />,
    hasHeader: true,
    isGuarded: true,
  },
];

export const AllRoutes = () => {
  const user = useSelector(userSelector);
  const localUserid = localStorage.getItem('userId')

  return (
    <Routes>
      {allRoutes.map(({ path, component, hasHeader, isGuarded }) => (
        <Route
          key={path}
          path={path}
          element={<DisplayedRoute component={component} hasHeader={!!hasHeader} isGuarded={!!isGuarded} userId={user?.userId || localUserid} />}
        />
      ))}
    </Routes>
  );
};
