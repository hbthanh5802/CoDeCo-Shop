import axios from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import authApi from './authApi';
import { addToken, clearState } from '@/store/slices/authSlice';
import { resetHistory } from '@/store/slices/historySlice';
import { resetAll } from '@/store/slices/shopSlice';

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
      let refreshToken = store.getState().auth.refreshToken; // From redux store
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : authApi.refreshToken({ accessToken, refreshToken });

      try {
        const response = await refreshTokenRequest;
        if (!response.result) {
          const error = new Error('Refresh Token Failed');
          error.status = 401;
          throw error;
        }
        const newAccessToken = response.result.accessToken;
        const newRefreshToken = response.result.refreshToken;
        accessToken = newAccessToken;
        store.dispatch(
          addToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );
        // Reset token refresh request
        refreshTokenRequest = null;
      } catch (error) {
        console.log('Refresh Token Failed', error);
        store.dispatch(resetHistory());
        if (error.response && error.response.status === 401) {
          store.dispatch(resetAll());
          store.dispatch(clearState());
        }
      }
    }

    // console.log('accessToken', accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });
}

export default axiosAuth;
