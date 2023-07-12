import { CSSProperties } from "react";
import "./ButtonWithIcon.scss";

const ButtonTypes = {
  primary: "primary",
  outline: "outline",
};

interface IButtonWithIcon {
  icon: any;
  text: string;
  onClick: (props?: any) => void;
  buttonType?: string;
  containerStyles?: CSSProperties;
}

export const ButtonWithIcon = ({ icon, text, onClick, buttonType = ButtonTypes.primary, containerStyles }: IButtonWithIcon) => {
  return (
    <div className={`button-container ${buttonType === ButtonTypes.outline ? "button-container-outline" : ""}`} style={containerStyles}>
      {text}
    </div>
  );
};