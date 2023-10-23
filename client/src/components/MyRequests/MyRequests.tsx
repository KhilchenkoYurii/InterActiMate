import { useNavigate } from 'react-router-dom';
import { IRequest } from '../RequestCard/RequestCard';
import Button from '@mui/material/Button';
import constants from '../../services/constants';
import './MyRequests.scss';
import apiService from '../../services/api.service';

interface IMyRequests {
  requests: IRequest[];
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

  const deactivatePost = async (e: any, req: any) => {
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
  };

  const activatePost = async (e: any, req: any) => {
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
  };

  const editPost = async (e: any, postId: string) => {
    e.stopPropagation();
    const queryParams = new URLSearchParams({ postId: postId.toString() });
    navigate(`/add-request?${queryParams}`);
  };

  return (
    <div className="flex flex-col justify-center items-center my-3">
      {requests.map((req: IRequest) => (
        <div
          key={req._id}
          className="grid grid-rows-2 reqs-container gap-3 my-3"
          onClick={() => navigateToRequest(req._id)}
        >
          <div className="w-full md:max-w-[40rem]">
            <div className="text-title">{req.title}</div>
            <div className="break-words  text-[0.9rem]">{req.body}</div>
            <span className="reqs-date">{getDate(req.dateOfCreation)}</span>
            <hr className="max-w-[8rem] mt-2 mb-3" />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={async (e) => await editPost(e, req.postId)}
                type="button"
                className="text-[white] bg-[green] rounded-[4px] flex justify-center items-center h-10 min-w-[10rem]"
              >
                Редагувати
              </button>
              {req.status === constants.postStatus.active ? (
                <div className="w-full md:flex">
                  <button
                    onClick={async (e) => await deactivatePost(e, req)}
                    type="button"
                    className="text-[white] bg-[#d32f2f] rounded-[4px] flex justify-center items-center h-10 min-w-[10rem]"
                  >
                    Деактивувати
                  </button>
                </div>
              ) : (
                <div className="w-full md:flex">
                  <button
                    type="button"
                    className="text-[white] bg-[green] rounded-[4px] flex justify-center items-center h-10 min-w-[10rem]"
                    onClick={async (e) => await activatePost(e, req)}
                  >
                    Активувати
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <img
              className="m-auto w-[20rem] h-[20rem] md:w-[10rem] md:h-[10rem] md:m-0 object-cover rounded-md"
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
