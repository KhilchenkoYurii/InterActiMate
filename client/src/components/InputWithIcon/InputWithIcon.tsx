import "./InputWithIcon.scss";

interface IInputWithIcon {
  icon: string
};

export const InputWithIcon = ({ icon }: IInputWithIcon) =>  {
  return (
    <div className="container">
      <img src={icon} />
      <input type="text" className="search" />
    </div>
  );
};
