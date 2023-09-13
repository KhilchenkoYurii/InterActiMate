// import { IRequestCard } from '../RequestCard/RequestCard';
import './Card.scss';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Calendar_light.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/Done_all_alt_round_fill_line.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User_alt_fill.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/Email_Icon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/PhoneIcon.svg';
import { ReactComponent as NickNameIcon } from '../../assets/icons/NickName.svg';
import { Store } from 'react-notifications-component';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import ApplyIcon from '../../assets/icons/Apply.svg';
import ApiService from '../../services/api.service';

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
  postId,
}: any) => {
  const getDate = (date: string): string | undefined => {
    return new Date(date).toLocaleString('ru-RU').split(',').shift();
  };

  const applyPost = (participators: any) => {
    ApiService.put(`posts/${postId}`, { participators });
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
                <div
                  className="card-other-container prevent-select"
                  role="button"
                  onClick={() => {
                    navigator.clipboard.writeText(phone);
                    Store.addNotification({
                      message: `Phone ${phone} copied!`,
                      type: 'info',
                      insert: 'top',
                      container: 'top-right',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 100,
                      },
                    });
                  }}
                >
                  <PhoneIcon />
                  <div>{phone}</div>
                </div>
                <div
                  className="card-other-container prevent-select"
                  role="button"
                  onClick={() => {
                    navigator.clipboard.writeText(email);
                    Store.addNotification({
                      message: `Email ${email} copied!`,
                      type: 'info',
                      insert: 'top',
                      container: 'top-right',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 100,
                      },
                    });
                  }}
                >
                  <EmailIcon />
                  <div>{email}</div>
                </div>
                <div
                  className="card-other-container prevent-select"
                  role="button"
                  onClick={() => {
                    navigator.clipboard.writeText(nickname);
                    Store.addNotification({
                      message: `Nickname ${nickname} copied!`,
                      type: 'info',
                      insert: 'top',
                      container: 'top-right',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 100,
                      },
                    });
                  }}
                >
                  <NickNameIcon />
                  <div>{nickname}</div>
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
            <div className="card-apply-btn">
              <ButtonWithIcon
                buttonType="outline"
                text="Подати заявку"
                icon={ApplyIcon}
                onClick={() => applyPost([{ nickname, phone }])}
              />
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
