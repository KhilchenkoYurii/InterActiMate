import { useNavigate } from "react-router-dom";
import "./AppLogo.scss";

export const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-container" onClick={() => navigate('/')}>
      <div className="logo-text">
        InterActiMate
      </div>
    </div>
  );
};