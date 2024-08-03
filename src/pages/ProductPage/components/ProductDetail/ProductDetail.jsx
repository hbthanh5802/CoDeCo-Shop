import React, { useState } from 'react';

import RateStar from '@/components/RateStar';
import { formatCurrency } from '@/utils/currency';
import { fakeApi } from '@/utils/url';
import Spinner from '@/components/Spinner';

import { GoPlus } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import {
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoInstagram,
} from 'react-icons/io5';
import CategoryRadio from '@/pages/ProductPage/components/CategoryRadio';

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categoryProductChosen, setCategoryProductChosen] = useState({
    color: '',
    material: '',
    size: '',
  });

  const isCategoryProductChosenValid = Object.values(
    categoryProductChosen
  ).every((categoryValue) => !!categoryValue);

  const [colorList, setColorList] = useState([
    {
      label: 'Xanh',
      value: 'colorId-1',
      disabled: true,
    },
    {
      label: 'Đỏ',
      value: 'colorId-2',
    },
    {
      label: 'Xanh',
      value: 'colorId-1',
      disabled: true,
    },
    {
      label: 'Đỏ',
      value: 'colorId-2',
    },
  ]);

  const handleQuantityButtonClick = (action) => {
    if (action === 'add') {
      setQuantity((prev) => prev + 1);
    } else if (action === 'minus' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCategoryRadioChange = (data) => {
    const { name, value } = data;
    setCategoryProductChosen((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    setLoading(true);
    fakeApi()
      .then((res) => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="Product-detail flex flex-col gap-[12px]">
        <h1 className="Product-detail__name text-[44px] font-semibold">
          Ghế thư giãn Lounge Chair
        </h1>

        <div className="Product-detail__rating flex gap-2">
          <RateStar rating={4} maxStar={5} spacing={2} />
          <span>{`${4.6} / 5.0`}</span>
          <span className="text-[#ccc]">{`(${12})`}</span>
        </div>

        <div className="Product-detail__price mb-[48px]">
          <div className="text-[#ccc] flex gap-2 items-baseline line-through">
            <h3 className="text-[24px]">{formatCurrency(3200000)}</h3>
            <span className="text-[18px]">VNĐ</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2 items-baseline">
              <h3 className="text-[32px] font-medium">
                {formatCurrency(2800000)}
              </h3>
              <span className="font-medium text-[24px]">VNĐ</span>
            </div>
            <span className="px-[24px] py-[6px] bg-[var(--red-tag)] rounded-[4px] text-white text-[16px] font-semibold">
              {`${12}% off`}
            </span>
          </div>
        </div>
        {/* Category */}
        <div className="Product-detail__category flex flex-col gap-6 mb-[48px]">
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Màu sắc:</h4>
            <div>
              <CategoryRadio
                items={colorList}
                name="color"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Chất liệu:</h4>
            <div>
              <CategoryRadio
                items={colorList}
                name="material"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Kích thước:</h4>
            <div>
              <CategoryRadio
                items={colorList}
                name="size"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col gap-3">
          <span>Số lượng:</span>
          <div className="flex items-center gap-6">
            {/* Quantity Button */}
            <div className="inline-flex h-[52px] p-1 gap-4 items-center border border-[#ccc] hover:border-[#f7f7f7] rounded duration-300">
              <button
                className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                disabled={quantity <= 1 || loading}
                onClick={() => handleQuantityButtonClick('minus')}
              >
                <FiMinus />
              </button>
              <span className="text-[20px] font-medium px-[12px] min-w-[50px] flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                disabled={loading}
                onClick={() => handleQuantityButtonClick('add')}
              >
                <GoPlus />
              </button>
            </div>
            {/* Add to Cart */}
            <button
              className="capitalize min-w-[190px] min-h-[52px] py-[14px] px-[40px] bg-[var(--color-primary)] text-white rounded hover:brightness-105 active:brightness-100 disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150"
              disabled={!isCategoryProductChosenValid}
              onClick={handleAddToCart}
            >
              {loading ? <Spinner size={18} /> : <span>Thêm vào giỏ</span>}
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button className="group inline-flex items-center gap-2 w-fit duration-200">
              <span className="p-[8px] group-active:bg-orange-100 rounded-full duration-200">
                <GoHeart className="text-[22px] flex group-hover:text-[var(--color-primary)] duration-200" />
              </span>
              <span className="text-[16px] group-hover:text-[var(--color-primary)] duration-200">
                Thêm yêu thích
              </span>
            </button>

            <div className="flex gap-4">
              <button>
                <IoLogoFacebook className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
              <button>
                <IoLogoInstagram className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
              <button>
                <IoLogoPinterest className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
