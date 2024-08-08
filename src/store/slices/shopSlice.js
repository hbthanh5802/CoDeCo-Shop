import notificationApi from '@/api/notificationApi';
import { createAppSlice } from './createAppSlice';
import productApi from '@/api/productApi';
import cartApi from '@/api/cartApi';

const initialState = {
  loading: false,
  searchValue: null,
  productList: [],
  notificationList: [],
  cartItemList: [],
  errorMessage: null,
};

const shopSlice = createAppSlice({
  name: 'shop',
  initialState: initialState,
  reducers: (create) => ({
    setSearchValue: create.reducer((state, action) => {
      state.searchValue = action.payload;
    }),
    searchingProducts: create.asyncThunk(
      async (args, thunkApi) => {
        const { params } = args;
        const searchValue = thunkApi.getState().shop.searchValue;
        return await productApi.searchProduct({ searchValue, ...params });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { data } = action.payload;
          state.productList = data;
        },
        rejected: (state, action) => {
          // console.log('action.errors', action.error);
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    getNotificationList: create.asyncThunk(
      async (args, thunkApi) => {
        const { params } = args;
        return await notificationApi.getUserNotifications(params);
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { result } = action.payload;
          if (result) state.notificationList = result;
        },
        rejected: (state, action) => {
          // console.log('action.errors', action.error);
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    getCartItemList: create.asyncThunk(
      async (args, thunkApi) => {
        return await cartApi.getUserCart();
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { result } = action.payload;
          if (result && result.cartItemResponses)
            state.cartItemList = result.cartItemResponses;
        },
        rejected: (state, action) => {
          // console.log('action.errors', action.error);
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const {
  setSearchValue,
  searchingProducts,
  getNotificationList,
  getCartItemList,
} = shopSlice.actions;
export default shopSlice.reducer;
