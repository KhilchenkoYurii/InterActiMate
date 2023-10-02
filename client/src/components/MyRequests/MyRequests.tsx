import { useNavigate } from 'react-router-dom';
import { IRequestCard } from '../RequestCard/RequestCard';
import './MyRequests.scss';

interface IMyRequests {
  requests: IRequestCard[];
}

function MyRequests({ requests }: IMyRequests) {
  console.log('requests :', requests);
  const navigate = useNavigate();
  const navigateToRequest = (_id: string) => {
    const queryParams = new URLSearchParams({ id: _id.toString() });
    navigate(`/request?${queryParams}`);
  };

  const imageNotFound = 'https://zeppelin-marine.com.ua/img/noimage.jpg';
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
          <div>
            <div className="text-title">{req.title}</div>
            <div className="text-body">{req.body}</div>
            <span className="reqs-date">{getDate(req.dateOfCreation)}</span>
          </div>
          <div>
            <img
              className="max-w-[8rem] h-28 object-cover rounded-md"
              src={
                req.attachments[0] ? req.attachments[0].address : imageNotFound
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
