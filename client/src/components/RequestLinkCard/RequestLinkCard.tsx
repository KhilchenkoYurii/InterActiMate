import { useNavigate } from "react-router-dom";
import constants from "../../services/constants";
import NewTabIcon from '../../assets/icons/NewTab.svg';

interface IRequestLink {
  img?: string;
  title: string;
  postId: string;
}

export const RequestLinkCard = ({ img, title, postId }: IRequestLink) => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(`/request?id=${postId}`);
  };

  return (
    <div className="flex items-center h-14 w-full bg-white cursor-pointer shadow-sm" onClick={handlePress}>
      <div className="h-14 w-14 overflow-hidden">
        <img src={img || constants.imageNotFound} className="h-14 scale-125	" />
      </div>
      <div className="flex pr-2 w-full h-full justify-between pr-2">
        <div className="flex items-center text-left">{title}</div>
        <div className="flex h-full">
          <img src={NewTabIcon} className="w-4 h-4 mt-1" />
        </div>
      </div>
    </div>
  );
};