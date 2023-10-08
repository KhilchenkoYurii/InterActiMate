import './Card.scss';
import { useEffect, useState } from 'react';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Calendar_light.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/Done_all_alt_round_fill_line.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User_alt_fill.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/Email_Icon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/PhoneIcon.svg';
import { ReactComponent as NickNameIcon } from '../../assets/icons/NickName.svg';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import ApplyIcon from '../../assets/icons/Apply.svg';
import ApiService from '../../services/api.service';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { notify } from '../../services/notification.service';
import Placeholder from '../Placeholders/Placeholder';

//TODO: Create an Interface for the props
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
  owner,
  attachments,
}: any) => {
  const userId = localStorage.getItem('userId');
  const [isApplied, setApplying] = useState<Boolean | undefined>(undefined);

  const getDate = (date: string): string | undefined => {
    return new Date(date).toLocaleString('ru-RU').split(',').shift();
  };

  useEffect(() => {
    if (participators) {
      setApplying(participators.includes(userId));
    }
  }, [JSON.stringify(participators), userId]);

  const applyPost = () => {
    ApiService.post(`posts/answerPost`, { userId, postId });
    setApplying(true);
    notify({ duration: 1200, title: 'Заявку подано!' });
  };

  const getCategoriesView = () => {
    if (categories.length) {
      return (
        <div>
          <hr className="card-hr" />
          <div className="card-categories">
            {categories.map((e: string, i: number) => (
              <div key={i}>{e}</div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {_id ? (
        <>
          <div className="card-body">
            <div>
              <div className="card-container">
                <div className="card-title">{title}</div>
                <div className="card-description break-all">{body}</div>
                {getCategoriesView()}
              </div>
              <div className="card-container">
                <div className="card-other-header">
                  {phone && (
                    <div
                      className="card-other-container prevent-select"
                      role="button"
                      onClick={() => {
                        navigator.clipboard.writeText(phone);
                        notify({
                          duration: 500,
                          message: `Phone ${phone} copied!`,
                        });
                      }}
                    >
                      <PhoneIcon />
                      <div>{phone}</div>
                    </div>
                  )}
                  {email && (
                    <div
                      className="card-other-container prevent-select"
                      role="button"
                      onClick={() => {
                        navigator.clipboard.writeText(email);
                        notify({
                          duration: 500,
                          message: `Email ${email} copied!`,
                        });
                      }}
                    >
                      <EmailIcon />
                      <div>{email}</div>
                    </div>
                  )}
                  {nickname && (
                    <div
                      className="card-other-container prevent-select"
                      role="button"
                      onClick={() => {
                        navigator.clipboard.writeText(nickname);
                        notify({
                          duration: 500,
                          message: `Nickname ${nickname} copied!`,
                        });
                      }}
                    >
                      <NickNameIcon />
                      <div>{nickname}</div>
                    </div>
                  )}
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
                      <div>{participators.length}</div>
                    </div>
                  </div>
                </div>
              </div>
              {owner !== userId && (
                <div
                  className={
                    isApplied
                      ? 'card-apply-btn-not-allowed prevent-select'
                      : 'card-apply-btn'
                  }
                >
                  <ButtonWithIcon
                    buttonType="outline"
                    text={isApplied ? 'Заявку подано' : 'Подати заявку'}
                    icon={isApplied ? null : ApplyIcon}
                    onClick={() => applyPost()}
                  />
                </div>
              )}
            </div>
            {attachments.length > 0 && (
              <div className="card-container card-imgs">
                <AwesomeSlider
                  bullets={false}
                  infinite={false}
                  organicArrows={attachments.length > 1}
                  className="aws-btn"
                >
                  {attachments.map((e: any) => (
                    <div key={e.alt} data-src={e.address} />
                  ))}
                </AwesomeSlider>
              </div>
            )}
          </div>
        </>
      ) : (
        <Placeholder type="rect" className="card-placeholder" />
      )}
    </>
  );
};
