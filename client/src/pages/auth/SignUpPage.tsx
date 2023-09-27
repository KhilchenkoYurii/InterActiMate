import { useNavigate } from "react-router-dom";
import { SignUp } from "../../components/Auth/SignUp/SignUp";
import apiService from "../../services/api.service";
import { notify } from "../../services/notification.service";
import setCookieHandler from "./setCookieHandler";

export const SignUpPage = () => {
  const nav = useNavigate();

  const onSubmitSignUp = async (
    nickname: string,
    email: string,
    password: string,
  ) => {
    try {
      const { data } = await apiService.post("users/signup", {
        nickname,
        email,
        password,
      });
      setCookieHandler(data.token);
      nav("/");
    } catch (error: any) {
      console.log("Error: ", error);
      notify({
        type: "danger",
        title: error.response.data.message,
        duration: 1000,
      });
    }
  };

  return <SignUp onSubmit={onSubmitSignUp} />;
};
