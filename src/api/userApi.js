import axiosAuth from './axiosAuth';

const userApi = {};

userApi.getUserData = () => {
  return axiosAuth.get('/user/me', { withCredentials: true });
};

userApi.getAllAddresses = (params = {}) => {
  const searchParams = {
    page: 1,
    pageSize: 99999,
    sortBy: 'addressId',
    direction: 'asc',
    ...params,
  };
  return axiosAuth.get('/address', {
    params: searchParams,
    withCredentials: true,
  });
};

userApi.createOneAddress = (data) => {
  return axiosAuth.post('/address', data, { withCredentials: true });
};

export default userApi;
