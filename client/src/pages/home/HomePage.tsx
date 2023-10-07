import { useEffect, useState } from 'react';
import { RequestCardPlaceHolder } from '../../components/Placeholders/RequestCardPlaceHolder/RequestCardPlaceHolder';
import ApiService from '../../services/api.service';
import './HomePage.scss';
import {
  IRequestCard,
  RequestCard,
} from '../../components/RequestCard/RequestCard';
import { Tabs } from '../../components/Tabs/Tabs';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../store/user/user.actions';

export const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequestCard[]>([]);
  const [user, setUser] = useState<any>(undefined);
  const [tabName, setTabName] = useState<string>('Оголошення');

  const tabs = [{ name: 'Оголошення' }, { name: 'Подані заявки' }];

  const token = document.cookie.split('jwt=').pop();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await ApiService.get('posts');
      setRequests(data?.data?.posts);
    })();

    (async () => {
      if (userId && token) {
        dispatch(fetchUser(userId));
      }
      setIsLoading(false);
    })();
  }, []);

  const getRequestsView = () => {
    if (isLoading) {
      return requests.map(() => <RequestCardPlaceHolder />);
    } else if (tabName === tabs[0].name) {
      return requests.map((request) => (
        <RequestCard key={request?._id} {...request} />
      ));
    } else {
      return requests
        .filter((req) => req.participators.includes(user.userId))
        .map((request) => <RequestCard key={request?._id} {...request} />);
    }
  };

  return (
    <div>
      {userId && (
        <Tabs
          tabs={tabs}
          activeTabName={tabName}
          setTabName={(tabName: string) => setTabName(tabName)}
        />
      )}
      <div className="cards-container">{getRequestsView()}</div>
    </div>
  );
};
