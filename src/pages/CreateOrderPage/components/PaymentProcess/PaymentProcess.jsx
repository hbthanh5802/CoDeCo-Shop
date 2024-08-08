import React from 'react';
import Collapse from '@/components/Collapse';
import CustomRadio from '@/components/CustomRadio';
import { formatCurrency } from '@/utils/currency';

const shippingMethod = [
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng tiết kiệm</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(50000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'normal', price: 50000 },
  },
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng nhanh</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(100000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'fast', price: 100000 },
  },
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng hoả tốc</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(200000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'extra', price: 200000 },
  },
];

const PaymentProcess = () => {
  const handleChoosePaymentMethod = () => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      {/* Shipping Method */}
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse label="Hình thức vận chuyển">
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full">
              <CustomRadio
                name="shippingFee"
                color="#3AA39F"
                items={shippingMethod}
                onChange={(data) => handleChoosePaymentMethod(data)}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default PaymentProcess;
