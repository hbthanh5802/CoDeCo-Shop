import React, { useMemo, useRef, useState } from 'react';

import Collapse from '@/components/Collapse';
import { BiFilterAlt } from 'react-icons/bi';
import CheckboxGroup from '@/components/CustomCheckbox/CheckboxGroup';
import Spinner from '@/components/Spinner';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const FilterBar = ({ filterData, handleSetFilterData }) => {
  const [loading, setLoading] = useState(true);
  const filterRefs = useRef([]);
  const [inputValues, setInputValues] = useState({
    fromPrice: '',
    toPrice: '',
  });

  const [inputErrors, setInputErrors] = useState({
    fromPrice: '',
    toPrice: '',
  });

  const { categoryList } = useSelector((state) => state.shop);
  const categoryFilterList = useMemo(() => {
    return categoryList.map((categoryItem, index) => {
      const { subCategoriesInfo, name, categoryId } = categoryItem;
      return {
        label: name,
        value: categoryId,
      };
    });
  }, [categoryList]);

  const handleSetFilterByFilterChange = (name, value) => {
    let _filterData = { ...filterData };
    if (!!value) {
      _filterData[name] = value;
    } else {
      _filterData[name] = undefined;
    }
    handleSetFilterData(_filterData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({}));
  };

  const handleGroupCheckboxChange = (groupCheckboxData) => {
    const { name, groupValues } = groupCheckboxData;
    handleSetFilterByFilterChange(
      name,
      groupValues.length > 0 ? groupValues : null
    );
  };

  const handleApplyPriceFilter = () => {
    let { fromPrice, toPrice } = inputValues;
    let _filterData = { ...filterData };

    if (!fromPrice) _filterData.fromPrice = undefined;
    if (!toPrice) _filterData.toPrice = undefined;

    if (fromPrice && toPrice) {
      if (+fromPrice > +toPrice) {
        setInputErrors((prev) => ({
          ...prev,
          fromPrice: 'Giá trị không hợp lệ: Cao hơn "Giá Đến"',
        }));
        return;
      }
    }

    if (fromPrice) _filterData.fromPrice = +fromPrice;
    if (toPrice) _filterData.toPrice = +toPrice;

    handleSetFilterData(_filterData);
  };

  const handleResetAll = () => {
    setInputValues((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {})
    );
    filterRefs.current.forEach((filterRef) => filterRef?.handleReset());
    handleSetFilterData(
      Object.keys(filterData).reduce((acc, key) => {
        acc[key] = undefined;
        return acc;
      }, {})
    );
  };

  return (
    <div>
      <div className="flex gap-2 items-center duration-300 transition-all px-[16px] mb-[24px]">
        <BiFilterAlt className="text-[18px] flex justify-center items-center" />
        <span className="uppercase text-[18px] font-semibold">
          BỘ LỌC TÌM KIẾM
        </span>
      </div>
      {/* Category Filter */}
      <Collapse label="Theo Danh Mục" className="w-full">
        <div className="my-2 mb-[24px] max-h-[500px] overflow-auto w-full">
          <CheckboxGroup
            ref={(el) => (filterRefs.current[filterRefs.current.length++] = el)}
            name="categoryIds"
            items={categoryFilterList}
            onChange={(data) => handleGroupCheckboxChange(data)}
            className={'max-h-[300px] overflow-y-auto'}
          />
        </div>
      </Collapse>
      {/* Color Filter */}
      <Collapse label="Theo chất liệu">
        <div className="my-2 mb-[24px] max-h-[500px] overflow-auto w-full">
          <CheckboxGroup
            ref={(el) => (filterRefs.current[filterRefs.current.length++] = el)}
            name="sizeIds"
            items={[]}
            onChange={(data) => handleGroupCheckboxChange(data)}
            className={'max-h-[300px] overflow-y-auto'}
          />
        </div>
      </Collapse>
      {/* Color Filter */}
      <Collapse label="Màu sắc">
        <div className="my-2 mb-[24px] max-h-[500px] overflow-auto w-full">
          <CheckboxGroup
            ref={(el) => (filterRefs.current[filterRefs.current.length++] = el)}
            name="colorIds"
            items={[]}
            onChange={(data) => handleGroupCheckboxChange(data)}
            className={'max-h-[300px] overflow-y-auto'}
          />
        </div>
      </Collapse>
      {/* Price Filter */}
      <Collapse label="Theo Khoảng Giá">
        <div className="my-2 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <label htmlFor="">Từ:</label>
              <input
                name="fromPrice"
                type="number"
                placeholder="Từ giá (VNĐ)"
                className="flex-1 h-[40px] px-[8px] text-[16px] outline-none rounded-lg border focus:border-slate-500 duration-150 data-[error=true]:border-pink-600"
                value={inputValues.fromPrice}
                onChange={handleInputChange}
                data-error={!!inputErrors.fromPrice}
              />
            </div>
            {inputErrors.fromPrice && (
              <p className="text-pink-600">{inputErrors.fromPrice}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <label htmlFor="">Đến:</label>
              <input
                name="toPrice"
                type="number"
                placeholder="Đến giá (VNĐ)"
                className="flex-1 h-[40px] px-[8px] text-[16px] outline-none rounded-lg border focus:border-slate-500 duration-150 data-[error=true]:border-pink-600"
                value={inputValues.toPrice}
                onChange={handleInputChange}
                data-error={!!inputErrors.toPrice}
              />
            </div>
            {inputErrors.toPrice && (
              <p className="text-pink-600">{inputErrors.toPrice}</p>
            )}
          </div>
          <button
            className="w-full px-[16px] py-[8px] rounded-[4px] text-white border bg-[var(--color-primary)] hover:brightness-105 duration-150"
            onClick={handleApplyPriceFilter}
          >
            Áp dụng
          </button>
        </div>
      </Collapse>
      {/* Button Function */}
      <div className="mt-3 flex flex-col gap-3">
        <button
          className="w-full px-[16px] py-[8px] rounded-[4px] border bg-white hover:bg-[#e7e7e7] hover:font-medium hover:border-[#ccc] duration-150"
          onClick={handleResetAll}
        >
          Loại bỏ tất cả lựa chọn
        </button>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  filterData: PropTypes.object,
  handleFilterChange: PropTypes.func,
};

export default FilterBar;
