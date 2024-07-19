import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import userApi from '@/api/userApi';
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
        console.log('thunkApi', thunkApi);
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
  }),
});

export const { addToken, loginUser } = authSlice.actions;
export default authSlice.reducer;
