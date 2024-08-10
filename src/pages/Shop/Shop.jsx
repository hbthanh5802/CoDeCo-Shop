import images from '@/assets/images';
import CustomSwiper from '@/components/CustomSwiper';
import { setPreviousHistory } from '@/store/slices/historySlice';
import React, { useEffect, useId, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import CategoryCard from './components/CategoryCard';
import ProductSection from '@/components/ProductSection';
import VoucherCard from '@/components/VoucherCard';

import { GoArrowRight } from 'react-icons/go';
import { TbCoin } from 'react-icons/tb';
import { BsChatDots } from 'react-icons/bs';
import { BsCreditCard } from 'react-icons/bs';

const Shop = () => {
  const categoryId = useId();
  const voucherId = useId();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { categoryList, voucherList } = useSelector((state) => state.shop);

  const bestSellerSegmentedList = useMemo(() => {
    const result = categoryList
      ?.filter((categoryItem) => categoryItem.subCategoriesInfo?.length > 0)
      ?.map((categoryItem, index) => {
        const { categoryId, name } = categoryItem;
        return { label: name, value: categoryId, disable: false };
      });
    return result;
  }, [categoryList]);

  const categorySegmentedList = useMemo(() => {
    const result = categoryList?.map((categoryItem, index) => {
      const { categoryId, name } = categoryItem;
      return {
        title: name,
        to: '/shop/search?categoryId=' + categoryId,
      };
    });
    return result;
  }, [categoryList]);

  const decorSegmentedList = useMemo(() => {
    const result = categoryList
      ?.filter((categoryItem) => categoryItem.subCategoriesInfo?.length > 0)
      ?.map((categoryItem, index) => {
        const { categoryId, name } = categoryItem;
        return { label: name, value: categoryId, disable: false };
      });
    return result;
  }, [categoryList]);

  const officeSegmentedList = useMemo(() => {
    const result = categoryList
      ?.filter((categoryItem) => categoryItem.subCategoriesInfo?.length > 0)
      ?.map((categoryItem, index) => {
        const { categoryId, name } = categoryItem;
        return { label: name, value: categoryId, disable: false };
      });
    return result;
  }, [categoryList]);

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
  }, []);

  return (
    <div className="Shop-wrapper">
      {/* Carousel */}
      <div className="Shop-Carousel w-full mb-[60px] px-[var(--spacing-padding-container)]">
        <CustomSwiper
          spaceBetween={0}
          slidesPerView={1}
          responsive={{}}
          autoPlay={2500}
        >
          <SwiperSlide>
            <Link to={'#'}>
              <img
                src={images.eventBg1}
                alt="Event Background"
                className="w-full h-auto rounded-lg"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={'#'}>
              <img
                src={images.eventBg1}
                alt="Event Background"
                className="w-full h-auto rounded-lg"
              />
            </Link>
          </SwiperSlide>
        </CustomSwiper>
      </div>

      {/* Best seller */}
      <ProductSection
        title={'Sản phẩm mới ra mắt'}
        segmentedList={bestSellerSegmentedList}
      />

      {/* Category Slide */}
      <div className="bg-white flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)]">
        <p className="mb-[34px] text-[42px] font-bold">Xu hướng mua sắm</p>

        <div className="w-full">
          <CustomSwiper
            gridLayout={true}
            gridRow={2}
            slidesPerView={4}
            spaceBetween={24}
            loop={false}
          >
            {categorySegmentedList.map((item, index) => (
              <SwiperSlide key={`${categoryId}-${index}`}>
                <CategoryCard data={item} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      </div>

      {/*  Decor Products */}
      <ProductSection
        className="bg-white"
        title={'Phụ kiện trang trí'}
        segmentedList={decorSegmentedList}
        moreRedirectTo="/shop/search?categoryId=trangtri"
      />
      {/*  Office Products */}
      <ProductSection
        title={'Nội thất văn phòng'}
        segmentedList={officeSegmentedList}
        moreRedirectTo="/shop/search?categoryId=vanphong"
      />

      {/*  Voucher Section */}
      <div className="Shop-vouchers">
        <div
          className={`flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)]`}
        >
          <p className="text-center mb-[34px] text-[42px] font-bold">
            Mã giảm giá hôm nay
          </p>

          <div className="w-full">
            <div className="w-full bg-white grid grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1 xl:grid-cols-2 xl:grid-rows-2 gap-[24px]">
              {voucherList.slice(0, 4).map((voucherItem, index) => {
                return (
                  <VoucherCard
                    key={voucherId + '' + index}
                    data={voucherItem}
                  />
                );
              })}
            </div>
            {/* More Button */}
            <div className="flex items-center justify-center mt-[60px]">
              <Link
                to={'/shop/vouchers'}
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
      </div>

      {/* Contact email */}
      <div className="px-[var(--spacing-padding-container)] flex flex-wrap justify-between gap-[48px] my-[48px]">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center size-[60px] rounded-full border border-[#ccc]">
            <TbCoin className="text-[32px] stroke-slate-700 stroke-[1px]" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold">Hoàn tiền</h2>
            <p className="text-[#525258]">Trong vòng 7 ngày</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center size-[60px] rounded-full border border-[#ccc]">
            <BsChatDots className="text-[24px] stroke-slate-700" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold">Hỗ trợ</h2>
            <p className="text-[#525258]">24 một ngày, 7 ngày một tuần</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center size-[60px] rounded-full border border-[#ccc]">
            <BsCreditCard className="text-[24px] stroke-slate-700" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold">Thanh toán</h2>
            <p className="text-[#525258]">Đa dạng hình thức thanh toán</p>
          </div>
        </div>
      </div>

      <div
        style={{
          background: `url(${images.sendEmailBg}) no-repeat center center`,
          backgroundSize: 'fit',
        }}
        className="h-[300px] px-[80px] flex items-center justify-stretch mt-[120px] md:mt-0"
      >
        <div className="bg-white p-[60px] w-full flex flex-col lg:flex-row justify-center lg:justify-between lg:items-center gap-[60px] shadow-custom2 rounded-lg">
          <h1 className="w-full lg:w-1/2 block font-semibold text-[34px]">
            Đăng ký để nhận tin tức mới nhất
          </h1>
          <form
            action="#"
            className="w-full p-[8px] px-[16px] flex flex-col md:flex-row md:items-center md:justify-between gap-6 border has-[input:focus]:border-[#333] duration-150 rounded"
          >
            <input
              type="text"
              placeholder="Nhập Email của bạn..."
              className="outline-none flex-1 text-[16px] bg-transparent p-[8px]"
            />

            <button className="px-[42px] py-[10px] bg-black text-white rounded-sm md:ml-2 hover:bg-[var(--color-primary)] duration-100">
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shop;
