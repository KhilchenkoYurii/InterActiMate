import { useNavigate } from 'react-router-dom';
import { IRequestCard } from '../RequestCard/RequestCard';
import Button from '@mui/material/Button';
import constants from '../../services/constants';
import './MyRequests.scss';
import apiService from '../../services/api.service';

interface IMyRequests {
  requests: IRequestCard[];
}

function MyRequests({ requests }: IMyRequests) {
  const navigate = useNavigate();
  const navigateToRequest = (_id: string) => {
    const queryParams = new URLSearchParams({ id: _id.toString() });
    navigate(`/request?${queryParams}`);
  };

  const getDate = (date: string): string | undefined => {
    return new Date(date).toLocaleString('ru-RU').split(',').shift();
  };

  return (
    <div className="flex flex-wrap justify-center items-center flex-col my-3">
      {requests.map((req: IRequestCard) => (
        <div
          key={req._id}
          className="reqs-container gap-3 my-3"
          onClick={() => navigateToRequest(req._id)}
        >
          <div>
            <div className="text-title">{req.title}</div>
            <div className="break-words w-[25rem] text-[0.9rem]">
              {req.body}
            </div>
            <span className="reqs-date">{getDate(req.dateOfCreation)}</span>
            <hr className="max-w-[8rem] mt-2 mb-3" />
            <div className="flex gap-2 flex-wrap">
              <Button disabled variant="contained">
                Редагувати
              </Button>
              {req.status === constants.postStatus.active ? (
                <Button
                  variant="contained"
                  onClick={async (e) => {
                    e.stopPropagation();
                    let answer = window.confirm(
                      `Ви впевнені що хочете деактивувати "${req.title}"?`,
                    );

                    if (answer) {
                      try {
                        await apiService.put(`posts/${req.postId}`, {
                          status: constants.postStatus.canceled,
                        });
                        window.location.reload();
                      } catch (error) {
                        console.log('Error: ', error);
                      }
                    }
                  }}
                  color="error"
                >
                  Деактивувати
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={async (e) => {
                    e.stopPropagation();
                    let answer = window.confirm(
                      `Ви впевнені що хочете активувати "${req.title}"?`,
                    );

                    if (answer) {
                      try {
                        await apiService.put(`posts/${req.postId}`, {
                          status: constants.postStatus.active,
                        });
                        window.location.reload();
                      } catch (error) {
                        console.log('Error: ', error);
                      }
                    }
                  }}
                  color="success"
                >
                  Активувати
                </Button>
              )}
            </div>
          </div>
          <div>
            <img
              className="w-[10rem] h-[10rem] object-cover rounded-md"
              src={
                req.attachments[0]
                  ? req.attachments[0].address
                  : constants.imageNotFound
              }
              alt={
                req.attachments[0] ? req.attachments[0].alt : 'Image not found'
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyRequests;
