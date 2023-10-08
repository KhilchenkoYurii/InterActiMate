import { useEffect, useState } from 'react';
import { RequestCardPlaceHolder } from '../../components/Placeholders/RequestCardPlaceHolder/RequestCardPlaceHolder';
import apiService from '../../services/api.service';
import './HomePage.scss';
import {
  IRequestCard,
  RequestCard,
} from '../../components/RequestCard/RequestCard';
import { Tabs } from '../../components/Tabs/Tabs';
import constants from '../../services/constants';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequestCard[]>([]);
  const [user, setUser] = useState<any>(undefined);
  const [tabName, setTabName] = useState<string>('Оголошення');

  const tabs = [{ name: 'Оголошення' }, { name: 'Подані заявки' }];

  const token = document.cookie.split('jwt=').pop();
  const userId = localStorage.getItem('userId') as string;

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const {
        data: {
          data: { posts },
        },
      } = await apiService.get('posts', {
        params: { status: constants.postStatus.active },
      });
      setRequests(posts);
    })();

    (async () => {
      if (userId && token) {
        try {
          const {
            data: {
              data: { user },
            },
          } = await apiService.get(`users/${userId}`);
          setUser(user);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const getRequestsView = () => {
    if (isLoading) {
      return requests.map(() => <RequestCardPlaceHolder />);
    } else if (tabName === tabs[0].name) {
      return requests.map((request) => {
        let temp = { ...request, ...user };
        return <RequestCard key={request?._id} {...temp} />;
      });
    } else {
      return requests
        .filter((req) => req.participators.includes(user.userId))
        .map((request) => <RequestCard key={request?._id} {...request} />);
    }
  };

  const getTabsView = () => {
    let userReq = requests.filter((req) => req.participators.includes(userId));
    if (userId && userReq.length > 0) {
      return (
        <Tabs
          tabs={tabs}
          activeTabName={tabName}
          setTabName={(tabName: string) => setTabName(tabName)}
        />
      );
    }
  };

  return (
    <div>
      {getTabsView()}
      <div className="cards-container">{getRequestsView()}</div>
    </div>
  );
};
