import NoImage from '../assets/img/noimage.jpg'
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
    imageNotFound: NoImage,
    postStatus: {active:'Active', done: 'Done', canceled: 'Canceled', banned: 'Banned'}
} as IConst

