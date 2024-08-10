import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const categoryApi = {};

categoryApi.getAllCategories = (params) => {
  const searchParams = { page: 1, pageSize: 99999, ...params };
  return axiosClient.get('/categories/category', {
    params: searchParams,
  });
};

export default categoryApi;
