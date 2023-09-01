import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import './RequestCard.scss';
import HeartIcon from "../../assets/icons/heart.svg";

export interface IRequestCard {
  title: string;
  body: string;
  categories: string[];
  _id: string;
};

export const RequestCard = ({ title, body, categories }: IRequestCard) => {
  return (
    <div className="card">
      <img className='card-img' src='https://i.blogs.es/e652ca/harold-pain-meme/840_560.jpeg' />
      <div className="info">
        <div className="row">
          <span className='text-title'>{title}</span>
          <ButtonWithIcon icon={HeartIcon} text='' onClick={() => { }} buttonType="outline" />
        </div>
        <span className='text-body'>{body}</span>
        <div className="categories-list">
          {categories.map((cat, index) => (
            <span className='text-body text-body_category'>
              {`${cat} ${index !== categories?.length - 1 ? '|' : ''} `}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
