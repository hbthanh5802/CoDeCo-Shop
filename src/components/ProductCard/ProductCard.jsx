import images from '@/assets/images';
import React from 'react';
import PropTypes from 'prop-types';
import RateStar from '../RateStar';
import { formatCurrency } from '@/utils/currency';

import { FaPlus } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data = {} }) => {
  const navigation = useNavigate();
  const handleProductCardClick = (id) => {
    if (id) navigation(`/shop/products/${id}`);
  };

  return (
    <div className="relative group bg-white h-[500px] w-[300px] border border-[#e7e7e7] rounded-[20px] hover:shadow-xl shadow-black/15 duration-300">
      <div className="absolute z-50 top-6 right-0 translate-x-3  w-[94px] h-[32px] bg-[var(--red-tag)] rounded-l-[4px] rounded-tr-[4px] flex items-center justify-center">
        <p className="text-white font-semibold">12% off</p>
        <div className="absolute z-[-1] right-[4px] bottom-[-9px] inline-block border-[9px] border-transparent border-r-[var(--red-tag-darker)] rotate-45"></div>
      </div>
      <div
        className="product-img h-[300px] overflow-hidden rounded-t-[20px] cursor-pointer"
        onClick={() => handleProductCardClick('a0012934')}
      >
        <img
          className="w-full h-full object-cover object-center group-hover:scale-105 duration-300"
          src={images.productImg}
          alt="Product Image"
        />
      </div>
      <div className="product-detail p-[16px] space-y-3 text-left">
        <h2
          className="font-semibold text-[18px] line-clamp-2 cursor-pointer"
          onClick={() => handleProductCardClick('a0012934')}
        >
          Ghế Gấp Decor Phòng Ghế Đệm Tựa Lưng Bọc Da Êm Ái Khung Thép Sơn Tĩnh
          Điện
        </h2>
        <RateStar rating={4} spacing={2} editable={false} />
        <div className="flex justify-between items-end">
          <div className="product-price">
            <p className="font-normal text-[18px] text-[#ccc] line-through">
              {formatCurrency(3200000)}
            </p>
            <div className="flex items-baseline">
              <p className="inline-block font-semibold text-[24px]">
                {formatCurrency(2800000)}
              </p>
              <span className="font-semibold text-[14px] ml-[6px]">VNĐ</span>
            </div>
          </div>
          <Tippy content="Thêm vào hàng">
            <button
              className="h-[48px] w-[48px] rounded-full bg-black flex justify-center items-center text-center cursor-pointer"
              onClick={() => handleProductCardClick('a0012934')}
            >
              <FaPlus className="text-white fill-white text-[24px]" />
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductCard;
