import axiosAuth from './axiosAuth';
import { axiosClient } from './axiosClient';

const categoryApi = {};

categoryApi.getAllCategories = (params) => {
  const searchParams = { page: 1, pageSize: 99999, ...params };
  return axiosClient.get('/categories/category', {
    params: searchParams,
  });
};

categoryApi.getAllSizes = () => {
  const searchParams = {
    page: 1,
    pageSize: 99999,
    sortBy: 'sizeId',
    direction: 'asc',
  };
  return axiosClient.get('/categories/size', {
    params: searchParams,
  });
};

categoryApi.getAllMaterials = () => {
  const searchParams = {
    page: 1,
    pageSize: 99999,
    sortBy: 'materialId',
    direction: 'asc',
  };
  return axiosClient.get('/categories/size', {
    params: searchParams,
  });
};

categoryApi.getAllColors = () => {
  const searchParams = {
    page: 1,
    pageSize: 99999,
    sortBy: 'colorId',
    direction: 'asc',
  };
  return axiosClient.get('/categories/color', {
    params: searchParams,
  });
};

export default categoryApi;
