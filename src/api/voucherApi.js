import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const voucherApi = {};

voucherApi.addUser = (data) => {
  return axiosAuth.post('/voucherApi', data, { withCredentials: true });
};

voucherApi.getAllVouchers = (params) => {
  return axiosClient.get('/vouchers/get-all-voucher', {
    params: { page: 1, pageSize: 99999, ...params },
  });
};

export default voucherApi;
