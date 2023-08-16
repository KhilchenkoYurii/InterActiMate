import { InputWithIcon } from "../../components/InputWithIcon/InputWithIcon";
import MailIcon from "../../assets/icons/mail.svg";
import KeyIcon from "../../assets/icons/key.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import "./auth.scss";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="background-container">
      <div className="auth-container">
        <button className="button button-google">
          Продовжити через Google
          <img src={GoogleIcon} />
        </button>
        <div className="or-section">
          <hr />Чи<hr />
        </div>
        <div className="buttons-row">
          <Link to={'/login'} className="link">
            <button className="active">
              Увійти
            </button>
          </Link>
          <Link to={'/sign-up'} className="link">
            <button>
              Зареєструватися
            </button>
          </Link>
        </div>
        <div className="animated">
          <div className="input-row">
            <span className="input-title">
              Електронна пошта
            </span>
            <InputWithIcon icon={MailIcon} />
          </div>
          <div className="input-row">
            <span className="input-title">
              Пароль
            </span>
            <InputWithIcon icon={KeyIcon} />
          </div>
          <Link to={'/resetpassword'} className="link-forget">
            Забули пароль?
          </Link>
          <button className="button button-submit">Увійти</button>
          <span className="terms-text">
            Під час входу ви погоджуєтеся з нашими
          </span>
          <Link to={'/terms-and-conditions'} className="terms-text terms-text-bold">
            Умовами користування.
          </Link>
        </div>
      </div>
    </div>
  );
};