import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBox = ({ className = '', onSearchClick = () => {} }) => {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e) => {};

  return (
    <div
      className={`flex justify-between min-w-[340px] pl-[20px] py-[8px] pr-[8px] border border-white/60 bg-white/15 rounded-full has-[input:focus]:bg-white/10 has-[input:focus]:border-white/80 duration-300 ${className}`}
    >
      <input
        type="text"
        className="bg-transparent outline-none text-white placeholder:text-white/70 focus:placeholder:text-white/50"
        placeholder="Tìm kiếm nội thất..."
      />

      <div className="flex items-center justify-center text-white text-[20px] w-[40px] h-[40px] bg-[var(--color-primary)] text-center rounded-full shadow-md cursor-pointer hover:brightness-110 duration-150">
        <FiSearch />
      </div>
    </div>
  );
};

export default SearchBox;
