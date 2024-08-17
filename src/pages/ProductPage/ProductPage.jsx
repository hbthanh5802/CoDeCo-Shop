import React, { useEffect, useMemo, useState } from 'react';
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
import { serializeSearchParams } from '@/utils/url';
import { toast } from 'react-toastify';
import productApi from '@/api/productApi';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { pathname, search } = useLocation();
  const { categoryList } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [productDetailData, setProductDetailData] = useState({});
  const [productSizes, setProductSizes] = useState([]);
  const [productMaterials, setProductMaterials] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const { previous } = useSelector((state) => state.history);
  const { categoryId } = productDetailData;

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
  }, []);

  const handleFetchProductDetail = async () => {
    if (!productId) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau', { autoClose: 1500 });
      return;
    }
    try {
      setLoading(true);
      const response = await productApi.getProductDetail(productId);
      if (response && response.result) {
        const { colors, materials, sizes, productResponse } = response.result;
        const { productImages } = productResponse;
        if (sizes) setProductSizes(sizes);
        if (materials) setProductMaterials(materials);
        if (colors) setProductColors(colors);
        if (colors) setProductDetailData(productResponse);
        if (productImages) setProductImages(productImages);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.', { autoClose: 1000 });
      console.log('Failed to get Product Detail', error);
    } finally {
      setLoading(false);
    }
  };

  const breadCrumbItems = useMemo(() => {
    const { productId, name: productName, categoryId } = productDetailData;
    const _categoryItem = categoryList?.find(
      (categoryItem) => categoryItem.categoryId === categoryId
    );
    return [
      { label: 'Home', to: '/' },
      {
        label: _categoryItem ? _categoryItem.name : 'Shop',
        to: _categoryItem ? '/shop/search?categoryId=' + categoryId : '/shop',
      },
      {
        label: productName,
      },
    ];
  }, [productDetailData]);

  useEffect(() => {
    handleFetchProductDetail();
  }, [productId]);

  return (
    <div className="mt-[60px]">
      <div className="inline-flex flex-col gap-6 mb-[60px]">
        <Link
          to={categoryId ? '/shop/search?categoryId=' + categoryId : '/shop'}
          className="inline-flex gap-2 items-center"
        >
          <FaArrowLeftLong />
          <span>Quay lại</span>
        </Link>
        <div>
          <BreadCrumb items={breadCrumbItems} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch mb-[60px]">
        <div className="w-full md:w-5/12">
          <ProductDetail
            productDetailData={productDetailData}
            productSizes={productSizes}
            productMaterials={productMaterials}
            productColors={productColors}
          />
        </div>
        <div className="w-full md:w-7/12">
          <div className="ml-6">
            <GallerySwiper imageList={productImages} />
          </div>
        </div>
      </div>

      {/* Product Description */}
      <Collapse label="Mô tả chi tiết" className="!text-[#333] font-semibold">
        <ProductDescription productDetailData={productDetailData} />
      </Collapse>

      {/* Product Review */}
      <Collapse
        label="Phản hồi từ khách hàng"
        className="!text-[#333] font-semibold"
      >
        <ProductReview productDetailData={productDetailData} />
      </Collapse>

      {/* Recommend Product */}
      <Collapse
        label="Có thể bạn cũng thích"
        className="!text-[#333] font-semibold"
      >
        <RecommendProduct productDetailData={productDetailData} />
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
