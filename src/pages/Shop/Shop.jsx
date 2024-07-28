import images from '@/assets/images';
import CustomSwiper from '@/components/CustomSwiper';
import { setPreviousHistory } from '@/store/slices/historySlice';
import React, { useId } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import CategoryCard from './components/CategoryCard';
import ProductSection from '@/components/ProductSection';
import VoucherCard from '@/components/VoucherCard';

import { GoArrowRight } from 'react-icons/go';
import { TbCoin } from 'react-icons/tb';
import { BsChatDots } from 'react-icons/bs';
import { BsCreditCard } from 'react-icons/bs';

const bestSellerSegmentedList = [
  {
    label: 'Ghế',
    value: 'gheId',
  },
  {
    label: 'Đèn',
    value: 'denId',
  },
  {
    label: 'Sofa',
    value: 'sofaId',
  },
  {
    label: 'Disabled',
    value: 'Disabled',
    disable: true,
  },
];

const decorSegmentedList = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Thảm',
    value: 'thamId',
  },
  {
    label: 'Lọ hoa',
    value: 'lohoaId',
  },
  {
    label: 'Đồng hồ',
    value: 'donghoId',
    disable: true,
  },
  {
    label: 'Tranh treo tường',
    value: 'tranhId',
  },
];

const officeSegmentedList = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Bàn văn phòng',
    value: 'banvanphongId',
  },
  {
    label: 'Bàn giám đốc',
    value: 'bangiamdocId',
  },
  {
    label: 'Bàn họp',
    value: 'banhopId',
  },
  {
    label: 'Ghế nhân viên',
    value: 'ghenhienvienId',
  },
  {
    label: 'Ghế giám đốc',
    value: 'ghegiamdocId',
  },
  {
    label: 'Tủ tài liệu',
    value: 'tutailieuId',
  },
];

const categoryList = [
  {
    title: 'Bàn học sinh',
    to: '/shop/search?categoryId=1',
    bgUrl: images.categoryTable,
  },
  {
    title: 'Tủ rượu',
    to: '/shop/search?categoryId=32',
    bgUrl: images.categoryWineCabinet,
  },
  {
    title: 'Bàn trang điểm',
    to: '/shop/search?categoryId=3',
    bgUrl: images.categoryMakeup,
  },
  {
    title: 'Giường tủ gỗ',
    to: '/shop/search?categoryId=12',
    bgUrl: images.categoryBed,
  },
  {
    title: 'Tủ rượu',
    to: '/shop/search?categoryId=32',
    bgUrl: images.categoryWineCabinet,
  },
  {
    title: 'Bàn trang điểm',
    to: '/shop/search?categoryId=3',
    bgUrl: images.categoryMakeup,
  },
  {
    title: 'Bàn học sinh',
    to: '/shop/search?categoryId=1',
    bgUrl: images.categoryTable,
  },
  {
    title: 'Tủ rượu',
    to: '/shop/search?categoryId=32',
    bgUrl: images.categoryWineCabinet,
  },
  {
    title: 'Tủ rượu',
    to: '/shop/search?categoryId=32',
    bgUrl: images.categoryWineCabinet,
  },
  {
    title: 'Bàn trang điểm',
    to: '/shop/search?categoryId=3',
    bgUrl: images.categoryMakeup,
  },
  {
    title: 'Giường tủ gỗ',
    to: '/shop/search?categoryId=12',
    bgUrl: images.categoryBed,
  },
  {
    title: 'Tủ rượu',
    to: '/shop/search?categoryId=32',
    bgUrl: images.categoryWineCabinet,
  },
  {
    title: 'Bàn trang điểm',
    to: '/shop/search?categoryId=3',
    bgUrl: images.categoryMakeup,
  },
];

const Shop = () => {
  const categoryId = useId();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  dispatch(setPreviousHistory(pathname + search));

  const handleSegmentedChange = (value) => {
    console.log(value);
  };

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
        title={'Sản phẩ mới ra mắt'}
        segmentedList={bestSellerSegmentedList}
        moreRedirectTo="/shop/search?categoryId=trangtri"
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
            {categoryList.map((item, index) => (
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
        title={'Phụ kiện trnag trí'}
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
              <VoucherCard />
              <VoucherCard />
              <VoucherCard />
              <VoucherCard />
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
              className="outline-none text-[16px] bg-transparent p-[8px]"
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
