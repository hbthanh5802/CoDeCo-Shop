import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  if (config.data) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    throw error;
  }
);

export { axiosClient };
