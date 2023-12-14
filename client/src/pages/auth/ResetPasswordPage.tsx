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
  const [shouldValidate, setShouldValidate] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (email !== '' && !Object.keys(errors).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, errors]);

  const handleChange = (value: string) => {
    setEmail(value);
    if (shouldValidate) {
      setErrors(errorHandler({ email }));
    }
  }

  const handleBlur = () => {
    setShouldValidate(true);
    setErrors(errorHandler({ email }))
  };

  function handleSubmit(event: any) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      resetPassword();
      setEmail('');
      setIsDisabled(true);
      setEmailSubmitted(true);
    }
  }

  const resetPassword = async () => {
    const response = await apiService.patch('users/forgotPassword', { email });
    console.log('response::', response);
  }

  return (
    <form action="reset-password" onSubmit={handleSubmit}>
      <div className="background-container">
        <div className="auth-container gap-3 rounded-lg">
          {emailSubmitted
            ? <span className="text-lg">Дані для відновлення паролю відправлено на вашу пошту!</span>
            : <>
              <div className="input-title">
                Введіть e-mail акаунту, який потрібно відновити:
              </div>
              <div className="w-full">
                <InputWithIcon
                  icon={MailIcon}
                  value={email}
                  onChange={(event) => handleChange(event.target.value)}
                  onBlur={handleBlur}
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
            </>}
        </div>
      </div>
    </form>
  );
};
