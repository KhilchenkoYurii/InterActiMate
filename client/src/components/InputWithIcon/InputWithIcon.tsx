import "./InputWithIcon.scss";

interface IInputWithIcon {
  icon: string
};

export const InputWithIcon = ({ icon }: IInputWithIcon) =>  {
  console.log('icon::', icon);
  return (
    <div className="container">
      <img src={icon} />
      <input type="text" className="search" />
    </div>
  );
};
