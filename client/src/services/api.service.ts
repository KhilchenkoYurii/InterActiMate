import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use((config) => {
  const userToken = document.cookie.split("jwt=").pop();

  const configWithToken = {
    ...config
  };

  configWithToken.headers.Authorization = `Bearer ${userToken}`;

  return configWithToken;
});

const get = async(url: string, params?:any) => {
  return await axiosService.get(`${baseURL}/${url}`,params);
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
