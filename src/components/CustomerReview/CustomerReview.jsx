import images from '@/assets/images';
import React from 'react';
import RateStar from '../RateStar';
import PropTypes from 'prop-types';

const CustomerReview = ({ data }) => {
  const { avatarUrl, bgUrl, fullName, content, rating } = data;
  return (
    <div
      style={{
        backgroundImage: `url(${bgUrl || images.customerReviewBg1})`,
      }}
      className={`relative h-[500px] w-[370px] bg-orange-500 bg-cover bg-no-repeat rounded-[20px] p-[20px] flex items-end`}
    >
      <div className="relative customer-review-content bg-white w-[330px] rounded-[20px]">
        <div className="customer-review-avatar absolute p-[6px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white">
          <div className="relative">
            <img
              src={avatarUrl || images.customerAvatar1}
              alt="Customer Review Avatar"
              className="w-[50px] h-[50px] bg-white object-cover rounded-full"
            />
            <img
              src={avatarUrl || images.customerAvatar1}
              alt="Customer Review Avatar"
              className="absolute z-[-1] w-[40px] h-[40px] bg-white object-cover rounded-full blur-[12px] bottom-0 translate-y-[5%]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6 p-[40px]">
          <h2 className="text-center text-[18px] font-semibold">
            {fullName || `Nguyễn Văn A`}
          </h2>
          <p className="text-[14px] text-center">
            {content ||
              'Chất lượng sản phẩm cao cấp, sử dụng vật liệu tốt và bền đẹp.'}
          </p>
          <RateStar size={14} spacing={6} rating={rating || 5} maxStar={5} />
        </div>
      </div>
      <img
        src={images.customerReviewBg1}
        alt="Customer Review Backdrop"
        className="absolute z-[-1] w-[200px] h-[280px] left-1/2 -translate-x-1/2 blur-[50px] bottom-0 translate-y-[-10%]"
      />
    </div>
  );
};

CustomerReview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CustomerReview;
