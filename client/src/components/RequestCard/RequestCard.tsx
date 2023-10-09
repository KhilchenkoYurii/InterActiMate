import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import './RequestCard.scss';
import { ReactComponent as HeartIcon } from '../../assets/icons/FavIconFilled.svg';
import { useNavigate } from 'react-router-dom';
import constants from '../../services/constants';

interface IAttachments {
  address: string;
  alt: string;
}

export type TStatus = 'Active' | 'Done' | 'Canceled' | 'Banned';

export interface IRequestCard {
  title: string;
  body: string;
  categories: string[];
  _id: string;
  postId: string;
  dateOfCreation: string;
  owner: string;
  participators: string[];
  attachments: IAttachments[];
  status: TStatus;
  handleClick?: () => void;
}

export const RequestCard = ({
  title,
  _id,
  attachments,
  handleClick,
}: IRequestCard) => {
  const navigate = useNavigate();
  const navigateToRequest = () => {
    !!handleClick && handleClick();
    const queryParams = new URLSearchParams({ id: _id.toString() });
    navigate(`/request?${queryParams}`);
  };

  return (
    <div className="card" onClick={navigateToRequest}>
      <div className="card-img-container mb-1">
        <img
          className="card-img min-h-[13rem]"
          src={
            attachments[0] ? attachments[0].address : constants.imageNotFound
          }
          alt={attachments[0] ? attachments[0].alt : 'Image not found'}
        />
      </div>
      <div className="info">
        <div className="row mt-2">
          <div className="text-title break-all ">{title}</div>
          <ButtonWithIcon
            icon={<HeartIcon />}
            isSvg={true}
            text=""
            onClick={() => {}}
            buttonType="primary"
          />
        </div>
      </div>
    </div>
  );
};
