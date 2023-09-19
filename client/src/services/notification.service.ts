import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';

interface INotify {
  duration: number;
  title?: string | null;
  message?: string | null;
  type?: NOTIFICATION_TYPE | undefined;
}

const notify = ({ duration, title, message, type }:INotify): void => {
  Store.addNotification({
    title,
    message,
    type: type || 'info',
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
