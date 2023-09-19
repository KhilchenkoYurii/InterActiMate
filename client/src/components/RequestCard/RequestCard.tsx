import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import './RequestCard.scss';
import { ReactComponent as HeartIcon } from '../../assets/icons/FavIconFilled.svg';
import { useNavigate } from 'react-router-dom';

//TODO: Add type for participators
export interface IRequestCard {
  title: string;
  body: string;
  categories: string[];
  _id: string;
  postId: string;
  dateOfCreation: string;
  owner: string;
  participators: any;
}

export const RequestCard = ({ title, body, categories, _id }: IRequestCard) => {
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
          src="https://i1.sndcdn.com/artworks-000635780677-yhmbpw-t500x500.jpg"
        />
      </div>
      <div className="info">
        <div className="row">
          <span className="text-title">{title}</span>
        </div>

        <span className="text-body">{body}</span>

        <div className="card-footer">
          <div className="categories-list">
            {categories.map((cat, index) => (
              <span key={index} className="text-body text-body_category">
                {`${cat} ${index !== categories?.length - 1 ? '|' : ''} `}
              </span>
            ))}
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
    </div>
  );
};
