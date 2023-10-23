import { Link } from "react-router-dom";
import constants from "../../services/constants";
import NewTabIcon from '../../assets/icons/NewTab.svg';

interface IRequestLink {
  img?: string;
  title: string;
  postId: string;
}

export const RequestLinkCard = ({ img, title, postId }: IRequestLink) => (
  <Link to={`/request?id=${postId}`} target="_blank" rel="noopener noreferrer" className="flex items-center h-14 w-full bg-white cursor-pointer shadow-sm">
    <div className="h-14 w-14 overflow-hidden">
      <img src={img || constants.imageNotFound} className="h-14 scale-125	" />
    </div>
    <div className="flex pr-2 w-full h-full justify-between pr-2">
      <div className="flex items-center text-left w-11/12">{title}</div>
      <div className="flex justify-end h-full w-1/12">
        <img src={NewTabIcon} className="sm:w-3 h-3 md:w-4 md:h-4 mt-1" />
      </div>
    </div>
  </Link>
);
