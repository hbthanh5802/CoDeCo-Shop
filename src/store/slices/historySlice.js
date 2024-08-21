import { customHistory } from '@/utils/history';
import { createAppSlice } from './createAppSlice';

const initialState = {
  previous: '',
  next: '',
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
    resetHistory: create.reducer((state) => {
      state.previous = '/';
      state.next = '/';
    }),
  }),
});

export const {
  setPreviousHistory,
  setNextHistory,
  goBackHistory,
  goNextHistory,
  resetHistory,
} = historySlice.actions;
export default historySlice.reducer;
