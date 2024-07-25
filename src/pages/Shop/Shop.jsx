import { setPreviousHistory } from '@/store/slices/historySlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  dispatch(setPreviousHistory(pathname + search));

  return <div>Shop</div>;
};

export default Shop;
