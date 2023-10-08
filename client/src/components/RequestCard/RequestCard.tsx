import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import './RequestCard.scss';
import { ReactComponent as HeartIcon } from '../../assets/icons/FavIconFilled.svg';
import { useNavigate } from 'react-router-dom';
import constants from '../../services/constants';
import apiService from '../../services/api.service';
import { useState } from 'react';

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
  _id,
  attachments,
  postId,
  favoritePosts,
}: any) => {
  const navigate = useNavigate();

  const navigateToRequest = () => {
    const queryParams = new URLSearchParams({ id: _id.toString() });
    navigate(`request?${queryParams}`);
  };

  const setFavorite = async (postId: string) => {
    await apiService.put(`users/updateMe`, { favoritePosts: [postId] });
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
        <div className="row mt-2">
          <div className="text-title break-all ">{title}</div>

          <ButtonWithIcon
            icon={<HeartIcon />}
            isSvg={true}
            isSvgFilled={favoritePosts.includes(postId)}
            text=""
            onClick={async (e) => {
              e.stopPropagation();
              console.log('Addaed');
              setFavorite(postId);
            }}
            buttonType="primary"
          />
        </div>
      </div>
    </div>
  );
};
