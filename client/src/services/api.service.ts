import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const axiosService = axios.create({ baseURL });

const get = async(url: string) => {
  return await axiosService.get(`${baseURL}/${url}`);
};

const post = async(url: string, params?: any) => {
  return await axiosService.post(`${baseURL}/${url}`, params);
};

const put = async(url: string, params?: any) => {
  return await axiosService.put(`${baseURL}/${url}`, params);
};

export default {
  get,
  post,
  put
};
