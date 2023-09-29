import { TitleWithIcons } from "../../components/PageTitleWithIcons/TitleWithIcons";
import PlusFilledIcon from "../../assets/icons/plus-filled.svg";

export const AddRequestPage = () => {
  return (
    <div className="name">
      <TitleWithIcons icon={PlusFilledIcon} title="Створити оголошення" />
    </div>
  );
};
