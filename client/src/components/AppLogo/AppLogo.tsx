import { useNavigate } from "react-router-dom";
import Images from '../../assets/img'
import "./AppLogo.scss";

export const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="logo-container hidden md:flex" onClick={() => navigate('/')}>
        <div className="logo-text">
          InterActiMate
        </div>
      </div>
      <div className="small-logo flex md:hidden" onClick={() => navigate('/')}>
        <img className="scale-150" src={Images.IAM} />
      </div>
    </>
  );
};