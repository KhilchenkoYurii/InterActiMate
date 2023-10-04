import AddEditRequest from '../../components/AddEditRequest/AddEditRequest';
import { TitleWithIcons } from '../../components/PageTitleWithIcons/TitleWithIcons';

export const AddRequestPage = () => {
  return (
    <div>
      <TitleWithIcons title="Створити оголошення" />
      <AddEditRequest />
    </div>
  );
};
