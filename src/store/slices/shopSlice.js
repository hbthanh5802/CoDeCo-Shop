import { createAppSlice } from './createAppSlice';
import productApi from '@/api/productApi';

const initialState = {
  loading: false,
  searchValue: null,
  productList: [],
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
  }),
});

export const { setSearchValue, searchingProducts } = shopSlice.actions;
export default shopSlice.reducer;
