import SendIcon from "../../assets/icons/send-message.svg";
import { ReactComponent as TriangleHamburger } from "../../assets/icons/triangle-hamburger.svg";
import './ChatPage.scss';
import { ChatPreview } from "../../components/ChatPreview/ChatPreview";
import { ChatMessage } from "../../components/ChatMessage/ChatMessage";
import { ChatInput } from "../../components/ChatInput/ChatInput";
import { useEffect } from "react";
import ApiService from "../../services/api.service";
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector } from "../../store/chat/chat.selector";
import { sendMessage } from "../../store/chat/chat.action";
import { io } from 'socket.io-client';
// import * as io from 'socket.io-client';

// const socket = io.connect('http://localhost:3000');

const socket = io('http://localhost:3000');

export const ChatPage = () => {
  const dispatch = useDispatch();
  const { currentChat } = useSelector(chatSelector);

  socket.on('connect', () => {
    console.log('CONNECTED!');
  });


  const loadChats = async() => {
    const usedId = localStorage.getItem('userId');
    const chats = await ApiService.get(`chats/${usedId}`);
    // TODO: remove log after displaying chats from API is implemented
    console.log('chats fetched::', chats);
  }

  useEffect(() => {
    loadChats();
    socket.connect();
  }, []);

  const handleSend = (message: string) => {
    // dispatch(sendMessage(message));
    console.log('sending message');
    socket.emit('join_chat', { username: 'keksik', chatId: 'CHT1' });
  };

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
            <ChatInput icon={SendIcon} onIconClick={handleSend} />
          </div>
          {currentChat.messages.map((message: string) => 
            <ChatMessage body={message} />
          )}
        </div>
      </div>
    </div>
  );
};
