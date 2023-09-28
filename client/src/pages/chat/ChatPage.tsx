import SendIcon from "../../assets/icons/send-message.svg";
import { ReactComponent as TriangleHamburger } from "../../assets/icons/triangle-hamburger.svg";
import './ChatPage.scss';
import { ChatPreview } from "../../components/ChatPreview/ChatPreview";
import { ChatMessage } from "../../components/ChatMessage/ChatMessage";
import { ChatInput } from "../../components/ChatInput/ChatInput";

const MOCK_MESSAGES = [
  { body: "I`ll be right happy to!" },
  { body: "Can you show me?" },
  { body: "Well, my daddy told me a few things to like uh, how not to rip the skin by using someone else`s mouth instead of your own hands." },
  { body: "Sometimes I pull it on so hard I rip the skin" },
  { body: "MMmMmmMmM" },
  { body: "Yeah, I see that. Daddy gave you good advice!" },
  { body: "It gets bigger when I pull on it" },
  { body: "Sorry for what? Our daddy told us not to be ashamed of our dicks, especially since they are such good size and all" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
  { body: "Oh shit, I`m sorry" },
];

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
        <div className="messages-container w-3/4 flex flex-col-reverse items-end pt-4 pr-2 pb-14 overflow-scroll">
          <div className="fixed bottom-0 right-0 message-input w-3/4 bg-white">
            <ChatInput icon={SendIcon} />
          </div>
          {MOCK_MESSAGES.map(({ body }) => 
            <ChatMessage body={body} />
          )}
        </div>
      </div>
    </div>
  );
};
