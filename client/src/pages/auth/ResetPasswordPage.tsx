import { InputWithIcon } from "../../components/InputWithIcon/InputWithIcon";
import MailIcon from '../../assets/icons/mail.svg';
import { useEffect, useState } from "react";
import errorHandler from "../../components/Auth/errorHandler";
import apiService from "../../services/api.service";

interface IErrors {
  email?: string;
}

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({} as IErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (email !== '' && !Object.keys(errors).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, errors]);

  function handleSubmit(event: any) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      resetPassword();
      setEmail('');
      setIsDisabled(true);
    }
  }

  const resetPassword = async() => {
    const response = await apiService.post('users/forgotPassword', { email });
    console.log('response::', response);
  }

  return (
    <form action="reset-password" onSubmit={handleSubmit}>
      <div className="background-container">
        <div className="auth-container gap-3 md">
          <div className="input-title">
            Введіть e-mail акаунту, який потрібно відновити:
          </div>
          <div className="w-full">
            <InputWithIcon
              icon={MailIcon}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setErrors(errorHandler({ email }))}
              error={errors['email']}
            />
          </div>
          <button
            disabled={isDisabled}
            className={
              isDisabled
                ? 'button opacity-50 pointer-events-none bg-gray-400 text-white mb-4'
                : 'button button-submit mb-4'
            }
          >
            Скинути пароль
          </button>
        </div>
      </div>
    </form>
  );
};
