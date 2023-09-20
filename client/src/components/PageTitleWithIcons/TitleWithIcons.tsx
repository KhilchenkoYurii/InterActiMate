import './TitleWithIcons.scss';

interface ITitleWithIcons {
  title: string;
  icon?: any;
}

export const TitleWithIcons = ({ title, icon }: ITitleWithIcons) => {
  return (
    <div className="title-with-icon">
      <img src={icon} />
      <span>{title}</span>
      <img src={icon} />
    </div>
  );
};
