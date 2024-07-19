import axios from 'axios';
import queryString from 'query-string';
import { jwtDecode } from 'jwt-decode';
import authApi from './authApi';
import { addToken, clearState } from '@/store/slices/authSlice';
import { customHistory } from '@/utils/history';
import { toast } from 'react-toastify';

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosAuth.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
});

let refreshTokenRequest = null;
export function setupAuthAxios(store) {
  axiosAuth.interceptors.request.use(async (config) => {
    let accessToken = store.getState().auth.accessToken; // From redux store
    let decodedToken = jwtDecode(accessToken);
    let currentDate = new Date();
    if (decodedToken.exp < currentDate.getTime() / 1000) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : authApi.refreshToken({ accessToken });

      try {
        const response = await refreshTokenRequest;
        accessToken = response?.accessToken;
        if (accessToken) store.dispatch(addToken(accessToken));
        // Reset token refresh request
        refreshTokenRequest = null;
      } catch (error) {
        console.log('Refresh Token Failed');
        if (error.status === 401) {
          toast.error('Có lỗi xảy ra, Vui lòng đăng nhập lại.', {
            autoClose: 2000,
          });
          store.dispatch(clearState());
          customHistory.push('/auth/login');
        }
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
}

export default axiosAuth;
