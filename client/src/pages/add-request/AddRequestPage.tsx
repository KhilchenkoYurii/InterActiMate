import { useNavigate } from 'react-router-dom';
import AddEditRequest, {
  IAttachments,
} from '../../components/AddEditRequest/AddEditRequest';
import { TitleWithIcons } from '../../components/PageTitleWithIcons/TitleWithIcons';
import { notify } from '../../services/notification.service';
import apiService from '../../services/api.service';
import { useSearchParams } from 'react-router-dom';

export const AddRequestPage = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = localStorage.getItem('userId');

  const onSubmit = async (
    title: string,
    body: string,
    attachments: IAttachments[],
    categories: string[],
    isEdit: boolean,
  ) => {
    try {
      if (!isEdit) {
        const images = attachments.filter((att: IAttachments) => att.file);
        const attachmentsWithoutFiles = attachments.map(
          (att: IAttachments) => ({
            address: att.address,
            alt: att.alt,
          }),
        );

        const formData = new FormData();
        if (images.length) {
          images.forEach((img) => {
            formData.append('images', img.file);
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
        if (Array.from(formData.keys()).length)
          await apiService.put(`posts/${post.postId}`, formData);
      } else {
        let postId = searchParams.get('postId');
        if (postId) {
          let bodyToSend = {
            title,
            body,
            attachments,
            categories,
          };
          await apiService.put(`posts/${postId}`, bodyToSend);
        }
      }
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
      <AddEditRequest onSubmit={onSubmit} />
    </div>
  );
};
