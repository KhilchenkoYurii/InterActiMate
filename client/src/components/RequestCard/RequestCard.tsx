import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import './RequestCard.scss';
import { ReactComponent as HeartIcon } from '../../assets/icons/FavIconFilled.svg';

export interface IRequestCard {
  title: string;
  body: string;
  categories: string[];
  _id: string;
  postId: string;
}

export const RequestCard = ({ title, body, categories }: IRequestCard) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img
          className="card-img"
          src="https://i1.sndcdn.com/artworks-000635780677-yhmbpw-t500x500.jpg"
        />
      </div>
      <div className="info">
        <div className="row">
          <span className="text-title">{title}</span>
          <ButtonWithIcon
            icon={<HeartIcon />}
            isSvg={true}
            text=""
            onClick={() => {}}
            buttonType="primary"
          />
        </div>
        <span className="text-body">{body}</span>
        <div className="categories-list">
          {categories.map((cat, index) => (
            <span key={index} className="text-body text-body_category">
              {`${cat} ${index !== categories?.length - 1 ? '|' : ''} `}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
