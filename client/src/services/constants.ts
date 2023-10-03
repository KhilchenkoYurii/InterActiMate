
interface IConst {
    imageNotFound:string;
    postStatus:IStatus;
}

interface IStatus {
    active: string;
    done: string;
    canceled: string;
    banned: string;
}

export default {
    imageNotFound: "https://zeppelin-marine.com.ua/img/noimage.jpg",
    postStatus: {active:'Active', done: 'Done', canceled: 'Canceled', banned: 'Banned'}
} as IConst

