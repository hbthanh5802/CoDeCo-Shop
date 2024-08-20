import { customHistory } from '@/utils/history';
import { createAppSlice } from './createAppSlice';

const initialState = {
  previous: '',
  next: '',
  historyCart: [],
};

const historySlice = createAppSlice({
  name: 'history',
  initialState: initialState,
  reducers: (create) => ({
    setPreviousHistory: create.reducer((state, action) => {
      state.previous = action.payload;
    }),
    setNextHistory: create.reducer((state, action) => {
      state.next = action.payload;
    }),
    goBackHistory: create.reducer((state) =>
      customHistory.push(state.previous || '/')
    ),
    goNextHistory: create.reducer((state) =>
      customHistory.push(state.next || '/')
    ),
    addToHistoryCart: create.reducer((state, action) => {
      if (!action.payload || typeof action.payload !== 'object') return;
      const { productId, productDetailId } = action.payload;
      const existedIndex = state.historyCart.findIndex(
        (historyCartItem) =>
          historyCartItem.productId === productId ||
          historyCartItem.productDetailId === productDetailId
      );
      if (existedIndex >= 0) {
        state.historyCart[existedIndex] = action.payload;
      } else {
        state.historyCart.push(action.payload);
      }
    }),
    removeHistoryCartById: create.reducer((state, action) => {
      if (!action.payload || typeof action.payload !== 'object') return;
      const { productId, productDetailId } = action.payload;
      const existedIndex = state.historyCart.findIndex(
        (historyCartItem) =>
          historyCartItem.productId === productId ||
          historyCartItem.productDetailId === productDetailId
      );
      if (existedIndex >= 0) {
        state.historyCart.splice(existedIndex, 1);
      }
    }),
    resetHistory: create.reducer((state) => {
      state.previous = '/';
      state.next = '/';
    }),
  }),
});

export const {
  addToHistoryCart,
  removeHistoryCartById,
  setPreviousHistory,
  setNextHistory,
  goBackHistory,
  goNextHistory,
  resetHistory,
} = historySlice.actions;
export default historySlice.reducer;
