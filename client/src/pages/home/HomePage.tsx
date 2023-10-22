import { useEffect, useState } from 'react';
import { RequestCardPlaceHolder } from '../../components/Placeholders/RequestCardPlaceHolder/RequestCardPlaceHolder';
import apiService from '../../services/api.service';
import './HomePage.scss';
import {
  IRequestCard,
  RequestCard,
} from '../../components/RequestCard/RequestCard';
import { Tabs } from '../../components/Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/user/user.actions';
import constants from '../../services/constants';
import { userSelector } from '../../store/user/user.selector';
import useWindowSize from '../../services/windowSize.service';
import { getTailWindGridColsClassFromNumber } from '../../services/tailwind.service';

const REQUEST_CARD_WIDTH = 250;
const REQUEST_CARD_GAP = 18;
const MOBILE_BREAKPOINT = 640;

export const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequestCard[]>([]);
  const user = useSelector(userSelector);
  const [tabName, setTabName] = useState<string>('Оголошення');
  const [size] = useWindowSize();
  const [numberOfCardsColumns, setNumberOfCardsColumns] = useState(1);

  const isMobile = size < MOBILE_BREAKPOINT;

  // updates number of columns to display depending on screen size
  useEffect(() => {
    if (isMobile) return;
    const newCardsColumnsNumber = Math.floor(size / (REQUEST_CARD_WIDTH + REQUEST_CARD_GAP));
    if (!!newCardsColumnsNumber && newCardsColumnsNumber !== numberOfCardsColumns) {
      setNumberOfCardsColumns(newCardsColumnsNumber);
    }
  }, [size]);

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
    <div className='flex justify-center home-page-container'>
      {getTabsView()}
      {/* there's no sense to check possible numbers of columns for mobile, so it's hardcoded */}
      {isMobile && <div className={`cards-container grid grid-cols-2`}>{getRequestsView()}</div>}
      {!isMobile &&
        <div className={`cards-container grid ${getTailWindGridColsClassFromNumber(numberOfCardsColumns)} justify-items-center`}>
          {getRequestsView()}
        </div>
      }
    </div>
  );
};
