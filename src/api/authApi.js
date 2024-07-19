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
          '123123kjhdhajkasfbdcc.adsjasjkhdjkhuqiw23.asjksf89234238497',
      });
    }, 3000);
  });
};

export default authApi;
