import { useNavigate } from "react-router-dom";
import Login from "../../components/Auth/Login/Login";
import apiService from "../../services/api.service";
import { notify } from "../../services/notification.service";

export const LoginPage = () => {
  const nav = useNavigate();

  const onSubmitLogin = async (email: string, password: string) => {
    try {
      await apiService.post("users/login", {
        email,
        password,
      });
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

  return <Login onSubmit={onSubmitLogin} />;
};
