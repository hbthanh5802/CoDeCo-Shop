import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FilterBar from './components/FilterBar';
import { BsInfoCircle } from 'react-icons/bs';
import OrderBar from './components/OrderBar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useDispatch } from 'react-redux';
import { setPreviousHistory } from '@/store/slices/historySlice';
import productApi from '@/api/productApi';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { serializeSearchParams } from '@/utils/url';
import images from '@/assets/images';

// sticky top-[218px] w-[300px]

const SearchPage = () => {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });

  const canFetching = useRef(false);
  const { pathname, search, state } = useLocation();
  const { productList: searchedProducts, pagination: searchPagination } =
    state ?? {};
  let { searchValue, categoryId: categoryIdUrl } =
    serializeSearchParams(search);
  const dispatch = useDispatch();

  const productId = useId();
  const [filterData, setFilterData] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    pageSize: 9,
  });

  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState(searchedProducts || []);

  const handleFetchingProducts = async (searchParams = {}) => {
    const params = {
      page: paginationData.currentPage,
      pageSize: paginationData.pageSize,
      ...searchParams,
    };
    try {
      setLoading(true);
      const response = await productApi.searchProducts({ ...params });
      const { data, pagination } = response?.result;
      if (data && pagination) {
        setProductList(data);
        setPaginationData((prev) => ({ ...prev, ...pagination }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.', { autoClose: 1000 });
      console.log('Failed to filter products in Searching Page', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetFilterData = (filterValue) => {
    let filterResult = { ...filterValue };
    filterResult = Object.entries(filterResult).reduce((acc, [key, value]) => {
      if (!value) return acc;
      acc[key] = value;
      return acc;
    }, {});
    setFilterData({ ...filterResult });
    handleFetchingProducts({
      ...(searchValue ? { ...filterResult, searchValue } : filterResult),
      ...paginationData,
      page: paginationData.currentPage,
      pageSize: paginationData.pageSize,
    });
  };

  const handleSetPaginationData = (pagination) => {
    let _pagination = { ...paginationData, ...pagination };
    setPaginationData((prev) => ({ ...prev, ...pagination }));
    handleFetchingProducts({
      ..._pagination,
      page: _pagination.currentPage,
      pageSize: _pagination.pageSize,
      ...(searchValue ? { ...filterData, searchValue } : filterData),
    });
  };

  useEffect(() => {
    setProductList(searchedProducts || []);
  }, [searchedProducts]);

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
  }, [dispatch, pathname, search]);

  useEffect(() => {
    handleFetchingProducts({
      ...(searchValue && { searchValue }),
      categoryIds: [categoryIdUrl],
      pageSize: 9,
    });
  }, [categoryIdUrl]);

  return (
    <div className="relative mt-[60px] mb-[120px] flex gap-6">
      {!searchValue && (
        <div className="w-[25%] h-fit bg-white">
          <FilterBar
            filterData={filterData}
            handleSetFilterData={handleSetFilterData}
          />
        </div>
      )}
      <div
        className={`ml-auto bg-white flex flex-col  ${
          searchValue ? 'w-[100%] items-center' : 'w-[75%] items-start'
        }`}
      >
        <div className="flex gap-2 justify-start items-center mb-[12px]">
          <BsInfoCircle />
          <p className="flex gap-[4px] items-center text-[16px]">
            <span>Có tất cả</span>
            <span className="font-semibold">
              {paginationData.totalCount || 0}
            </span>
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
        ) : productList?.length ? (
          <div>
            <div className="py-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productList?.map?.((productItem, index) => (
                <ProductCard key={`${productId}-${index}`} data={productItem} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center justify-center h-[450px] w-full rounded-[20px]">
            <img
              src={images.empty}
              alt="Empty Image"
              className="w-[56px] animate-bounce"
            />
            <p>Không có tìm thấy kết quả phù hợp</p>
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
