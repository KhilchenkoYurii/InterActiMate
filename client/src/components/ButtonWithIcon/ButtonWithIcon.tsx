import { CSSProperties } from 'react';
import './ButtonWithIcon.scss';

const ButtonTypes = {
  primary: 'primary',
  outline: 'outline',
};

interface IButtonWithIcon {
  icon: any;
  text: string;
  onClick?: (props?: any) => void;
  buttonType?: string;
  isSvg?: boolean;
  isSvgFilled?: boolean;
  containerStyles?: CSSProperties;
}

export const ButtonWithIcon = ({
  icon,
  text,
  onClick,
  isSvg,
  isSvgFilled,
  buttonType = ButtonTypes.primary,
  containerStyles,
}: IButtonWithIcon) => {
  return (
    <div
      onClick={onClick}
      className={`${isSvg ? 'svg-container' : 'button-container'}
      ${isSvgFilled && 'svg-container-filled '}
      ${buttonType === ButtonTypes.outline ? 'button-container-outline' : ''}`}
      style={containerStyles}
    >
      {isSvg ? icon : !!icon && <img src={icon} />}
      {text}
    </div>
  );
};
