import { useEffect, useState } from 'react';
import { IRequestCard } from '../../components/RequestCard/RequestCard';
import apiService from '../../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
import MyRequests from '../../components/MyRequests/MyRequests';
import constants from '../../services/constants';
import { Tabs } from '../../components/Tabs/Tabs';
import { TitleWithIcons } from '../../components/PageTitleWithIcons/TitleWithIcons';

function MyRequestsPage() {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const [requests, setRequests] = useState<IRequestCard[]>([]);
  const [tabName, setTabName] = useState<string>('Мої оголошення');

  let tabs = [
    {
      name: 'Мої оголошення',
    },
    {
      name: 'Архів',
    },
  ];

  useEffect(() => {
    if (!userId) navigate('/');
    (async () => {
      const {
        data: {
          data: { posts },
        },
      } = await apiService.get('posts');
      setRequests(posts.filter((post: IRequestCard) => post.owner === userId));
    })();
  }, []);

  const getNoRequestsView = (canceledReq?: any) => {
    return (
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="font-semibold">Активних оголошень не знайдено</div>
        <span>
          Щоб створити нове оголошення натисніть{' '}
          <Link className="underline" to="/add-request">
            сюди
          </Link>
          {canceledReq?.length > 0 && (
            <span>
              , або відвідайте{' '}
              <span
                className="underline cursor-pointer"
                onClick={() => setTabName(tabs[1].name)}
              >
                архів
              </span>
            </span>
          )}
        </span>
      </div>
    );
  };

  const getMyRequestPageView = () => {
    if (requests.length > 0) {
      let activeReq = requests.filter(
        (e) => e.status === constants.postStatus.active,
      );
      let canceledReq = requests.filter(
        (e) => e.status === constants.postStatus.canceled,
      );

      if (activeReq.length > 0 && tabName === tabs[0].name) {
        return <MyRequests requests={activeReq} />;
      }
      if (canceledReq.length > 0 && tabName === tabs[1].name) {
        return <MyRequests requests={canceledReq} />;
      }
      if (!activeReq.length) return getNoRequestsView(canceledReq);
    }
    if (!requests.length)
      return (
        <div>
          <TitleWithIcons title="Мої оголошення" />
          {getNoRequestsView()}
        </div>
      );
  };

  return (
    <div>
      {requests.filter((e) => e.status === constants.postStatus.canceled)
        .length > 0 && (
        <Tabs
          tabs={tabs}
          activeTabName={tabName}
          setTabName={(tabName: string) => setTabName(tabName)}
        />
      )}
      {getMyRequestPageView()}
    </div>
  );
}

export default MyRequestsPage;
