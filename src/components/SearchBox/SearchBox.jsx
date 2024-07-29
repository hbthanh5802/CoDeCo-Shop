import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const SearchBox = ({ className = '', onSearchClick = () => {} }) => {
<<<<<<< Updated upstream
  const [inputValue, setInputValue] = useState();
  const pathname = useLocation().pathname;
=======
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 600);
  const { pathname } = useLocation();
>>>>>>> Stashed changes

  const handleInputChange = (e) => {};

  return (
    <div
      className={`flex justify-between min-w-[340px] pl-[20px] py-[8px] pr-[8px] border ${
        pathname === '/'
          ? 'border-white/60 bg-white/15 has-[input:focus]:bg-white/10 has-[input:focus]:border-white/80'
          : 'border-[#ccc] has-[input:focus]:border-slate-400 text-[#333]'
      } rounded-full has-[input:focus]:min-w-[600px] duration-300`}
    >
      <input
        type="text"
        className={`bg-transparent outline-none ${
          pathname === '/' && 'text-white'
        } ${
          pathname === '/'
            ? 'placeholder:text-white/70 focus:placeholder:text-white/50'
            : 'placeholder:text-black/70 focus:placeholder:text-black/50'
        } duration-150`}
        placeholder="Tìm kiếm nội thất..."
      />

      <div className="flex items-center justify-center text-white text-[20px] w-[40px] h-[40px] bg-[var(--color-primary)] text-center rounded-full shadow-md cursor-pointer hover:brightness-110 duration-150">
        <FiSearch />
      </div>
    </div>
  );
};

export default SearchBox;
