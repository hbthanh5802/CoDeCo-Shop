import React, { useId, useState } from 'react';
import CustomSwiper from '@/components/CustomSwiper';
import ProductCard from '@/components/ProductCard';
import { SwiperSlide } from 'swiper/react';

const RecommendProduct = () => {
  const productId = useId();
  const [productList, setProductList] = useState(
    Array.from({ length: 10 }, () => ({}))
  );

  return (
    <div className="mb-[120px]">
      <CustomSwiper
        // autoPlay={2500}
        className={''}
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
    </div>
  );
};

export default RecommendProduct;
