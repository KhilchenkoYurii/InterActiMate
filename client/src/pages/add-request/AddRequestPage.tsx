import { useNavigate } from 'react-router-dom';
import AddEditRequest, {
  IAttachments,
} from '../../components/AddEditRequest/AddEditRequest';
import { TitleWithIcons } from '../../components/PageTitleWithIcons/TitleWithIcons';
import { notify } from '../../services/notification.service';
import apiService from '../../services/api.service';

export const AddRequestPage = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem('userId');

  const onSubmit = async (
    title: string,
    body: string,
    attachments: IAttachments[],
    categories: string[],
  ) => {
    try {
      const images = attachments.map((att: IAttachments) =>
        att.file ? att.file : att,
      );
      const attachmentsWithoutFiles = attachments.map((att: IAttachments) => ({
        address: att.address,
        alt: att.alt,
      }));
      const formData = new FormData();
      if (images.length) {
        images.forEach((img) => {
          formData.append('images', img, img.name);
        });
      }
      let bodyToSend = {
        title,
        body,
        attachments:
          attachmentsWithoutFiles.length > 0 ? attachmentsWithoutFiles : [],
        categories,
      };
      let {
        data: {
          data: { post },
        },
      } = await apiService.post(`posts/${userId}`, bodyToSend);
      if (formData.keys.length)
        await apiService.put(`posts/${post.postId}`, formData);
      nav('/');
    } catch (error: any) {
      console.log('Error: ', error);
      notify({
        type: 'danger',
        title: error,
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <TitleWithIcons title="Створити оголошення" />
      <AddEditRequest onSubmit={onSubmit} />
    </div>
  );
};
