import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../CustomSwiper';
import Segmented from '../Segmented';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';

const ProductSection = ({
  title,
  segmentedList,
  moreRedirectTo,
  className,
}) => {
  const productId = useId();
  const [productList, setProductList] = useState(
    Array.from({ length: 10 }, () => ({}))
  );

  const handleSegmentedChange = (segmentedValue) => {
    console.log(segmentedValue);
    // Call API Get Product By CategoryId here...
  };

  return (
    <div
      className={`bg-[#F7F7F7] flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)] ${className}`}
    >
      <p className="mb-[34px] text-[42px] font-bold">{title || 'Title'}</p>
      <Segmented items={segmentedList} onChange={handleSegmentedChange} />

      <div className="product-slider w-full">
        <CustomSwiper
          // autoPlay={2500}
          className={'pt-[40px]'}
          pagination={false}
          spaceBetween={48}
          slidesPerView={1}
        >
          {productList.map((productItem, index) => (
            <SwiperSlide key={`${productId}-${index}`}>
              <ProductCard data={productItem} />
            </SwiperSlide>
          ))}
        </CustomSwiper>

        <div className="flex items-center justify-center">
          <Link
            to={moreRedirectTo || '#'}
            className="flex items-center justify-center space-x-2 px-3 py-1 rounded-full bg-opacity-25 hover:bg-orange-300/15 duration-300"
          >
            <span className="font-normal text-base text-[var(--color-primary)]">
              Xem thêm
            </span>
            <GoArrowRight className="text-[18px] fill-[var(--color-primary)]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductSection.propTypes = {
  title: PropTypes.string.isRequired,
  segmentedList: PropTypes.array.isRequired,
  moreRedirectTo: PropTypes.string,
  className: PropTypes.string,
};

export default ProductSection;
