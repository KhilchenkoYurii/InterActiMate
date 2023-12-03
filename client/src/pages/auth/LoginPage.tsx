import { useNavigate } from 'react-router-dom';
import Login from '../../components/Auth/Login/Login';
import apiService from '../../services/api.service';
import { notify } from '../../services/notification.service';
import { setCookieHandler } from './setCookieHandler';

export const LoginPage = () => {
  const nav = useNavigate();

  const onSubmitLogin = async (email: string, password: string) => {
    try {
      const data = await apiService.post('users/login', {
        email,
        password,
      });
      console.log('data :', data);
      setCookieHandler(data.data.token);
      localStorage.setItem('userId', data.data.user.userId);
      nav('/');
    } catch (error: any) {
      console.log('Error: ', error);
      notify({
        type: 'danger',
        title: error.response.data.message,
        duration: 1000,
      });
    }
  };

  return <Login onSubmit={onSubmitLogin} />;
};
