import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '@/components/BreadCrumb';
import GallerySwiper from '@/components/GallerySwiper';
import images from '@/assets/images';

import ProductDetail from '@/pages/ProductPage/components/ProductDetail';
import ProductDescription from './components/ProductDescription';
import ProductReview from './components/ProductReview';
import RecommendProduct from './components/RecommendProduct';
import Collapse from '@/components/Collapse';
import { TbCoin } from 'react-icons/tb';
import { BsChatDots, BsCreditCard } from 'react-icons/bs';
import { setPreviousHistory } from '@/store/slices/historySlice';

const ProductPage = () => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { previous } = useSelector((state) => state.history);
  const [productImages, setProductImages] = useState([
    images.productImg,
    images.categoryBed,
    images.customerAvatar1,
    images.customerAvatar2,
    images.productImg,
    images.categoryBed,
    images.customerAvatar1,
    images.customerAvatar2,
  ]);

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
  }, []);

  return (
    <div className="mt-[60px]">
      <div className="inline-flex flex-col gap-6 mb-[60px]">
        <Link
          to={previous || '/shop'}
          className="inline-flex gap-2 items-center"
        >
          <FaArrowLeftLong />
          <span>Quay lại</span>
        </Link>
        <div>
          <BreadCrumb />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch mb-[60px]">
        <div className="w-full md:w-5/12">
          <ProductDetail />
        </div>
        <div className="w-full md:w-7/12">
          <div className="ml-6">
            <GallerySwiper imageList={productImages} />
          </div>
        </div>
      </div>

      {/* Product Description */}
      <Collapse label="Mô tả chi tiết" className="!text-[#333] font-semibold">
        <ProductDescription />
      </Collapse>

      {/* Product Review */}
      <Collapse
        label="Phản hồi từ khách hàng"
        className="!text-[#333] font-semibold"
      >
        <ProductReview productData={{ productId }} />
      </Collapse>

      {/* Recommend Product */}
      <Collapse
        label="Có thể bạn cũng thích"
        className="!text-[#333] font-semibold"
      >
        <RecommendProduct />
      </Collapse>

      {/* Services */}
      <div className="flex flex-wrap justify-between gap-[48px] my-[48px]">
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
    </div>
  );
};

export default ProductPage;
