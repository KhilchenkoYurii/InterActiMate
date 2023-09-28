import './ChatInput.scss';

interface IChatInput {
  icon?: string;
}

export const ChatInput = ({ icon }: IChatInput) => {
  return (
    <div className="chat-input">
      <textarea className="search" placeholder='висри шось сюди' /> 
      {icon && <img src={icon} />}
    </div>
  );
};
