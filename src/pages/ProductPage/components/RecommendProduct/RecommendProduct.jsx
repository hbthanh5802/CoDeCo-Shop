import React, { useEffect, useId, useState } from 'react';
import CustomSwiper from '@/components/CustomSwiper';
import ProductCard from '@/components/ProductCard';
import { SwiperSlide } from 'swiper/react';
import productApi from '@/api/productApi';
import images from '@/assets/images';
import Spinner from '@/components/Spinner';

const RecommendProduct = ({ productDetailData }) => {
  const productId = useId();
  const { categoryId } = productDetailData;
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    productApi
      .getProductsByCategoryId(categoryId)
      .then((response) => {
        if (response.result && response.result.data) {
          setProductList(response.result.data);
        }
      })
      .catch((error) => {
        console.log('Failed to get Recommend Products', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="mb-[120px]">
      <CustomSwiper
        // autoPlay={2500}
        className={''}
        pagination={false}
        spaceBetween={48}
        slidesPerView={1}
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
    </div>
  );
};

export default RecommendProduct;
