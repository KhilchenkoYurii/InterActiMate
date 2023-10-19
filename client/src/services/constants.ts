import Images from '../assets/img'
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
    imageNotFound: Images.noImage,
    postStatus: {active:'Active', done: 'Done', canceled: 'Canceled', banned: 'Banned'}
} as IConst

