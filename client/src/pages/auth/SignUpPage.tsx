import { InputWithIcon } from "../../components/InputWithIcon/InputWithIcon";
import AtIcon from "../../assets/icons/at.svg";
import MailIcon from "../../assets/icons/mail.svg";
import KeyIcon from "../../assets/icons/key.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import "./auth.scss";
import { Link } from "react-router-dom";

export const SignUpPage = () => {
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
        <div className="buttons-row buttons-row-signup">
          <Link to={'/login'} className="link">
            <button>
              Увійти
            </button>
          </Link>
          <Link to={'/sign-up'} className="link">
            <button className="active">
              Зареєструватися
            </button>
          </Link>
        </div>
        <div className="input-row">
          <span className="input-title">
            Нікнейм
          </span>
          <InputWithIcon icon={AtIcon} />
        </div>
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
        <span className="terms-text terms-text-left">
          Створюючи профіль на InterActiMate, ви погоджуєтеся з
        </span>
        <Link to={'/terms-and-conditions'} className="terms-text terms-text-bold terms-text-left">
          Умовами користування.
        </Link>
        <button className="button button-signup">Зареєструватися</button>
      </div>
    </div>
  );
};