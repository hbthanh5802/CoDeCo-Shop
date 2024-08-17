import { axiosClient } from './axiosClient';

const productApi = {};

productApi.searchProducts = (params = {}) => {
  const searchParams = {
    categoryIds: [],
    sizeIds: [],
    colorIds: [],
    fromPrice: undefined,
    toPrice: undefined,
    newest: false,
    bestSeller: false,
    priceSort: false,
    searchValue: '',
    page: 1,
    pageSize: 10,
    ...params,
  };
  return axiosClient.get('/products/search', { params: searchParams });
};

productApi.getProductsByCategoryId = (categoryId, params = {}) => {
  const searchParams = {
    sortBy: 'productId',
    direction: 'asc',
    page: 1,
    pageSize: 99999,
    ...params,
  };
  return axiosClient.get('/products/category/' + categoryId, {
    params: searchParams,
  });
};

productApi.getProductDetail = (productId) =>
  axiosClient.get('/products/' + productId);

productApi.getProductFilter = (data) => {
  return axiosClient.post('/products/productDetails/filter', data);
};

productApi.getReviewSummary = (productId) => {
  return axiosClient.get('/reviews/get-review-summary/' + productId);
};

productApi.getProductReviews = (params) => {
  const { productId } = params;
  const searchParams = { page: 1, pageSize: 3, rate: 0, ...params };
  return axiosClient.get('/reviews/get-review/' + productId, {
    params: searchParams,
  });
};

export default productApi;
