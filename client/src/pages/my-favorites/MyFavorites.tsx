import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRequestCard } from '../../components/RequestCard/RequestCard';
import apiService from '../../services/api.service';
import constants from '../../services/constants';

const MyFavorites = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [requests, setRequests] = useState<IRequestCard[]>([]);

  useEffect(() => {
    if (!userId) navigate('/');
    (async () => {
      const {
        data: {
          data: { user },
        },
      } = await apiService.get(`users/${userId}`);
      console.log('data :', user);
      setRequests(user);
    })();
  }, []);

  return <div></div>;
};

export default MyFavorites;
