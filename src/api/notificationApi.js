import axiosAuth from './axiosAuth';

const notificationApi = {};

notificationApi.getUserNotifications = (params) => {
  const searchParams = { page: 1, pageSize: 99999, ...params };
  return axiosAuth.get('/notifications', { params: searchParams });
};

notificationApi.updateUserNotifications = (notificationId) => {
  return axiosAuth.put('/notifications/set-as-read/' + notificationId);
};

notificationApi.updateAllUserNotification = () => {
  return axiosAuth.post('/notifications/set-all-as-read');
};

export default notificationApi;
