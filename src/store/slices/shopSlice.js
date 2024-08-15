import notificationApi from '@/api/notificationApi';
import { createAppSlice } from './createAppSlice';
import productApi from '@/api/productApi';
import cartApi from '@/api/cartApi';
import categoryApi from '@/api/categoryApi';
import voucherApi from '@/api/voucherApi';

const initialState = {
  loading: false,
  notificationList: [],
  cartItemList: [],
  categoryList: [],
  voucherList: [],
  errorMessage: null,
};

const shopSlice = createAppSlice({
  name: 'shop',
  initialState: initialState,
  reducers: (create) => ({
    setSearchValue: create.reducer((state, action) => {
      state.searchValue = action.payload;
    }),
    getNotificationList: create.asyncThunk(
      async (args, thunkApi) => {
        const { params } = args;
        return await notificationApi.getUserNotifications({ ...params });
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
          state.notificationList = [];
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
          state.cartItemList = [];
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    getCategoryList: create.asyncThunk(
      async (args, thunkApi) => {
        const { params } = args;
        return await categoryApi.getAllCategories({ ...params });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { result } = action.payload;
          if (result && result.data) state.categoryList = result.data;
        },
        rejected: (state, action) => {
          // console.log('action.errors', action.error);
          state.categoryList = [];
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    getVoucherList: create.asyncThunk(
      async (args, thunkApi) => {
        const { params } = args;
        return await voucherApi.getAllVouchers({ ...params });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          const { result } = action.payload;
          if (result && result.data) state.voucherList = result.data;
        },
        rejected: (state, action) => {
          // console.log('action.errors', action.error);
          state.voucherList = [];
          state.errorMessage = action?.error?.message;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    resetAll: create.reducer((state) => {
      state.loading = false;
      state.searchValue = null;
      state.productList = [];
      state.notificationList = [];
      state.cartItemList = [];
      state.categoryList = [];
      state.voucherList = [];
      state.errorMessage = null;
    }),
  }),
});

export const {
  setSearchValue,
  searchingProducts,
  getNotificationList,
  getCartItemList,
  getCategoryList,
  getVoucherList,
  resetAll,
} = shopSlice.actions;
export default shopSlice.reducer;
