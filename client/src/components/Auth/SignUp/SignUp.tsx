import { InputWithIcon } from "../../../components/InputWithIcon/InputWithIcon";
import AtIcon from "../../../assets/icons/at.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import KeyIcon from "../../../assets/icons/key.svg";
import GoogleIcon from "../../../assets/icons/google.svg";
import "../auth.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import errorHandler from "../errorHandler";

interface ISignUp {
  onSubmit: (nickname: string, email: string, password: string) => void;
}

interface IErrors {
  email?: string;
  password?: string;
  nickname?: string;
}

export const SignUp = ({ onSubmit }: ISignUp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({} as IErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit(nickname, email, password);
      setEmail("");
      setPassword("");
      setNickname("");
      setIsDisabled(true);
    }
  }

  function handleChangeEmail(event: any) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: any) {
    setPassword(event.target.value);
  }

  function handleChangeNickname(event: any) {
    setNickname(event.target.value);
  }

  useEffect(() => {
    if (
      password !== "" &&
      email !== "" &&
      nickname !== "" &&
      !Object.keys(errors).length
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, nickname, errors]);

  return (
    <form action="signUp" onSubmit={handleSubmit}>
      <div className="background-container">
        <div className="auth-container">
          <button className="button button-google">
            Продовжити через Google
            <img src={GoogleIcon} />
          </button>
          <div className="or-section">
            <hr />
            Чи
            <hr />
          </div>
          <div className="buttons-row buttons-row-signup">
            <Link to={"/login"} className="link">
              <button>Увійти</button>
            </Link>
            <Link to={"/sign-up"} className="link">
              <button className="active">Зареєструватися</button>
            </Link>
          </div>
          <div className="animated">
            <div className="input-row">
              <span className="input-title">Нікнейм</span>
              <InputWithIcon
                icon={AtIcon}
                value={nickname}
                onChange={handleChangeNickname}
              />
            </div>
            <div className="input-row">
              <span className="input-title">Електронна пошта</span>
              <InputWithIcon
                icon={MailIcon}
                value={email}
                onChange={handleChangeEmail}
                onBlur={() => setErrors(errorHandler({ email, password }))}
                error={errors["email"]}
              />
            </div>
            <div className="input-row">
              <span className="input-title">Пароль</span>
              <InputWithIcon
                icon={KeyIcon}
                value={password}
                onChange={handleChangePassword}
                onBlur={() => setErrors(errorHandler({ email, password }))}
                error={errors["password"]}
                isPass={true}
              />
            </div>
            <span className="terms-text terms-text-left">
              Створюючи профіль на InterActiMate, ви погоджуєтеся з
            </span>
            <Link
              to={"/terms-and-conditions"}
              className="terms-text terms-text-bold terms-text-left hover:underline"
            >
              Умовами користування.
            </Link>
            <button
              className={
                isDisabled
                  ? "button opacity-50 pointer-events-none bg-gray-400 text-white mt-2"
                  : "button button-signup mt-2"
              }
            >
              Зареєструватися
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
