import { IRequestCard } from '../RequestCard/RequestCard';
import './Card.scss';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Calendar_light.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/Done_all_alt_round_fill_line.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User_alt_fill.svg';

export const Card = ({
  title,
  body,
  categories,
  _id,
  dateOfCreation,
  owner,
  participators,
}: IRequestCard) => {
  const getDate = (date: string): string | undefined => {
    return new Date(date).toLocaleString('ru-RU').split(',').shift();
  };
  return (
    <div className="card-body">
      {_id ? (
        <>
          <div>
            <div className="card-container">
              <div className="card-title">{title}</div>
              <div className="card-description">{body}</div>
              <hr />
              <div className="card-categories">
                {categories.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </div>
            </div>
            <div className="card-container">
              <div className="card-other">
                <div className="card-date">
                  <CalendarIcon />
                  {getDate(dateOfCreation)}
                </div>
                <div className="card-owner">
                  <UserIcon />
                  {owner}
                </div>
                <div className="card-participators">
                  <DoneIcon />
                  {participators.length}/4
                </div>
              </div>
            </div>
          </div>
          <div className="card-container">
            <img
              src="https://i1.sndcdn.com/artworks-000390427707-vxbf7b-t500x500.jpg"
              alt="Gachi"
            />
          </div>
        </>
      ) : (
        <div>No</div>
      )}
    </div>
  );
};
