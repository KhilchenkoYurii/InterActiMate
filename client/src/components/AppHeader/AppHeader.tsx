import { AppLogo } from "../AppLogo/AppLogo";
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon";
import { SearchBar } from "../SearchBar/SearchBar";
import UserIcon from "../../assets/icons/user_filled.svg";
import "./AppHeader.scss";

export const AppHeader = () => {
  return (
    <div className="App-header">
      <AppLogo />
      <SearchBar />
      <ButtonWithIcon icon={null} text="Чат" onClick={() => { }} />
      <ButtonWithIcon icon={null} text="Додати оголошення" onClick={() => { }} />
      <ButtonWithIcon icon={null} text="Збережені" onClick={() => { }} buttonType="outline" />
      <div className="profile-btn">
        <img src={UserIcon} />
      </div>
    </div>
  );
}