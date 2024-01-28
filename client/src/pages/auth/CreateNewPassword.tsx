import { useSearchParams } from "react-router-dom";
import MailIcon from '../../assets/icons/key.svg';
import apiService from "../../services/api.service";
import { InputWithIcon } from "../../components/InputWithIcon/InputWithIcon";
import { Formik } from 'formik';
import * as Yup from 'yup';

interface IResetPasswordErrors {
  password?: string;
  passwordConfirm?: string;
}

export const CreateNewPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Пароль повинен бути не менше 8 символів').required(),
    passwordConfirm: Yup.string().min(8, 'Пароль повинен бути не менше 8 символів').required().oneOf([Yup.ref('password'), ''], 'Паролі повинні збігатись'),
  });

  const createNewPassword = async ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) => {
    const response = await apiService.patch(`users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
  }

  return (
    <Formik
      initialValues={{ password: '', passwordConfirm: '' }}
      validationSchema={validationSchema}
      onSubmit={createNewPassword}
    >
      {({
        values, errors, touched, handleChange, handleBlur
      }) => {
        const disabled = !touched.password || !touched.passwordConfirm || !!errors.password || !!errors.passwordConfirm;
        return (
          <form action="create-new-password" onSubmit={(e) => {
            e.preventDefault();
            createNewPassword(values);
          }}>
            <div className="background-container">
              <div className="auth-container gap-3 flex items-start rounded-lg md:w-1/2 max-w-lg">
                <div className="input-title">
                  Введіть новий пароль:
                </div>
                <div className="w-full">
                  <InputWithIcon
                    name='password'
                    type='password'
                    icon={MailIcon}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password ? errors.password : ''}
                  />
                </div>

                <div className="input-title">
                  Підтвердіть пароль:
                </div>
                <div className="w-full">
                  <InputWithIcon
                    name='passwordConfirm'
                    type='password'
                    icon={MailIcon}
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    error={touched.passwordConfirm ? errors.passwordConfirm : ''}
                    onBlur={handleBlur}
                  />
                </div>

                <button
                  type='submit'
                  disabled={disabled}
                  className={
                    disabled
                      ? 'button opacity-50 pointer-events-none bg-gray-400 text-white mb-4'
                      : 'button button-submit mb-4'
                  }
                >
                  змінити пароль
                </button>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  );
};
