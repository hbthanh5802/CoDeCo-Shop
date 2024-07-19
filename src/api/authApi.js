import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const authApi = {};

authApi.loginUser = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 'dummyUserId-001202023215',
          firstName: 'Hoàng Bá',
          lastName: 'Thanh',
          email: 'hbthanh5802@gmail.com',
          phoneNumber: '0382321204',
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MjEzNzg0MDB9.UzMMPDzH1wBxuw-ZmAqKdBoTe_YUfbdMi4KJrovzxsE',
      });
    }, 3000);
  });
};

// authApi.logoutUser = (data) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('OK');
//     }, 3000);
//   });
// };

authApi.logoutUser = (data) => {
  return axiosAuth.post('/auth/logout', data);
};

authApi.refreshToken = async (data) => {
  return axiosClient.post('/auth/refresh-token', data, {
    withCredentials: true,
  });
};

export default authApi;
