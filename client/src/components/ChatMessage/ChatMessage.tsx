import './ChatMessage.scss'

interface IChatMessage {
  body: string;
}

export const ChatMessage = ({ body }: IChatMessage) => {
  return (
    <div className="chat-message p-2 rounded-xl mt-1 text-left">{body}</div>
  );
};