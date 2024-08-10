import React, { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../CustomSwiper';
import Segmented from '../Segmented';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import productApi from '@/api/productApi';
import Spinner from '../Spinner';
import images from '@/assets/images';

const ProductSection = ({
  title,
  segmentedList,
  onChange = () => {},
  className,
  searchPrams = {},
}) => {
  const productId = useId();
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(
    segmentedList?.length > 0 ? segmentedList[0].value : 1
  );
  const [productList, setProductList] = useState([]);

  const handleSegmentedChange = (segmentedValue) => {
    onChange({ selectedSegmentedValue: segmentedValue });
    setCategoryId(segmentedValue);
  };

  useEffect(() => {
    const fetchGetProductsByCategoryId = async () => {
      // Call API Get Product By CategoryId here...
      setLoading(true);
      try {
        const response = await productApi.getProductsByCategoryId(categoryId, {
          sortBy: 'createdAt',
          direction: 'desc',
          ...searchPrams,
        });
        if (response && response.result && response.result.data) {
          setProductList(response.result.data);
        }
      } catch (error) {
        console.log('Failed to get products by categoryId', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetProductsByCategoryId();
  }, [categoryId]);

  return (
    <div
      className={`bg-[#F7F7F7] flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)] ${className}`}
    >
      <p className="mb-[34px] text-[42px] font-bold">{title || 'Title'}</p>
      <Segmented items={segmentedList} onChange={handleSegmentedChange} />

      <div className="product-slider w-full">
        <CustomSwiper
          autoPlay={2500}
          className={'pt-[40px]'}
          pagination={false}
          spaceBetween={48}
          slidesPerView={1}
          loop={productList.length < 5 ? false : true}
        >
          {loading || productList.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={productId + '-' + index}>
                  <div className="flex flex-col gap-6 items-center justify-center h-[450px] w-full rounded-[20px] border">
                    <img
                      src={images.empty}
                      alt="Empty Image"
                      className="w-[56px] animate-bounce"
                    />
                    <Spinner color="black" size={24} />
                  </div>
                </SwiperSlide>
              ))
            : productList.map((productItem, index) => (
                <SwiperSlide key={productId + '-' + index}>
                  <ProductCard data={productItem} />
                </SwiperSlide>
              ))}
        </CustomSwiper>

        <div className="flex items-center justify-center">
          <Link
            to={categoryId ? '/shop/search?categoryId=' + categoryId : '#'}
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
  onChange: PropTypes.func,
};

export default ProductSection;
