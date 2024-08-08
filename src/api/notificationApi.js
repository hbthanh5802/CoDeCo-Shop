import axiosAuth from './axiosAuth';

const notificationApi = {};

notificationApi.getUserNotifications = (params) => {
  return axiosAuth.get('/notifications', { params });
};

export default notificationApi;
