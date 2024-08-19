import axiosAuth from './axiosAuth';

const orderApi = {};

orderApi.createOrder = (data) => {
  return axiosAuth.post('/orders', data, { withCredentials: true });
};

export default orderApi;
