import { useState } from "react";
import "./InputWithIcon.scss";
import PassIcon from "../../assets/icons/Pass.svg";
import ShowPassIcon from "../../assets/icons/showPass.svg";

interface IInputWithIcon {
  icon: string;
  isPass?: boolean;
  value?: string;
  onChange?: (event: any) => void;
  onBlur?: any;
  error?: string;
}

export const InputWithIcon = ({
  icon,
  isPass,
  value,
  onChange,
  onBlur,
  error,
}: IInputWithIcon) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      <div
        className={
          error
            ? "container container-validation-error"
            : "container container-border"
        }
      >
        <img src={icon} />
        <input
          type={isPass && !showPass ? "password" : "text"}
          className="search"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

        {isPass && (
          <img
            src={showPass ? ShowPassIcon : PassIcon}
            onClick={() => setShowPass((prev) => !prev)}
            className="cursor-pointer opacity-50"
          />
        )}
      </div>
      {error && (
        <span className="text-red-600 font-light text-sm">{error}</span>
      )}
    </div>
  );
};
