import Collapse from '@/components/Collapse';
import React from 'react';

const ProductDescription = ({ productDetailData }) => {
  const {
    productId,
    name: productName,
    description: productDesc,
    enable,
    categoryId,
    percent,
    minPrice,
    maxPrice,
    averageRating,
    createdAt,
    updateAt,
  } = productDetailData;

  return (
    <div>
      <div className="flex flex-col gap-3 mt-3 mb-[60px]">
        <h3 className="font-medium text-[18px]">{productName}</h3>
        <p className="text-base font-normal">{productDesc}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
