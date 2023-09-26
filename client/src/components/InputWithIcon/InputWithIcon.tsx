import { useState } from "react";
import "./InputWithIcon.scss";
import PassIcon from "../../assets/icons/Pass.svg";
import ShowPassIcon from "../../assets/icons/showPass.svg";

interface IInputWithIcon {
  icon: string;
  isPass?: boolean;
  value?: string;
  onChange?: (event: any) => void;
}

export const InputWithIcon = ({
  icon,
  isPass,
  value,
  onChange,
}: IInputWithIcon) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="container">
      <img src={icon} />
      <input
        type={isPass && !showPass ? "password" : "text"}
        className="search"
        value={value}
        onChange={onChange}
      />
      {isPass && (
        <img
          src={showPass ? ShowPassIcon : PassIcon}
          onClick={() => setShowPass((prev) => !prev)}
          className="cursor-pointer opacity-50"
        />
      )}
    </div>
  );
};
