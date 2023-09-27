import { TitleWithIcons } from "../../components/PageTitleWithIcons/TitleWithIcons";
import ChatIcon from "../../assets/icons/chat.svg";
import { ReactComponent as TriangleHamburger } from "../../assets/icons/triangle-hamburger.svg";
import './ChatPage.scss';
import { ChatPreview } from "../../components/ChatPreview/ChatPreview";

export const ChatPage = () => {
  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="users-container w-1/4 overflow-scroll">
          <div className="users-container-header">
            <TriangleHamburger />
          </div>
          {Array.apply(null, Array(15)).map(() => (
            <ChatPreview name='KuYar' lastMessage='Without further interruption let`s celebrate and suck some dicks' />
          ))}
        </div>
        <div className="messages-container w-3/4">
          {/* TODO: messages part */}
          Messages
        </div>
      </div>
    </div>
  );
};
