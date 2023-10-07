import SendIcon from "../../assets/icons/send-message.svg";
import { ReactComponent as TriangleHamburger } from "../../assets/icons/triangle-hamburger.svg";
import './ChatPage.scss';
import { ChatPreview } from "../../components/ChatPreview/ChatPreview";
import { ChatMessage } from "../../components/ChatMessage/ChatMessage";
import { ChatInput } from "../../components/ChatInput/ChatInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector } from "../../store/chat/chat.selector";
import { fetchChats, fetchChat, sendMessage } from "../../store/chat/chat.action";
import { socket } from "../../socket";
import { userSelector } from "../../store/user/user.selector";

const userId = localStorage.getItem("userId");

export const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats, currentChat } = useSelector(chatSelector);
  const user = useSelector(userSelector);

  const currentChatMessages = [...currentChat.messages].reverse();

  const loadAllChats = async() => {
    socket.connect();
    if (!userId) return;
    dispatch(fetchChats(userId));
  }

  const loadChatById = (chatId: string) => {
    if (!chatId) return;
    dispatch(fetchChat(chatId));
    if (user?.name) {
      socket.emit('join_chat', { username: user.name, chatId });
    }
  };

  useEffect(() => {
    // TODO: remove log after chat is debugged
    console.log('LOAD');
    loadAllChats();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (message: string) => {
    console.log('sending message');
    dispatch(sendMessage({ body: message }));
    socket.emit('send_message', { message, userId, chatId: 'CHT1' });
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="users-container w-1/4 overflow-scroll">
          <div className="users-container-header">
            <TriangleHamburger />
          </div>
          {/* TODO: chat type */}
          {chats.map((chat: any) => (
            <ChatPreview name={chat?.participatorsName} lastMessage={chat?.firstMessage} onChatClick={() => loadChatById(chat.chatId)} />
          ))}
        </div>
        <div className="messages-container w-3/4 flex flex-col-reverse items-start pt-4 pr-2 pb-14 overflow-scroll">
          <div className="fixed bottom-0 right-0 message-input w-3/4 bg-white">
            <ChatInput icon={SendIcon} onIconClick={handleSend} />
          </div>
          {currentChatMessages.map((message: { body: string, sender: string }) => 
            <ChatMessage body={message.body} isIncome={message.sender !== userId} />
          )}
        </div>
      </div>
    </div>
  );
};
