import React, { useEffect } from 'react';
import Collapse from '@/components/Collapse';
import CustomRadio from '@/components/CustomRadio';
import { formatCurrency } from '@/utils/currency';
import images from '@/assets/images';

const paymentMethod = [
  {
    label: <span className="font-medium">Thanh toán khi nhận hàng</span>,
    value: { title: 'Thanh toán khi nhận hàng', type: 'cod', code: 0 },
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <span className="font-medium">Thanh toán qua VTCPay</span>
        <div className="p-[2px] h-[24px] border border-[#3AA39F] rounded">
          <img
            src={images.vtcPay}
            alt="VTCPay Logo"
            className="h-full mix-blend-multiply"
          />
        </div>
      </div>
    ),
    value: { title: 'Thanh toán qua VTCPay', type: 'vtc-pay', code: 1 },
    disabled: true,
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <span className="font-medium">Thanh toán qua VNPay</span>
        <div className="p-[2px] h-[18px] border border-[#3AA39F] rounded">
          <img
            src={images.vnpay}
            alt="VNPay Logo"
            className="h-full mix-blend-multiply"
          />
        </div>
      </div>
    ),
    value: { title: 'Thanh toán qua VNPay', type: 'vn-pay', code: 2 },
  },
];

const PaymentProcess = ({ handleSetSummaryOrderData }) => {
  const handleChoosePaymentMethod = (data) => {
    const { name, value } = data;
    if (handleSetSummaryOrderData) {
      handleSetSummaryOrderData({ paymentMethod: value });
    }
  };

  useEffect(() => {
    handleSetSummaryOrderData({
      paymentMethod: undefined,
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Shipping Method */}
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse label="Hình thức vận chuyển">
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full">
              <CustomRadio
                name="paymentMethod"
                color="#3AA39F"
                items={paymentMethod}
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
