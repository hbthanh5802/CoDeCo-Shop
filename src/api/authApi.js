import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const authApi = {};

authApi.loginUser = (data) => {
  return axiosClient.post('/auth/login', data, {
    withCredentials: true,
  });
};

authApi.loginWithGoogle = (params = {}) => {
  return axiosClient.get('/auth/oauth/google', { params });
};

authApi.logoutUser = (data) => {
  return axiosAuth.post('/auth/logout-once', data, {
    withCredentials: true,
  });
};

authApi.refreshToken = async (data) => {
  console.log('Refreshing...');
  return axiosClient.post('/auth/refresh-token', data, {
    withCredentials: true,
  });
};

authApi.registerUser = (data) => {
  return axiosClient.post('/auth/register', data);
};

authApi.verifyOtp = (data) => {
  return axiosClient.post('/auth/verify-otp', data);
};

authApi.verifyLink = (data) => {
  return axiosClient.post('/auth/verify-link', data);
};

authApi.regenerateOtp = (params) => {
  return axiosClient.post('/auth/regenerate-otp', {}, { params });
};

authApi.forgotPassword = (params) => {
  return axiosClient.post('/auth/forgot-password', {}, { params });
};

authApi.recoverPassword = (data) => {
  return axiosClient.post('/auth/recover-password', data);
};

export default authApi;
