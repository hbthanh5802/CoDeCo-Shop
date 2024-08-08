import React, { useId } from 'react';

import './ReviewOrder.scss';
import { formatCurrency } from '@/utils/currency';
import { Link } from 'react-router-dom';

const ReviewOrder = ({ summaryOrderData }) => {
  const orderItemId = useId();
  const {
    items,
    shippingFee,
    shippingMethod,
    paymentMethod,
    totalPrice,
    discountedPrice,
    address,
    voucher,
  } = summaryOrderData;
  const { nameReceiver, phoneReceiver } = address;
  const userAddress =
    (address.detail ? address.detail : '') +
    ', ' +
    (address.ward ? address.ward : '') +
    ', ' +
    (address.district ? address.district : '') +
    ', ' +
    (address.province ? address.province : '') +
    ', ' +
    (address.nation ? address.nation : '') +
    '.';
  const { title, type, code } = paymentMethod;

  return (
    <div className="flex flex-col gap-2 px-[24px] py-[12px] border border-[#e7e7e7] rounded">
      <h1 className="font-semibold text-[18px] p-[12px] w-full text-center">
        Thông tin mua hàng
      </h1>
      <div className="flex flex-col gap-6">
        {/* Receiver */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-[16px]">Thông tin người nhận</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[14px]">
                <span className="font-medium">Họ và tên:</span>
                <span>{nameReceiver}</span>
              </div>
              <div className="flex items-center gap-3 text-[14px]">
                <span className="font-medium">Số điện thoại:</span>
                <span>{phoneReceiver}</span>
              </div>
              <div className="flex items-center gap-3 text-[14px]">
                <span className="font-medium">Địa chỉ nhận hàng:</span>
                <span>{userAddress}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Order Items */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-[16px]">Sản phẩm</h2>
            <div className="flex flex-col gap-2">
              <table className="styled-table rounded-sm text-[14px]">
                <thead>
                  <tr>
                    <th className="m-w-[75px] font-normal">STT</th>
                    <th className="m-w-[350px]">Thông tin sản phẩm</th>
                    <th>Đơn giá</th>
                    <th className="m-w-[100px]">Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((orderItem, index) => {
                    const { name, price, count, color, material, size } =
                      orderItem;
                    return (
                      <tr key={`${orderItemId}-${index}`}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                          <div className="flex flex-col">
                            <h3 className="font-semibold">{name}</h3>
                            <div className="flex items-center gap-1 text-slate-700">
                              <span>{`${color},`}</span>
                              <span>{`${material},`}</span>
                              <span>{`${size}`}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{formatCurrency(price)}</td>
                        <td className="text-center">{formatCurrency(count)}</td>
                        <td className="text-center">
                          {formatCurrency(price * count)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-[16px]">
              Phương thức thanh toán
            </h2>
            <span className="text-[14px]">{title}</span>
          </div>
        </div>
        {/* Shipping */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-[16px]">
              Phương thức vận chuyển
            </h2>
            <span className="text-[14px]">{shippingMethod}</span>
          </div>
        </div>
        {/* Receiver */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-[16px]">Số tiền thanh toán</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 text-[14px]">
                <span className="font-medium">Tổng tiền hàng:</span>
                <span>{`${formatCurrency(totalPrice)} VNĐ`}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[14px]">
                <span className="font-medium">Tiền giảm:</span>
                <span>{`${formatCurrency(discountedPrice)} VNĐ`}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[14px]">
                <span className="font-medium">Phí vận chuyển:</span>
                <span>{`${formatCurrency(shippingFee)} VNĐ`}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[14px]">
                <span className="font-medium">Tổng thanh toán:</span>
                <span className="font-semibold">{`${formatCurrency(
                  totalPrice + shippingFee - discountedPrice
                )} VNĐ`}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Terms */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-1 text-[14px]">
            <p>
              Nhấn{' '}
              <span className="font-medium text-[--color-primary]">
                “Thanh toán”
              </span>{' '}
              đồng nghĩa với việc bạn đồng ý tuân theo
            </p>
            <Link to={'/terms'}>
              <span className="font-medium">Điều khoản CoDeco</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
