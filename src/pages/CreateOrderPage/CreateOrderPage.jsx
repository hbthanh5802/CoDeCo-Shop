import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderProcessStep from './components/OrderProcessStep';
import AddressProcess from './components/AddressProcess';
import PaymentProcess from './components/PaymentProcess';
import ReviewOrder from './components/ReviewOrder';
import CompleteOrder from './components/CompleteOrder';
import { formatCurrency } from '@/utils/currency';
import { TbCoin } from 'react-icons/tb';
import { BsChatDots, BsCreditCard } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Modal, { ConfirmBox } from '@/components/Modal';

const orderProcessStep = [
  { process: 1, title: '1. Thiết lập địa chỉ' },
  { process: 2, title: '2. Phương thức thanh toán' },
  { process: 3, title: '3. Kiểm tra lại thông tin' },
  { process: 4, title: '4. Thanh toán' },
];

const checkValid = (data) => {
  if (typeof data === 'object') return Object.keys(data).length ? true : false;
  if (typeof data === 'string') return !!data.trim();
  if (typeof data === 'number') return data >= 0 ? true : false;
  return !!data;
};

const CreateOrderPage = () => {
  const navigate = useNavigate();
  if (!useLocation().state) return <></>;
  const { orderInformation } = useLocation().state;
  const [process, setProcess] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryOrderData, setSummaryOrderData] = useState(orderInformation);

  const handleSetSummaryOrderData = useCallback((data) => {
    setSummaryOrderData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleBackButtonClick = () => {
    if (process === 1) navigate('/shop/cart');
    if (process === 2) setProcess(1);
    if (process === 3) setProcess(2);
  };

  useEffect(() => {
    console.log('summaryOrderData', summaryOrderData);
  }, [summaryOrderData]);

  const canNext = useMemo(() => {
    if (process === 1) {
      return ['shippingMethod', 'address'].every((key, index) =>
        checkValid(summaryOrderData[key])
      );
    }
    if (process === 2) {
      return ['paymentMethod'].every((key, index) =>
        checkValid(summaryOrderData[key])
      );
    }
    if (process === 3) return true;
  }, [summaryOrderData, process]);

  const handleConfirmPurchase = () => {
    setIsModalOpen(false);
    setProcess(4);
  };

  const handleCancelPurchase = () => {
    toast.info('Vui lòng xác nhận để tiến hành thanh toán đơn hàng', {
      autoClose: 2000,
    });
    setIsModalOpen(false);
  };

  const handleNextBtnClick = () => {
    if (canNext) {
      if (process === 3) {
        setIsModalOpen(true);
      } else {
        setProcess(process + 1);
      }
    } else
      toast.info('Vui lòng hoàn thiện thông tin đơn hàng', { autoClose: 1000 });
  };

  return (
    <div className="w-full mt-[60px]">
      <div className="flex flex-col gap-[24px] mb-[48px]">
        <h1 className="font-semibold text-[32px]">Tạo đơn hàng</h1>
        <OrderProcessStep
          initialProcess={1}
          currentProcess={process}
          processStepList={orderProcessStep}
          canNext={canNext}
          handleSetProcess={(value) => setProcess(value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-[24px]">
        <div className={`w-full ${process <= 3 ? 'md:w-2/3' : 'w-full'}`}>
          {process === 1 && (
            <AddressProcess
              summaryOrderData={summaryOrderData}
              handleSetSummaryOrderData={handleSetSummaryOrderData}
            />
          )}
          {process === 2 && (
            <PaymentProcess
              handleSetSummaryOrderData={handleSetSummaryOrderData}
            />
          )}
          {process === 3 && (
            <ReviewOrder
              summaryOrderData={summaryOrderData}
              handleSetSummaryOrderData={handleSetSummaryOrderData}
            />
          )}
          {process === 4 && (
            <CompleteOrder summaryOrderData={summaryOrderData} />
          )}
        </div>
        {/* Right Tab */}
        {process <= 3 && (
          <div className="w-full md:w-1/3 bg-white rounded p-[32px] flex flex-col gap-[32px] border border-[#e7e7e7] h-fit">
            <h2 className="font-semibold text-[24px]">Thông tin</h2>
            <div className="w-full flex flex-col gap-[24px]">
              {/* Total price */}
              <div className="w-full flex items-center justify-between">
                <span className="text-base">Tổng giá:</span>
                <span className="text-base font-semibold">
                  {formatCurrency(summaryOrderData.totalPrice)}
                </span>
              </div>
              {/* Shipping Fee */}
              {summaryOrderData.shippingMethod &&
                summaryOrderData.shippingFee && (
                  <div className="w-full flex items-center justify-between">
                    <span className="text-base">Phí vận chuyển:</span>
                    <span className="text-base font-semibold">
                      {formatCurrency(summaryOrderData.shippingFee)}
                    </span>
                  </div>
                )}
              {/* Discounted price */}
              {summaryOrderData.voucher && (
                <div className="w-full flex items-center justify-between">
                  <span className="text-base">Tiền giảm:</span>
                  <span className="text-base font-semibold text-[#3AA39F]">
                    {formatCurrency(summaryOrderData.discountedPrice)}
                  </span>
                </div>
              )}
            </div>
            {/* Separate */}
            <span className="w-full border-b"></span>
            <div className="w-full flex flex-col gap-[24px]">
              {/* Total price */}
              <div className="w-full flex items-center justify-between">
                <span className="text-base">Tạm tính:</span>
                <span className="text-base font-semibold">
                  {formatCurrency(
                    summaryOrderData.totalPrice +
                      summaryOrderData.shippingFee -
                      summaryOrderData.discountedPrice
                  )}
                </span>
              </div>
              {/* Unit */}
              <div className="w-full flex items-center justify-between">
                <span className="text-base">Đơn vị:</span>
                <span className="text-base font-semibold">VNĐ</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[24px]">
              <button
                className="capitalize duration-200 flex justify-center items-center px-[40px] py-[18px] bg-[var(--color-primary)] text-white rounded hover:brightness-105 disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                onClick={handleNextBtnClick}
                disabled={!canNext}
              >
                {process === 3 ? 'Tiến hành thanh toán' : 'Tiếp tục'}
              </button>
              <button
                className="duration-200 flex justify-center p-[12px] items-center bg-white rounded hover:bg-[#f7f7f7]"
                onClick={handleBackButtonClick}
              >
                Quay lai
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConfirmBox
          title="Xác nhận thanh toán"
          content="Chọn Xác nhận để hoàn tất quá trình đặt hàng"
          onCancel={handleCancelPurchase}
          onConfirm={handleConfirmPurchase}
        />
      </Modal>

      {/* Services */}
      <div className="flex flex-wrap justify-between gap-[48px] my-[48px] mt-[120px]">
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

export default CreateOrderPage;
