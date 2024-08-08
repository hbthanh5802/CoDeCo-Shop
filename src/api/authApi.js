import { auth } from '@/configs/firebase';
import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const authApi = {};

authApi.loginUser = (data) => {
  return axiosClient.post('/auth/login', data, {
    withCredentials: true,
  });
};

authApi.logoutUser = (data) => {
  return axiosAuth.post('/auth/logout', data);
};

authApi.refreshToken = async (data) => {
  return axiosClient.post('/auth/refresh-token', data, {
    withCredentials: true,
  });
};

export default authApi;
