import { axiosClient } from './axiosClient';

const productApi = {};

productApi.searchProduct = (params) => {
  return axiosClient.get('/products', { params });
};

export default productApi;
