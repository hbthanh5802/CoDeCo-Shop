import Selection from '@/components/Popper/Selection';
import React, { useId } from 'react';

import { FaArrowDownWideShort } from 'react-icons/fa6';
import { FaArrowUpWideShort } from 'react-icons/fa6';

const priceOrderItem = [
  {
    label: 'Giá: Thấp đến Cao',
    value: 'asc',
    leftIcon: <FaArrowUpWideShort />,
  },
  {
    label: 'Giá: Cao đến Thấp',
    value: 'desc',
    leftIcon: <FaArrowDownWideShort />,
  },
];

const OrderBar = ({ filterData, handleSetFilterData }) => {
  const timeOrderId = useId();

  const handleOrderByChange = (e) => {
    const { value } = e.target;
    let { bestSeller, newest, ..._filterData } = { ...filterData };
    if (value) {
      _filterData[value] = true;
    }
    handleSetFilterData(_filterData);
  };

  const handlePriceOrderChange = (value) => {
    let _filterData = { ...filterData };
    _filterData.priceSort = value ? value : undefined;
    handleSetFilterData(_filterData);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <p>Sắp xếp theo:</p>
        <div className="flex flex-col md:flex-row gap-[12px]">
          <label
            htmlFor={`${timeOrderId}-relate`}
            className="px-[16px] py-[8px] bg-[#EEEEEE] hover:brightness-95 has-[input:checked]:text-white has-[input:checked]:bg-[var(--color-primary)] rounded-[4px] duration-100 select-none"
          >
            <input
              type="radio"
              name={timeOrderId}
              id={`${timeOrderId}-relate`}
              value={undefined}
              onChange={handleOrderByChange}
              defaultChecked={true}
              hidden
            />
            Liên quan
          </label>
          <label
            htmlFor={`${timeOrderId}-newest`}
            className="px-[16px] py-[8px] bg-[#EEEEEE] hover:brightness-95 has-[input:checked]:text-white has-[input:checked]:bg-[var(--color-primary)] rounded-[4px] duration-100 select-none"
          >
            <input
              type="radio"
              name={timeOrderId}
              id={`${timeOrderId}-newest`}
              value="newest"
              onChange={handleOrderByChange}
              hidden
            />
            Mới nhất
          </label>
          <label
            htmlFor={`${timeOrderId}-bestSeller`}
            className="px-[16px] py-[8px] bg-[#EEEEEE] hover:brightness-95 has-[input:checked]:text-white has-[input:checked]:bg-[var(--color-primary)] rounded-[4px] duration-100 select-none"
          >
            <input
              type="radio"
              name={timeOrderId}
              id={`${timeOrderId}-bestSeller`}
              value="bestSeller"
              onChange={handleOrderByChange}
              hidden
            />
            Bán chạy
          </label>
          <Selection
            width={250}
            label="Sắp xếp theo Giá"
            items={priceOrderItem}
            onChange={(value) => handlePriceOrderChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderBar;
