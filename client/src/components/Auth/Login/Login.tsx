import { useEffect, useState } from 'react';
import { InputWithIcon } from '../../../components/InputWithIcon/InputWithIcon';
import MailIcon from '../../../assets/icons/mail.svg';
import KeyIcon from '../../../assets/icons/key.svg';
import GoogleIcon from '../../../assets/icons/google.svg';
import '../auth.scss';
import { Link } from 'react-router-dom';
import errorHandler from '../errorHandler';
import getGoogleAuthURL from '../../../pages/auth/loginWithGoogle';

interface ILogin {
  onSubmit: (email: string, password: string) => void;
}

interface IErrors {
  email?: string;
  password?: string;
}

const Login = ({ onSubmit }: ILogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({} as IErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  function handleSubmit(event: any) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      onSubmit(email, password);
      setEmail('');
      setPassword('');
      setIsDisabled(true);
    }
  }

  function handleChangeEmail(event: any) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: any) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    if (password !== '' && email !== '' && !Object.keys(errors).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, errors]);

  return (
    <form action="login" onSubmit={handleSubmit}>
      <div className="background-container">
        <div className="auth-container md">
          {/* <button className="button button-google">
            <a href={getGoogleAuthURL()}>Продовжити через Google</a>
            <img src={GoogleIcon} />
          </button>
          <div className="or-section">
            <hr />
            Чи
            <hr />
          </div> */}
          <div className="buttons-row">
            <Link to={'/login'} className="link">
              <button className="active">Увійти</button>
            </Link>
            <Link to={'/sign-up'} className="link">
              <button>Зареєструватися</button>
            </Link>
          </div>
          <div className="animated">
            <div className="input-row">
              <span className="input-title">Електронна пошта</span>
              <InputWithIcon
                icon={MailIcon}
                value={email}
                onChange={handleChangeEmail}
                onBlur={() => setErrors(errorHandler({ email, password }))}
                error={errors['email']}
              />
            </div>
            <div className="input-row">
              <span className="input-title">Пароль</span>
              <InputWithIcon
                icon={KeyIcon}
                isPass={true}
                value={password}
                onChange={handleChangePassword}
                onBlur={() => setErrors(errorHandler({ email, password }))}
                error={errors['password']}
              />
            </div>
            <Link to={'/reset-password'} className="link-forget">
              Забули пароль?
            </Link>
            <button
              className={
                isDisabled
                  ? 'button opacity-50 pointer-events-none bg-gray-400 text-white mb-4'
                  : 'button button-submit mb-4'
              }
            >
              Увійти
            </button>
            <span className="terms-text">
              Під час входу ви погоджуєтеся з нашими
            </span>
            <Link
              to={'/terms-and-conditions'}
              className="terms-text terms-text-bold hover:underline"
            >
              Умовами користування.
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
