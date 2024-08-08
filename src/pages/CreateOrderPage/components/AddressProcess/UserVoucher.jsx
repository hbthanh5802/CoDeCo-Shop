import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '@/utils/currency';

const UserVoucher = ({ data = {} }) => {
  const {
    title,
    discountPercent,
    minValueOrder,
    maxValueDiscount,
    description,
  } = data;
  return (
    <div className="flex flex-col gap-3 text-[16px]">
      <div className="flex items-center gap-3">
        <span className="font-medium">{title}</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{`Giảm ${discountPercent}`}</span>
          <span className="font-semibold">%</span>
        </div>
        {minValueOrder && (
          <span className="text-slate-600">{`Dành cho đơn hàng có giá trị tối thiểu ${formatCurrency(
            minValueOrder
          )} VNĐ`}</span>
        )}
      </div>
      {maxValueDiscount && (
        <span className="text-slate-600">{`Giảm tối đa ${formatCurrency(
          maxValueDiscount
        )} VNĐ`}</span>
      )}
      <div className=" text-slate-400">
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

UserVoucher.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserVoucher;
