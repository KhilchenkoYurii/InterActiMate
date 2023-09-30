import './ChatInput.scss';
import { useState } from 'react';

interface IChatInput {
  icon?: string;
  onIconClick?: any;
}

export const ChatInput = ({ icon, onIconClick }: IChatInput) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    onIconClick(inputValue);
    setInputValue('');
  };

  return (
    <div className="chat-input">
      <textarea className="search" placeholder='висри шось сюди' value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} /> 
      {icon && <img src={icon} onClick={handleSubmit} />}
    </div>
  );
};
