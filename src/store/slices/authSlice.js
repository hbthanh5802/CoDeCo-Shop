import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import authApi from '@/api/authApi';

const initialState = {
  loading: false,
  errorMessage: null,
  accessToken: null,
  currentUser: null,
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createAppSlice({
  name: 'auth',
  initialState: initialState,
  // actions
  reducers: (create) => ({
    addToken: create.reducer((state, action) => {
      state.accessToken = action.payload;
    }),
    loginUser: create.asyncThunk(
      async (args, thunkApi) => {
        return await authApi.loginUser({
          email: args.username,
          password: args.password,
        });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { user, accessToken } = action.payload;
          if (user) state.currentUser = user;
          if (accessToken) state.accessToken = accessToken;
        },
        rejected: (state, action) => {
          console.log('action.errors', action.error);
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    logoutUser: create.asyncThunk(
      async (args, thunkApi) => {
        const accessToken = thunkApi.getState()?.auth?.accessToken;
        return await authApi.logoutUser({ accessToken });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state) => {
          state.currentUser = null;
          state.accessToken = null;
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
      state.errorMessage = null;
    }),
  }),
});

export const { addToken, loginUser, clearState, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
