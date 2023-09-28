import { AppLogo } from "../AppLogo/AppLogo";
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon";
import { SearchBar } from "../SearchBar/SearchBar";
import UserIcon from "../../assets/icons/user_filled.svg";
import LoginIcon from "../../assets/icons/LoginIcon.svg";
import ChatIcon from "../../assets/icons/chat.svg";
import PlusFilledIcon from "../../assets/icons/plus-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import "./AppHeader.scss";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(undefined) as any;

  const token = document.cookie.split("jwt=").pop();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    (async () => {
      if (userId && token) {
        try {
          const {
            data: {
              data: { user },
            },
          } = await apiService.get(`users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(user);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })();
  }, []);

  const handleNavigateToPath = (path: string) => {
    if (!location.pathname.includes(path)) {
      navigate(path);
    }
  };

  return (
    <div className="App-header">
      <div className="header-container">
        <AppLogo />
        <SearchBar />
        <ButtonWithIcon icon={ChatIcon} text="Чат" onClick={() => handleNavigateToPath('/chat')} />
        <ButtonWithIcon
          icon={PlusFilledIcon}
          text="Додати оголошення"
          onClick={() => handleNavigateToPath("/add-request")}
        />
        <ButtonWithIcon
          icon={HeartIcon}
          text=""
          onClick={() => { }}
          buttonType="outline"
        />
        <div className="profile-btn">
          {token ? (
            <img
              className="rounded-full"
              src={user?.avatar ? user?.avatar : UserIcon}
              width={30}
              height={30}
            />
          ) : (
            <img
              className="cursor-pointer login"
              alt="Login/SignUp"
              src={LoginIcon}
              onClick={() => navigate("/login")}
            />
          )}
        </div>
        </div>
      </div>
      );
};
