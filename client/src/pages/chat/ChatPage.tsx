import SendIcon from "../../assets/icons/send-message.svg";
import { ReactComponent as TriangleHamburger } from "../../assets/icons/triangle-hamburger.svg";
import './ChatPage.scss';
import { ChatPreview } from "../../components/ChatPreview/ChatPreview";
import { ChatMessage } from "../../components/ChatMessage/ChatMessage";
import { ChatInput } from "../../components/ChatInput/ChatInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector } from "../../store/chat/chat.selector";
import { fetchChats, fetchChatById, sendMessage, resetChats } from "../../store/chat/chat.action";
import { socket } from "../../socket";
import { userSelector } from "../../store/user/user.selector";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats, currentChat } = useSelector(chatSelector);
  const user = useSelector(userSelector);

  const currentChatMessages = [...currentChat.messages].reverse();

  const loadChatById = (chatId: string) => {
    if (!chatId) return;
    dispatch(fetchChatById(chatId));
    if (user?.name) {
      socket.emit('join_chat', { username: user.name, chatId });
    }
  };

  useEffect(() => {
    // TODO: remove log after chat is debugged
    console.log('LOAD');
    socket.connect();

    return () => {
      socket.disconnect();
      dispatch(resetChats());
    };
  }, []);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchChats(user?.userId));
    };
  }, [user]);

  const handleSend = (message: string) => {
    dispatch(sendMessage({ body: message, sender: user?.userId || '0' }));
    socket.emit('send_message', { message, userId: user?.userId, chatId: currentChat.chatId });
  };

  socket.on('receive_message', (receivedMessage) => {
    dispatch(sendMessage({ body: receivedMessage.message, sender: receivedMessage?.userId || '0' }));
  });

  socket.on('previous_messages', () => {
    // TODO:
  });

  if (!chats?.length) {
    return <div className="mt-10">
      <h1 className="text-2xl font-bold">Чати поки пустують</h1>
      <h2 className="text-xl font-medium">Вони оживуть, як тільки ти відгукнешся на чийсь запит, або хтось на твій :)</h2>
    </div>;
  }

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
          {!!currentChat.chatId && <div className="fixed bottom-0 right-0 message-input w-3/4 bg-white">
            <ChatInput icon={SendIcon} onIconClick={handleSend} />
          </div>}
          {currentChatMessages.map((message: { body: string, sender: string }) => 
            <ChatMessage body={message.body} isIncome={message.sender !== user?.userId} />
          )}
        </div>
      </div>
    </div>
  );
};
