import { useNavigate } from 'react-router-dom';
import { IRequestCard } from '../RequestCard/RequestCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import constants from '../../services/constants';
import './MyRequests.scss';

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
          className="reqs-container my-3"
          onClick={() => navigateToRequest(req._id)}
        >
          <div className="w-full">
            <div className="text-title">{req.title}</div>
            <div className="text-body">{req.body}</div>
            <span className="reqs-date">{getDate(req.dateOfCreation)}</span>
            <hr className="max-w-[8rem] mt-2 mb-3" />
            <Stack spacing={2} direction="row">
              <Button
                style={{
                  backgroundColor: '#176b87',
                }}
                variant="contained"
              >
                Редагувати
              </Button>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  let answer = window.confirm(
                    `Ви впевнені що хочете видалити "${req.title}"?`,
                  );

                  console.log('answer :', answer);
                }}
                color="error"
              >
                Видалити
              </Button>
            </Stack>
          </div>
          <div className="h-full">
            <img
              className="max-w-[11rem] object-cover rounded-md"
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
