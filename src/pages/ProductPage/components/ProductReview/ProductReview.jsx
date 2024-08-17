import Collapse from '@/components/Collapse';
import RateStar from '@/components/RateStar';
import React, { useEffect, useId, useRef, useState } from 'react';
import CategoryRadio from '../CategoryRadio';
import PropTypes from 'prop-types';

import './ProductReview.scss';
import ProductReviewCard from '@/components/ProductReviewCard';
import { IoIosArrowDown } from 'react-icons/io';
import { fakeApi } from '@/utils/url';
import Spinner from '@/components/Spinner';
import images from '@/assets/images';
import productApi from '@/api/productApi';

const reviewFilterList = [
  {
    label: 'Tất cả',
  },
  {
    label: '5 sao',
    value: 5,
  },
  {
    label: '4 sao',
    value: 4,
  },
  {
    label: '3 sao',
    value: 3,
  },
  {
    label: '2 sao',
    value: 2,
  },
  {
    label: '1 sao',
    value: 1,
  },
  {
    label: 'Có bình luận',
    value: 0,
  },
];

const ProductReview = ({ productDetailData }) => {
  const [loading, setLoading] = useState(false);
  const canFetching = useRef(true);
  const reviewId = useId();
  const [summaryReviews, setSummaryReviews] = useState({
    averageRating: 0,
    commentReviews: 0,
    fiveStarReviews: 0,
    fourStarReviews: 0,
    oneStarReviews: 0,
    threeStarReviews: 0,
    totalReviews: 0,
    twoStarReviews: 0,
  });
  const [reviewList, setReviewList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    hasNext: false,
    hasPrevious: false,
    totalCount: 0,
    totalPages: 0,
  });

  const { productId } = productDetailData;
  const [reviewParams, setReviewParams] = useState({
    rate: undefined,
    page: 1,
    pageSize: 3,
  });

  const handleFetchProductReviews = async (
    reset = false,
    searchParams = {}
  ) => {
    if (!productId) return;
    setLoading(true);
    try {
      const response = await productApi.getProductReviews({
        productId,
        ...searchParams,
      });
      if (response && response.result) {
        if (response.result.data) {
          setReviewList((prev) => {
            return reset
              ? response.result.data
              : [...prev, ...response.result.data];
          });
        }
        if (response.pagination) setReviewParams(response.pagination);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      canFetching.current = true;
    }
  };

  const handleReviewFilterChange = (data) => {
    const { value } = data;
    setReviewParams((prev) => ({ ...prev, rate: value, page: 1 }));
    handleFetchProductReviews(true, { ...reviewParams, rate: value });
  };

  const handleShowMoreReviewClick = () => {
    setReviewParams((prev) => ({ ...prev, page: prev.page + 1 }));
    handleFetchProductReviews(false, { ...reviewParams });
  };

  useEffect(() => {
    if (!productId) return;
    productApi
      .getReviewSummary(productId)
      .then((response) => {
        if (response && response.result) {
          const {
            averageRating,
            commentReviews,
            fiveStarReviews,
            fourStarReviews,
            oneStarReviews,
            threeStarReviews,
            totalReviews,
            twoStarReviews,
          } = response;
          setSummaryReviews({
            averageRating,
            commentReviews,
            fiveStarReviews,
            fourStarReviews,
            oneStarReviews,
            threeStarReviews,
            totalReviews,
            twoStarReviews,
          });
        }
      })
      .catch((error) => {
        console.log('Failed to get Summary Product Reviews', error);
      });
  }, [productId]);

  useEffect(() => {
    handleFetchProductReviews(false, { ...reviewParams });
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 mt-[24px] mb-[60px]">
        <div className="w-full md:w-1/3">
          <div className="flex items-baseline flex-row md:flex-col gap-3 md:gap-1">
            <h1 className="font-medium text-[32px] text-[var(--color-primary)]">{`${
              summaryReviews.averageRating || 5
            } / 5`}</h1>
            <RateStar
              rating={Math.round(summaryReviews.averageRating || 5)}
              maxStar={5}
              spacing={4}
              color="#E58411"
            />
          </div>

          <div className="review-filter mt-[24px]">
            <CategoryRadio
              name="rate"
              items={reviewFilterList}
              className="flex gap-3 font-normal flex-wrap"
              onChange={(data) => handleReviewFilterChange(data)}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-[24px]">
            {reviewList?.length ? (
              reviewList.map((_, index) => (
                <ProductReviewCard key={`${reviewId}-${index}`} />
              ))
            ) : (
              <>
                <img
                  src={images.empty}
                  alt="Empty Images"
                  className="w-[60px] fill-slate-100"
                />
                <p className="font-normal text-[16px]]">
                  Chưa có đánh giá nào.
                </p>
              </>
            )}
          </div>
          <button
            className="flex items-center justify-center gap-2 duration-200 border border-[#E58411]/[0.3] bg-[#E58411]/[0.05] rounded font-normal text-[var(--color-primary)] px-[24px] py-[8px] min-h-[42px] hover:border-[#E58411]/[0.75] active:bg-[#E58411] active:text-white disabled:bg-[#f7f7f7] disabled:border-[#e7e7e7] disabled:text-[#ccc]"
            onClick={handleShowMoreReviewClick}
            disabled={loading}
          >
            {loading ? (
              <Spinner size={18} color="text-black" />
            ) : (
              <>
                <span>Xem thêm</span>
                <IoIosArrowDown className="text-[18px]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductReview.propTypes = {
  productDetailData: PropTypes.object.isRequired,
};

export default ProductReview;
