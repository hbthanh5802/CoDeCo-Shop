import axiosAuth from './axiosAuth';

const orderApi = {};

orderApi.createOrder = (data) => {
  return axiosAuth.post('/orders', data, { withCredentials: true });
};

orderApi.paymentVnp = (params = {}) => {
  return axiosAuth.post(
    '/payment/vn-pay',
    {},
    { params, withCredentials: true }
  );
};

export default orderApi;
