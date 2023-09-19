import { Store } from 'react-notifications-component';

interface INotify {
  duration: number;
  title?: string | null;
  message?: string | null;
}

const notify = ({ duration, title, message }:INotify): void => {
  Store.addNotification({
    title,
    message,
    type: 'info',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration,
    },
  });
};

export { notify };
