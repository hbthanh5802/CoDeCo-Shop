import axiosAuth from './axiosAuth';

const cartApi = {};

cartApi.getUserCart = () => {
  return axiosAuth.get('/cart/show-cart');
};

cartApi.addToCart = (data) => {
  return axiosAuth.post('/cart/add-to-cart', data, { withCredentials: true });
};

cartApi.editCartItem = (cartItemId, data) => {
  return axiosAuth.put('/cart/edit-cart/' + cartItemId, data, {
    withCredentials: true,
  });
};

cartApi.selectOne = (cartItemId) => {
  return axiosAuth.put(
    '/cart/select-item/' + cartItemId,
    {},
    { withCredentials: true }
  );
};

cartApi.selectAll = () => {
  return axiosAuth.put('/cart/select-all', {}, { withCredentials: true });
};

cartApi.removeOne = (cartItemId) => {
  return axiosAuth.delete('/cart/remove-item/' + cartItemId, {
    withCredentials: true,
  });
};

cartApi.removeAll = () => {
  return axiosAuth.delete('/cart/remove-items', { withCredentials: true });
};

export default cartApi;
