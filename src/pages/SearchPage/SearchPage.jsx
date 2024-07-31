import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FilterBar from './components/FilterBar';
import { BsInfoCircle } from 'react-icons/bs';
import OrderBar from './components/OrderBar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousHistory } from '@/store/slices/historySlice';
import productApi from '@/api/productApi';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { searchingProducts } from '@/store/slices/shopSlice';

// sticky top-[218px] w-[300px]

const SearchPage = () => {
  const canFetching = useRef(true);
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
  }, [dispatch, pathname, search]);

  const productId = useId();
  const [filterData, setFilterData] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    pageSize: 9,
  });

  const { loading, productList } = useSelector((state) => state.shop);

  const handleSetFilterData = (filterValue) => {
    let filterResult = { ...filterValue };
    filterResult = Object.entries(filterResult).reduce((acc, [key, value]) => {
      if (!value) return acc;
      acc[key] = value;
      return acc;
    }, {});
    setFilterData({ ...filterResult });
  };

  const handleSetPaginationData = (pagination) => {
    setPaginationData((prev) => ({ ...prev, ...pagination }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        ...filterData,
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      try {
        const searchResponse = await dispatch(
          searchingProducts({ params })
        ).unwrap();
        const { totalCount } = searchResponse.pagination;
        handleSetPaginationData({ totalCount });
      } catch (error) {
        // handle Error here...
      } finally {
        canFetching.current = true;
      }
    };

    if (canFetching.current) fetchProducts();
    canFetching.current = false;
  }, [JSON.stringify(filterData), paginationData.currentPage]);

  return (
    <div className="relative mt-[60px] mb-[120px] flex gap-6">
      <div className="w-[25%] h-fit bg-white">
        <FilterBar
          filterData={filterData}
          handleSetFilterData={handleSetFilterData}
        />
      </div>
      <div className="ml-auto w-[75%] bg-white flex flex-col items-start">
        <div className="flex gap-2 items-center mb-[12px]">
          <BsInfoCircle />
          <p className="flex gap-[4px] items-center text-[16px]">
            <span>Có tất cả</span>
            <span className="font-semibold">{productList.length}</span>
            <span>sản phẩm liên quan</span>
          </p>
        </div>
        <OrderBar
          filterData={filterData}
          handleSetFilterData={handleSetFilterData}
        />
        {loading ? (
          <div className="w-full flex justify-center my-[48px]">
            <Spinner color="#e58411" size={24} />
          </div>
        ) : (
          <div>
            <div className="py-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productList.map?.((_, index) => (
                <ProductCard key={`${productId}-${index}`} data={{}} />
              ))}
            </div>
          </div>
        )}

        <div className="w-full flex justify-center items-center mt-6">
          <Pagination
            total={paginationData.totalCount}
            initialPageSize={paginationData.pageSize}
            onChange={(value) => handleSetPaginationData(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
