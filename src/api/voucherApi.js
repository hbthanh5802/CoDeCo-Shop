import { voucherStatus } from '@/constants';
import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const voucherApi = {};

voucherApi.addUser = (data) => {
  return axiosAuth.post('/vouchers/collect', data, { withCredentials: true });
};

voucherApi.getAllVouchers = (params) => {
  return axiosClient.get('/vouchers/get-all-voucher', {
    params: { page: 1, pageSize: 99999, ...params },
  });
};

voucherApi.getUserVouchers = (params = {}) => {
  const searchParams = {
    page: 1,
    pageSize: 99999,
    sortBy: 'userVoucherId',
    direction: 'asc',
    status: voucherStatus.ALL,
    ...params,
  };

  return axiosAuth.get('/vouchers/get-all', {
    params: searchParams,
    withCredentials: true,
  });
};

voucherApi.checkVoucher = (data) => {
  return axiosAuth.post('/vouchers/check-voucher', data, {
    withCredentials: true,
  });
};

export default voucherApi;
