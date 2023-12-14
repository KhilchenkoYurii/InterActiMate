import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use((config) => {
  const userToken = document.cookie.split("jwt=").pop();
  console.log('UserToken', userToken);

  const configWithToken = {
    ...config
  };

  if (userToken) {
    configWithToken.headers.Authorization = `Bearer ${userToken}`;
  }

  return configWithToken;
});

axiosService.interceptors.response.use((response) => {
  if (response.status === 401) {
    window.location.href = '/login';
  };

  return response;
});

const get = async(url: string, params?:any) => {
  return await axiosService.get(`${baseURL}/${url}`,params);
};

const post = async(url: string, params?: any, headers?:any) => {
  return await axiosService.post(`${baseURL}/${url}`, params, headers);
};

const put = async(url: string, params?: any) => {
  return await axiosService.put(`${baseURL}/${url}`, params);
};

const patch = async(url: string, params?: any) => {
  return await axiosService.patch(`${baseURL}/${url}`, params);
};

const del = async(url: string, params?: any) => {
  return await axiosService.delete(`${baseURL}/${url}`, params);
};

export default {
  get,
  post,
  put,
  patch,
  del
};
