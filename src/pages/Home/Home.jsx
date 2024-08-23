import React, { useEffect, useId, useMemo, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import images from '@/assets/images';
import SearchBox from '@/components/SearchBox';
import Segmented from '@/components/Segmented';
import ProductCard from '@/components/ProductCard';
import CustomSwiper from '@/components/CustomSwiper';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import CustomerReview from '@/components/CustomerReview';
import { useDispatch, useSelector } from 'react-redux';
import { resetHistory } from '@/store/slices/historySlice';
import productApi from '@/api/productApi';
import Spinner from '@/components/Spinner';

const customerReviewList = [
  {
    avatarUrl: images.customerAvatar1,
    bgUrl: images.customerReviewBg1,
    fullName: 'Trần Nguyên Xuân',
    content: 'Ôi nhận hàng ưng quá! Chất lượng đáng đồng tiền bát gạo',
    rating: 5,
  },
  {
    avatarUrl: images.customerAvatar2,
    bgUrl: images.customerReviewBg2,
    fullName: 'Hoàng Bá Thanh',
    content: 'Chất lượng sản phẩm cao cấp, sử dụng vật liệu tốt và bền đẹp.',
    rating: 4,
  },
  {
    avatarUrl: images.customerAvatar1,
    bgUrl: images.customerReviewBg3,
    fullName: 'Lưu Quang Đăng',
    content: 'Xuất sắc. Hàng đẹp, giao hàng nhanh',
    rating: 5,
  },
  {
    avatarUrl: images.customerAvatar1,
    bgUrl: images.customerReviewBg3,
    fullName: 'Lưu Quang Đăng',
    content: 'Xuất sắc. Hàng đẹp, giao hàng nhanh',
    rating: 5,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const bestSellerId = useId();
  const customerReviewId = useId();
  const { categoryList } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    if (!categoryList || !categoryList.length) return 1;
    const item = categoryList?.find(
      (categoryItem) => categoryItem.subCategoriesInfo.length > 0
    );
    return item.categoryId;
  });
  const [bestSellers, setBestSellers] = useState([]);

  const handleSegmentedChange = (value) => {
    setSelectedCategoryId(value);
  };

  const bestSellerSegmentedList = useMemo(() => {
    const result = categoryList
      ?.filter((categoryItem) => categoryItem.subCategoriesInfo?.length > 0)
      ?.map((categoryItem, index) => {
        const { categoryId, name } = categoryItem;
        return { label: name, value: categoryId, disable: false };
      });
    return result;
  }, [categoryList]);

  useEffect(() => {
    dispatch(resetHistory());
  }, []);

  useEffect(() => {
    setLoading(true);
    productApi
      .getProductsByCategoryId(selectedCategoryId)
      .then((response) => {
        if (response && response.result) {
          setBestSellers(response.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategoryId]);

  return (
    <div className="Home-container">
      {/* Background */}
      <div className="background relative">
        <img
          loading="lazy"
          src={images.homeBg}
          alt="Home Background"
          className="w-full h-auto"
        />
        <div className="gradient-layer bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 right-0 h-[10%]"></div>

        <div className="flex flex-col items-center left-0 right-0 absolute top-[120px] space-y-6">
          <div className="flex flex-col items-center left-0 right-0 text-[24px] sm:text-[28px] md:text-[48px] lg:text-[80px] font-semibold text-white text-center capitalize">
            <p>Biến không gian trở nên</p>
            <p>Tối giản và hiện đại hơn</p>
          </div>
          <div className="hidden lg:flex flex-col items-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-normal text-white/80 text-center">
            <p>Với CoDeco, hãy đưa căn phòng của bạn</p>
            <p>thành không gian tối giản và hiện đại chỉ trong nháy mắt.</p>
          </div>
          <div className="hidden md:block">
            <SearchBox />
          </div>
        </div>
      </div>

      {/* Why choose Us */}
      <div className="why-choose-us px-[var(--spacing-padding-container)] grid gap-[42px] py-[128px] grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1">
        <div className="font-semibold text-[42px] text-center md:text-left">
          <p>Tại sao chọn chúng tôi</p>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-bold text-[24px] text-[var(--color-primary)] md:color-[#333]">
            Tiện nghi sang trọng
          </h3>
          <p className="font-normal mt-[24px]">
            Lợi thế tuyệt vời khi thuê chỗ làm việc tại đây: Dịch vụ tiện nghi
            và cơ sở vật chất toàn diện.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-bold text-[24px] text-[var(--color-primary)] md:color-[#333]">
            Giá cả phải chăng
          </h3>
          <p className="font-normal mt-[24px]">
            Chỉ với mức giá phải chăng, bạn đã có thể sở hữu một không gian làm
            việc chất lượng cao và tận hưởng những tiện ích độc đáo chỉ có tại
            đây.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-[24px] text-[var(--color-primary)] md:color-[#333]">
            Đa dạng lựa chọn
          </h3>
          <p className="font-normal mt-[24px]">
            Chúng tôi cung cấp nhiều lựa chọn không gian làm việc độc đáo, giúp
            bạn tìm được nơi làm việc phù hợp với sở thích của mình.
          </p>
        </div>
      </div>

      {/* Best seller */}
      <div className="bg-[#F7F7F7] flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)]">
        <p className="mb-[34px] text-[42px] font-bold">Nội thất bán chạy</p>
        <Segmented
          items={bestSellerSegmentedList}
          onChange={handleSegmentedChange}
        />

        <div className="product-slider w-full">
          <CustomSwiper
            // autoPlay={2500}
            className={'pt-[40px]'}
            pagination={false}
            spaceBetween={48}
            slidesPerView={1}
            loop={bestSellers.length > 4 ? true : false}
          >
            {loading || bestSellers.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SwiperSlide key={bestSellerId + '-' + index}>
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
              : bestSellers.map((bestSellerItem, index) => (
                  <SwiperSlide key={bestSellerId + '-' + index}>
                    <ProductCard data={bestSellerItem} />
                  </SwiperSlide>
                ))}
          </CustomSwiper>

          <div className="flex items-center justify-center">
            <Link
              to={'#'}
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
      {/* User UX */}
      <div className="w-full flex flex-col-reverse md:flex-row gap-6 overflow-clip relative pt-[120px] md:pt-[240px] pb-[120px]">
        <div className="relative w-full md:w-1/2 hidden md:block">
          <img
            loading="lazy"
            src={images.userUxBg1}
            alt="Furniture image"
            className="md:-translate-x-6 w-[630px] h-[450px] object-cover object-center rounded-[20px]"
          />
          <div className="absolute hidden md:flex -z-[3] -top-[65px] -left-[65px] h-[400px] w-[500px] bg-[#f7f7f7] rounded-[20px]"></div>
          <div className="absolute hidden md:flex -z-[2] top-1/2 -translate-y-1/2 left-1/4 h-[300px] w-[500px] bg-[#f7f7f7] rounded-[20px]"></div>
          <div
            style={{
              backgroundImage: `url(${images.userUxBg5})  `,
            }}
            className={`absolute -z-[1] left-1/2 -translate-x-[60%] bottom-0 translate-y-[10%] h-[420px] w-[550px] rounded-[20px] blur-[50px] opacity-50`}
          ></div>
        </div>

        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left md:pr-[80px] space-y-6 px-[80px] md:px-0">
          <h2 className="uppercase font-bold text-[18px] text-[var(--color-primary)]">
            Trải nghiệm
          </h2>
          <h1 className="text-[42px] font-semibold capitalize">
            Mang lại cho bạn trải nghiệm Tuyệt vời nhất
          </h1>
          <p className="text-[18px]">
            Bạn hoàn toàn yên tâm về chất lượng sản phẩm. Tất cả nội thất đều
            được thiết kế bởi đội ngũ chuyên nghiệp, mang phong cách sang trọng,
            tinh tế, sử dụng vật liệu cao cấp.
          </p>
          <div className="flex items-center">
            <Link
              to={'#'}
              className="flex items-center justify-center space-x-2 hover:px-3 py-1 rounded-full bg-opacity-25 hover:bg-orange-300/15 duration-300"
            >
              <span className="font-normal text-base text-[var(--color-primary)]">
                Xem thêm
              </span>
              <GoArrowRight className="text-[18px] fill-[var(--color-primary)]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 overflow-clip relative pt-[120px] md:pt-[240px] pb-[120px]">
        <div className="space-y-6 w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start px-[80px] md:px-0">
          <h2 className="uppercase font-bold text-[18px] text-[var(--color-primary)]">
            Chất liệu
          </h2>
          <h1 className="text-[42px] font-semibold capitalize">
            Chất liệu cao cấp để tạo nên những sản phẩm nội thất bền đẹp.
          </h1>
          <p className="text-[18px]">
            "CoDeco" rất chú tâm thiết kế nội thất phù hợp với môi trường của
            bạn, sử dụng chất liệu cao cấp, thương hiệu nổi tiếng với mức giá vô
            cùng hợp lý.
          </p>
          <div className="flex items-center">
            <Link
              to={'#'}
              className="flex items-center justify-center space-x-2 hover:px-3 py-1 rounded-full bg-opacity-25 hover:bg-orange-300/15 duration-300"
            >
              <span className="font-normal text-base text-[var(--color-primary)]">
                Xem thêm
              </span>
              <GoArrowRight className="text-[18px] fill-[var(--color-primary)]" />
            </Link>
          </div>
        </div>

        <div className="relative space-x-10 w-1/2 hidden md:flex">
          <div className="space-y-6">
            <img
              loading="lazy"
              src={images.userUxBg2}
              alt="Furniture image"
              className=" w-[230px] h-[250px] object-cover object-center rounded-[20px]"
            />
            <img
              loading="lazy"
              src={images.userUxBg3}
              alt="Furniture image"
              className=" w-[230px] h-[340px] object-cover object-center rounded-[20px]"
            />
          </div>
          <div className="flex items-center overflow-hidden">
            <img
              loading="lazy"
              src={images.userUxBg4}
              alt="Furniture image"
              className="w-[630px] h-[450px] object-cover rounded-l-[20px] object-center"
            />
          </div>

          <div className="absolute -z-[3] top-[0px] right-0 translate-x-1/2 h-[400px] w-[500px] bg-[#f7f7f7] rounded-[20px]"></div>
          <div
            style={{
              backgroundImage: `url(${images.userUxBg4})  `,
            }}
            className={`absolute -z-[1] bottom-0 right-0 translate-x-[5%] translate-y-[-10%] h-[420px] w-[550px] rounded-[20px] blur-[50px] opacity-50`}
          ></div>
        </div>
      </div>

      {/* Customer Review */}
      <div className="customer-review py-[200px] px-[80px]">
        <h1 className="font-semibold text-[42px] text-center pb-[60px]">
          Đánh giá từ khách hàng
        </h1>
        <div>
          <CustomSwiper
            spaceBetween={24}
            pagination={false}
            slidesPerView={1}
            responsive={{
              // 640: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1284: { slidesPerView: 3 },
            }}
            paddingY={100}
          >
            {customerReviewList.map((customerReivewData, index) => (
              <SwiperSlide key={`${customerReviewId}-${index}`}>
                <CustomerReview data={customerReivewData} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
