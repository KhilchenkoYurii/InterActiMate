import './ChatMessage.scss'

interface IChatMessage {
  body: string;
  isIncome: boolean;
}

export const ChatMessage = ({ body, isIncome }: IChatMessage) => {
  return (
    <div className={`chat-message ${isIncome && 'chat-message-income'} p-2 rounded-xl mt-1 sm:text-right md:text-left`}>{body}</div>
  );
};