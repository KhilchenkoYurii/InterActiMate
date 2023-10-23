import { AppLogo } from '../AppLogo/AppLogo';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import { SearchBar } from '../SearchBar/SearchBar';
import LoginIcon from '../../assets/icons/LoginIcon.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import PlusFilledIcon from '../../assets/icons/plus-filled.svg';
// import HeartIcon from '../../assets/icons/heart.svg';
import './AppHeader.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service';
import { useEffect } from 'react';
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
      onClick: () => {
        apiService.get(`users/logout`);
        localStorage.removeItem('userId');
        clearCookieHandler();
        navigate('/login');
        navigate(0);
      },
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId]);

  return (
    <>
      <div className="App-header App-header-big sm:px-2 md:px-5 fixed top-0 z-50">
        <div className="text-sm	text-yellow-500	leading-3	font-black mx-2 flex md:hidden">
          !!! ВЕБСАЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ !!!
        </div>
        <div className="header-container sm:gap-2 md:gap-4">
          <AppLogo />
          {userId ? (
            <>
              <Link to={'/chat'} className="flex md:hidden">
                <ButtonWithIcon icon={ChatIcon} text="" onClick={() => {}} />
              </Link>
              <SearchBar />
              <Link to={'/chat'} className="hidden md:flex">
                <ButtonWithIcon icon={ChatIcon} text="Чат" onClick={() => {}} />
              </Link>
              <Link
                onClick={() => setTimeout(() => window.location.reload(), 100)}
                to={'/add-request'}
                className="hidden md:flex"
              >
                <ButtonWithIcon
                  icon={PlusFilledIcon}
                  text="Додати оголошення"
                  onClick={() => {}}
                />
              </Link>
              <Link to={'/add-request'} className="sm:flex md:hidden">
                <ButtonWithIcon
                  icon={PlusFilledIcon}
                  text=""
                  onClick={() => {}}
                />
              </Link>
              {/* <div className="hidden md:flex">
                <ButtonWithIcon
                  icon={HeartIcon}
                  text=""
                  onClick={() => {}}
                  buttonType="outline"
                />
              </div> */}
            </>
          ) : (
            <SearchBar />
          )}
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
    </>
  );
};
