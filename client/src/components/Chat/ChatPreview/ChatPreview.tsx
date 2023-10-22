interface IChatPreview {
  isActive: boolean;
  img?: string;
  name: string;
  lastMessage: string;
  onChatClick: () => void;
}

const defaultImageUrl = 'https://online.hitpaw.com/images/topics/face-animator/who-is-gigachad.jpg';

export const ChatPreview = ({ isActive, img = defaultImageUrl, name, lastMessage, onChatClick }: IChatPreview) => {
  return (
    <div className={`flex chat-preview w-100 h-20 p-2 flex-1 sm:flex-col md:flex-row align-center gap-1 flex-nowrap cursor-pointer ${isActive && 'bg-cyan-700 text-white'}`} onClick={onChatClick}>
      <img src={img} className='h-16 w-16 rounded-full' />
      <div className="flex flex-col gap-1 justify-center text-left truncate">
        <div className='text-lg	font-medium leading-tight'>{name}</div>
        <div className='leading-tight truncate'>{lastMessage}</div>
      </div>
    </div>
  );
};
