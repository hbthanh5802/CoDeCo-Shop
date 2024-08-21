import authApi from '@/api/authApi';
import { createAppSlice } from './createAppSlice';

const initialState = {
  loading: false,
  errorMessage: null,
  accessToken: null,
  refreshToken: null,
  currentUser: null,
};

const authSlice = createAppSlice({
  name: 'auth',
  initialState: initialState,
  // actions
  reducers: (create) => ({
    addToken: create.reducer((state, action) => {
      const { accessToken, refreshToken } = action.payload;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
    }),
    setCurrentUser: create.reducer((state, action) => {
      state.currentUser = action.payload;
    }),
    loginUser: create.asyncThunk(
      async (args, thunkApi) => {
        return await authApi.loginUser({
          email: args.email,
          password: args.password,
          recaptchaToken: args.recaptchaToken,
        });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { userResponse, accessToken, refreshToken } =
            action.payload?.result;
          if (userResponse) state.currentUser = userResponse;
          if (accessToken) state.accessToken = accessToken;
          if (refreshToken) state.refreshToken = refreshToken;
        },
        rejected: (state, action) => {
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    logoutUser: create.asyncThunk(
      async (args, thunkApi) => {
        const refreshToken = thunkApi.getState()?.auth?.refreshToken;
        const accessToken = thunkApi.getState()?.auth?.accessToken;
        return await authApi.logoutUser({ refreshToken, accessToken });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state) => {
          state.currentUser = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.errorMessage = null;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    clearState: create.reducer((state) => {
      state.loading = null;
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.errorMessage = null;
    }),
  }),
});

export const { addToken, loginUser, clearState, logoutUser, setCurrentUser } =
  authSlice.actions;
export default authSlice.reducer;
