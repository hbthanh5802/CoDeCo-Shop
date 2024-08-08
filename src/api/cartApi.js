import axiosAuth from './axiosAuth';

const cartApi = {};

cartApi.getUserCart = () => {
  return axiosAuth.get('/cart/show-cart');
};

export default cartApi;
