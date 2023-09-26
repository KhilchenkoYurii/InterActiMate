import { useState } from 'react';
import './InputWithIcon.scss';
import PassIcon from '../../assets/icons/Pass.svg';
import ShowPassIcon from '../../assets/icons/showPass.svg';

interface IInputWithIcon {
  icon: string;
  isPass?: boolean;
}

export const InputWithIcon = ({ icon, isPass }: IInputWithIcon) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="container">
      <img src={icon} />
      <input
        type={isPass && !showPass ? 'password' : 'text'}
        className="search"
      />
      {isPass && (
        <img
          src={showPass ? ShowPassIcon : PassIcon}
          onClick={() => setShowPass((prev) => !prev)}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};
