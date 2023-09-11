// import { IRequestCard } from '../RequestCard/RequestCard';
import './Card.scss';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Calendar_light.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/Done_all_alt_round_fill_line.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User_alt_fill.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/Email_Icon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/PhoneIcon.svg';
import { ReactComponent as NickNameIcon } from '../../assets/icons/NickName.svg';

export const Card = ({
  title,
  body,
  categories,
  _id,
  dateOfCreation,
  participators,
  surname,
  name,
  phone,
  email,
  nickname,
}: any) => {
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
              <hr className="card-hr" />
              <div className="card-categories">
                {categories.map((e: string, i: number) => (
                  <div key={i}>{e}</div>
                ))}
              </div>
            </div>
            <div className="card-container">
              <div className="card-other-header">
                <div className="card-other-container">
                  <PhoneIcon />
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(phone);
                    }}
                  >
                    {phone}
                  </div>
                </div>
                <div className="card-other-container">
                  <EmailIcon />
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(email);
                    }}
                  >
                    {email}
                  </div>
                </div>
                <div className="card-other-container">
                  <NickNameIcon />
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(nickname);
                    }}
                  >
                    {nickname}
                  </div>
                </div>
              </div>
              <hr className="card-hr" />
              <div className="card-other">
                <div className="card-other-container">
                  <CalendarIcon />
                  <div>{getDate(dateOfCreation)}</div>
                </div>
                <div className="card-other-user">
                  <div className="card-other-container">
                    <UserIcon />
                    <div>
                      {surname} {name}
                    </div>
                  </div>
                  <div className="card-other-container">
                    <DoneIcon />
                    <div>{participators.length}/4</div>
                  </div>
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
