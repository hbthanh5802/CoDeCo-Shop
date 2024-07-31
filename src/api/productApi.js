import { axiosClient } from './axiosClient';

const productApi = {};

productApi.searchProduct = (params) => {
  return axiosClient.get('/products', { params });
};

productApi.searchProduct = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({
          length: Math.floor(Math.random() * 20 + 10),
        }),
        pagination: {
          totalCount: 100,
          totalPage: 3,
        },
      });
    }, 1000);
  });
};

export default productApi;
