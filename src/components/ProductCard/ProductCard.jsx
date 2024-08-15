import images from '@/assets/images';
import React from 'react';
import PropTypes from 'prop-types';
import RateStar from '../RateStar';
import { formatCurrency } from '@/utils/currency';

import { FaArrowRight } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';

const randomImages = [
  images.productImg,
  images.productImage1,
  images.productImage2,
  images.productImage3,
  images.productImage4,
  images.productImage5,
  images.productImage6,
  images.productImage7,
  images.productImage8,
  images.productImage9,
  images.productImage10,
];

const dummyData = {
  productId: 'test productId',
  name:
    'Test name ' +
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet tempore sunt fugit a vitae, odit hic ea autem delectus atque vel rem itaque, provident possimus doloribus! Assumenda ipsa impedit eius.`,
  description: 'Test description',
  soldCount: 99,
  enable: 1,
  categoryId: 'test categoryId',
  productImages: randomImages,
  minPrice: 1000000,
  maxPrice: 50000000,
  averageRating: 4.5,
  createdAt: new Date(),
  percent: 10,
};

const ProductCard = ({ data }) => {
  const navigation = useNavigate();
  const {
    productId,
    name,
    description,
    soldCount,
    enable,
    categoryId,
    productImages,
    minPrice,
    maxPrice,
    averageRating,
    createdAt,
    percent,
  } = Object.keys(data).length ? data : dummyData;
  const handleProductCardClick = () => {
    if (productId) navigation(`/shop/products/${productId}`);
  };

  const handleError = (e) => {
    e.target.src =
      randomImages[Math.round(Math.random() * randomImages.length)];
  };

  return (
    <div className="relative group flex flex-col bg-white h-[450px] w-[300px] border border-[#e7e7e7] rounded-[20px] hover:shadow-xl shadow-black/15 duration-300">
      {/* SALE Tag */}
      {percent && (
        <div className="absolute z-50 top-6 right-0 translate-x-3  w-[94px] h-[32px] bg-[var(--red-tag)] rounded-l-[4px] rounded-tr-[4px] flex items-center justify-center">
          <p className="text-white font-semibold">{`${percent}% Sale`}</p>
          <div className="absolute z-[-1] right-[4px] bottom-[-9px] inline-block border-[9px] border-transparent border-r-[var(--red-tag-darker)] rotate-45"></div>
        </div>
      )}
      {/* Product Image */}
      <div
        className="product-img h-[300px] overflow-hidden rounded-t-[20px] cursor-pointer border-b border-b-[#f7f7f7]"
        onClick={handleProductCardClick}
      >
        <img
          className="w-full h-full object-cover object-center group-hover:scale-105 duration-300"
          src={
            productImages?.length
              ? productImages[0]
              : randomImages[Math.round(Math.random() * randomImages.length)]
          }
          alt="Product Image"
          onError={handleError}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between product-detail p-[16px] space-y-3 text-left">
        <div className="flex flex-col gap-2">
          <h2
            className="font-semibold text-[18px] line-clamp-2 cursor-pointer"
            onClick={handleProductCardClick}
          >
            {name}
          </h2>
          <RateStar
            rating={Math.round(averageRating || 5)}
            spacing={2}
            editable={false}
          />
        </div>
        {/* Price */}
        <div className="flex justify-between items-end">
          <div className="product-price">
            <p
              className={`font-normal text-[18px] text-[#ccc] line-through ${
                percent ? 'visible' : 'invisible'
              }`}
            >
              {formatCurrency(minPrice)}
            </p>
            <div className="flex items-baseline">
              <p className="inline-block font-semibold text-[24px]">
                {formatCurrency(
                  percent ? minPrice - minPrice * (percent / 100) : minPrice
                )}
              </p>
              <span className="font-semibold text-[14px] ml-[6px]">VNĐ</span>
            </div>
          </div>
          <Tippy content="Xem chi tiết">
            <button
              className="h-[48px] w-[48px] rounded-full bg-black flex justify-center items-center text-center cursor-pointer"
              onClick={() => handleProductCardClick('a0012934')}
            >
              <FaArrowRight className="text-white fill-white text-[20px]" />
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
