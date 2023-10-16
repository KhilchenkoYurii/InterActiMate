import { AppLogo } from '../AppLogo/AppLogo';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import { SearchBar } from '../SearchBar/SearchBar';
import LoginIcon from '../../assets/icons/LoginIcon.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import PlusFilledIcon from '../../assets/icons/plus-filled.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import './AppHeader.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service';
import { useEffect, useState } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { clearCookieHandler } from '../../pages/auth/setCookieHandler';
import { fetchUser } from '../../store/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';

export const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const token = document.cookie.split('jwt=').pop();
  const userId = localStorage.getItem('userId');

  const menuItems = [
    {
      title: 'Мій профіль',
      onClick: () => {
        navigate('/my-profile');
      },
    },
    {
      title: 'Мої оголошення',
      onClick: () => {
        navigate('/my-requests');
      },
    },
    {
      title: 'Вийти',
      onClick: async () => {
        await apiService.get(`users/logout`);
        localStorage.removeItem('userId');
        clearCookieHandler();
        navigate('/');
        window.location.reload();
      },
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId]);

  return (
    <div className="App-header">
      <div className="header-container">
        <AppLogo />
        <SearchBar />
        <Link to={'/chat'}>
          <ButtonWithIcon icon={ChatIcon} text="Чат" onClick={() => {}} />
        </Link>
        <Link to={'/add-request'}>
          <ButtonWithIcon
            icon={PlusFilledIcon}
            text="Додати оголошення"
            onClick={() => {}}
          />
        </Link>
        <ButtonWithIcon
          icon={HeartIcon}
          text=""
          onClick={() => {}}
          buttonType="outline"
        />
        <div className="profile-btn">
          {userId ? (
            <DropdownMenu user={user} menuItems={menuItems} />
          ) : (
            <img
              className="cursor-pointer login"
              alt="Login/SignUp"
              src={LoginIcon}
              onClick={() => navigate('/login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
