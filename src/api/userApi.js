const userApi = {};

userApi.getUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 'dummyUserId-001202023215',
        firstName: 'Hoàng Bá',
        lastName: 'Thanh',
        email: 'hbthanh5802@gmail.com',
        phoneNumber: '0382321204',
      });
    }, 2000);
  });
};

export default userApi;
