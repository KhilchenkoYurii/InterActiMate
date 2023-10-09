import { useEffect, useState } from 'react';
import MyProfile from '../../components/MyProfile/MyProfile';
import { TitleWithIcons } from '../../components/PageTitleWithIcons/TitleWithIcons';
import apiService from '../../services/api.service';

export const MyProfilePage = () => {
  const [user, setUser] = useState(undefined) as any;

  const userId = localStorage.getItem('userId');
  const token = document.cookie.split('jwt=').pop();

  useEffect(() => {
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
    })();
  }, []);

  return (
    <div>
      <TitleWithIcons title="Мій профіль" />
      <MyProfile {...user} />
    </div>
  );
};
