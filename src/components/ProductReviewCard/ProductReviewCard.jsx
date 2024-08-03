import images from '@/assets/images';
import React from 'react';
import RateStar from '../RateStar';
import PropTypes from 'prop-types';

const ProductReview = ({ data }) => {
  return (
    <div className="flex gap-6 p-[12px] border border-[#e7e7e7] rounded-[8px]">
      <img
        src={images.customerAvatar1}
        alt="Review Avatar"
        className="size-[60px] rounded-full"
      />
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-medium text-[18px]">Justine Bieber</h2>
          <RateStar rating={Math.round(4.4)} maxStar={5} spacing={2} />
          <div className="flex gap-2 font-normal text-[16px] opacity-75">
            <span>{`2024-07-12 10:30`}</span>
            <span>|</span>
            <div className="flex gap-1">
              <span>Phân loại hàng:</span>
              <span className="font-medium">{`Xanh lơ, Gỗ sồi`}</span>
            </div>
          </div>
        </div>
        <p className="flex font-normal">{`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto inventore neque sed dolorum perferendis voluptatibus, quibusdam quaerat sequi delectus maxime? Cupiditate ullam voluptates dolore nostrum ex eaque fuga rerum alias.`}</p>
      </div>
    </div>
  );
};

export default ProductReview;
