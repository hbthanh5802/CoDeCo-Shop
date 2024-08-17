import React, { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './GallerySwiper.scss';

// import required modules
import { FreeMode, Pagination, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import images from '@/assets/images';

const GallerySwiper = ({
  spaceBetween = 48,
  navigation = true,
  onChange = () => {},
  imageList = [],
  className,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const imageId = useId();

  if (imageList.length === 0 || !imageList)
    return (
      <div className="duration-200 flex flex-col gap-6 items-center justify-center border border-[#ccc] rounded h-[500px] bg-slate-50 hover:bg-slate-100">
        <img src={images.empty} alt="" className="size-[60px]" />
        <p>Sản phẩm tạm thời chưa có hình ảnh</p>
      </div>
    );

  return (
    <div className="Custom-Gallery-Swiper max-h-fit flex flex-col justify-center items-center">
      <Swiper
        style={{
          height: '520px',
        }}
        loop={imageList.length > 5 ? true : false}
        zoom={true}
        spaceBetween={10}
        pagination={{ type: 'fraction' }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.enabled = navigation;
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Pagination, Navigation, Thumbs, Zoom]}
        className="gallery-swiper"
      >
        {imageList.map((imageUrl, index) => (
          <SwiperSlide key={`${imageId}-${index + Math.random()}`}>
            <div className="swiper-zoom-container">
              <img loading="lazy" src={imageUrl} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative">
        <Swiper
          style={{
            overflowY: 'visible',
          }}
          onSwiper={setThumbsSwiper}
          loop={imageList.length > 5 ? true : false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Pagination, Navigation, Thumbs]}
          className="mySwiper swiper-thumbs"
        >
          {imageList.map((imageUrl, index) => (
            <SwiperSlide key={`${imageId}-${index + Math.random()}`}>
              <img loading="lazy" src={imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={navigationPrevRef}
          className={`navigationBtn group ${
            navigation ? 'block' : 'hidden'
          } absolute top-1/2 -translate-y-1/2 z-[99] left-0 -translate-x-1/2 flex items-center justify-center text-[24px] h-[50px] w-[50px] bg-white shadow-xl  rounded-full cursor-pointer duration-150 border border-[#f7f7f7]`}
        >
          <GoArrowLeft className="group-hover:-translate-x-1 duration-300" />
        </div>
        <div
          ref={navigationNextRef}
          className={`navigationBtn group ${
            navigation ? 'block' : 'hidden'
          } absolute top-1/2 -translate-y-1/2 z-[99] right-0 translate-x-1/2 flex items-center justify-center text-[24px] h-[50px] w-[50px] bg-white shadow-xl rounded-full cursor-pointer duration-150  border border-[#f7f7f7]`}
        >
          <GoArrowRight className="group-hover:translate-x-1 duration-300" />
        </div>
      </div>
    </div>
  );
};

GallerySwiper.propTypes = {
  imageList: PropTypes.array,
};

export default GallerySwiper;
