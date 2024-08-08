import React from 'react';
import PropTypes from 'prop-types';

const UserAddress = ({ data = {}, className }) => {
  const { nation, province, district, detail, phoneReceiver, nameReceiver } =
    data;
  return (
    <div className={`w-full flex flex-col gap-[8px] ${className}`}>
      <div className="w-full flex items-center gap-[12px] text-[14px]">
        <span className="font-medium">Họ và Tên:</span>
        <span>{nameReceiver}</span>
      </div>
      <div className="w-full flex items-center gap-[12px] text-[14px]">
        <span className="font-medium">Số điện thoại:</span>
        <span>{phoneReceiver}</span>
      </div>
      <div className="w-full flex items-center gap-[12px] text-[14px]">
        <span className="font-medium">Địa chỉ nhận hàng:</span>
        <div className="flex items-center gap-[4px]">
          {detail && <span>{detail},</span>}
          {district && <span>{district},</span>}
          {province && <span>{province},</span>}
          {nation && <span>{nation}</span>}
        </div>
      </div>
    </div>
  );
};

UserAddress.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default UserAddress;
