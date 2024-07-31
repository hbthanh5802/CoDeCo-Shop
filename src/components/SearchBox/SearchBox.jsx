import useDebounce from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
import productApi from '@/api/productApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '@/store/slices/shopSlice';

const SearchBox = ({ className = '', onSearchClick = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 600);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => setInputValue(e.target.value.trim());

  useEffect(() => {
    const fetchProductSearching = async () => {
      setLoading(true);
      try {
        const params = { value: debouncedInputValue };
        const productResponse = await productApi.searchProduct(params);
        dispatch(setSearchValue(debouncedInputValue));
      } catch (error) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau.', {
          autoClose: 1000,
        });
        dispatch(setSearchValue(null));
      } finally {
        setLoading(false);
      }
    };
    if (debouncedInputValue) {
      fetchProductSearching();
    }
  }, [debouncedInputValue]);

  return (
    <div
      className={`flex justify-between ${
        pathname === '/' || !inputValue ? 'min-w-[340px]' : 'min-w-[600px]'
      } pl-[20px] py-[8px] pr-[8px] border ${
        pathname === '/'
          ? 'border-white/60 bg-white/15 has-[input:focus]:bg-white/10 has-[input:focus]:border-white/80'
          : 'border-[#ccc] has-[input:focus]:border-slate-400 text-[#333]'
      } rounded-full has-[input:focus]:min-w-[600px] duration-300`}
    >
      <input
        type="text"
        className={`bg-transparent flex-1 mr-10 outline-none ${
          pathname === '/' && 'text-white'
        } ${
          pathname === '/'
            ? 'placeholder:text-white/70 focus:placeholder:text-white/50'
            : 'placeholder:text-black/70 focus:placeholder:text-black/50'
        } duration-150`}
        placeholder="Tìm kiếm nội thất..."
        onChange={handleInputChange}
      />

      <div className="flex items-center justify-center text-white text-[20px] size-[40px] bg-[var(--color-primary)] text-center rounded-full shadow-md cursor-pointer hover:brightness-110 duration-150">
        {loading ? <Spinner size={18} /> : <FiSearch />}
      </div>
    </div>
  );
};

export default SearchBox;
