import React from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const defaultBreakpoints = {
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1280: {
    slidesPerView: 4,
  },
};

const CustomSwiper = ({
  children,
  paddingY = 60,
  loop = true,
  autoPlay = 0,
  spaceBetween = 48,
  navigation = true,
  pagination = true,
  slidesPerView = 'auto',
  onChange = () => {},
  responsive = defaultBreakpoints,
  vertical = false,
  className,
}) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className={`relative ${className}`}>
      <Swiper
        direction={vertical ? 'vertical' : 'horizontal'}
        style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSlideChange={onChange}
        loop={loop}
        autoplay={
          !!autoPlay && {
            delay: autoPlay,
            disableOnInteraction: false,
          }
        }
        breakpoints={responsive}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true, enabled: pagination }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.enabled = navigation;
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {children}
      </Swiper>
      <div
        ref={navigationPrevRef}
        className={`navigationBtn group ${
          navigation ? 'block' : 'hidden'
        } absolute top-1/2 -translate-y-1/2 z-[99] left-0 -translate-x-1/2 flex items-center justify-center text-[24px] h-[50px] w-[50px] bg-white shadow-lg  rounded-full cursor-pointer duration-150`}
      >
        <GoArrowLeft className="group-hover:-translate-x-1 duration-300" />
      </div>
      <div
        ref={navigationNextRef}
        className={`navigationBtn group ${
          navigation ? 'block' : 'hidden'
        } absolute top-1/2 -translate-y-1/2 z-[99] right-0 translate-x-1/2 flex items-center justify-center text-[24px] h-[50px] w-[50px] bg-white shadow-lg rounded-full cursor-pointer duration-150`}
      >
        <GoArrowRight className="group-hover:translate-x-1 duration-300" />
      </div>
    </div>
  );
};

SwiperSlide.propTypes = {
  children: PropTypes.node.isRequired,
};

CustomSwiper.propTypes = {
  children: PropTypes.node.isRequired,
  autoPlay: PropTypes.number,
  loop: PropTypes.bool,
  spaceBetween: PropTypes.number,
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  slidesPerView: PropTypes.number,
  onChange: PropTypes.func,
  responsive: PropTypes.object,
  classNames: PropTypes.string,
};

export default CustomSwiper;
