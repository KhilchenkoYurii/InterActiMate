import { AppLogo } from "../AppLogo/AppLogo";
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon";
import { SearchBar } from "../SearchBar/SearchBar";
import UserIcon from "../../assets/icons/user_filled.svg";
import ChatIcon from "../../assets/icons/chat.svg";
import PlusFilledIcon from "../../assets/icons/plus-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import "./AppHeader.scss";

export const AppHeader = () => {
  return (
    <div className="App-header">
      <AppLogo />
      <SearchBar />
      <ButtonWithIcon icon={ChatIcon} text="Чат" onClick={() => { }} />
      <ButtonWithIcon icon={PlusFilledIcon} text="Додати оголошення" onClick={() => { }} />
      <ButtonWithIcon icon={HeartIcon} text='' onClick={() => { }} buttonType="outline" />
      <div className="profile-btn">
        <img src={UserIcon} width={30} height={30} />
      </div>
    </div>
  );
}