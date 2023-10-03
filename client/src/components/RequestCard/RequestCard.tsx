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
}

export const RequestCard = ({
  title,
  body,
  categories,
  _id,
  attachments,
}: IRequestCard) => {
  const navigate = useNavigate();
  const navigateToRequest = () => {
    const queryParams = new URLSearchParams({ id: _id.toString() });
    navigate(`request?${queryParams}`);
  };

  return (
    <div className="card" onClick={navigateToRequest}>
      <div className="card-img-container">
        <img
          className="card-img"
          src={
            attachments[0] ? attachments[0].address : constants.imageNotFound
          }
          alt={attachments[0] ? attachments[0].alt : 'Image not found'}
        />
      </div>
      <div className="info">
        <div className="row">
          <span className="text-title">{title}</span>
        </div>

        <span className="text-body">{body}</span>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="flex-row card-categories">
            <div>{categories[0]}</div>
          </div>
        </div>

        <ButtonWithIcon
          icon={<HeartIcon />}
          isSvg={true}
          text=""
          onClick={() => {}}
          buttonType="primary"
        />
      </div>
    </div>
  );
};
