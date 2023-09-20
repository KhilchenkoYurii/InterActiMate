import { TitleWithIcons } from "../../components/PageTitleWithIcons/TitleWithIcons";
import ChatIcon from "../../assets/icons/chat.svg";
import './ChatPage.scss';

export const ChatPage = () => {
  return (
    <>
      <TitleWithIcons icon={ChatIcon} title="Чат" />
      <div className="chat-container">
        <div className="users-container">
          huj
        </div>
        <div className="messages-container">
          pizda
        </div>
      </div>
    </>
  );
};
