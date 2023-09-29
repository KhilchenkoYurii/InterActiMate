import { AppLogo } from "../AppLogo/AppLogo";
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon";
import { SearchBar } from "../SearchBar/SearchBar";
import LoginIcon from "../../assets/icons/LoginIcon.svg";
import ChatIcon from "../../assets/icons/chat.svg";
import PlusFilledIcon from "../../assets/icons/plus-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import "./AppHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { useEffect, useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

export const AppHeader = () => {
  const navigate = useNavigate();
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

  return (
    <div className="App-header">
      <div className="header-container">
        <AppLogo />
        <SearchBar />
        <Link to={"/chat"}>
          <ButtonWithIcon icon={ChatIcon} text="Чат" onClick={() => {}} />
        </Link>
        <Link to={"/chat"}>
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
          {token ? (
            <div>
              <DropdownMenu user={user} />
            </div>
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
