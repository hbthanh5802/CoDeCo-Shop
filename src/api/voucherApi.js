import axiosAuth from './axiosAuth';

const voucherApi = {};

voucherApi.addUser = (data) => {
  return axiosAuth.post('/voucherApi', data, { withCredentials: true });
};

export default voucherApi;
