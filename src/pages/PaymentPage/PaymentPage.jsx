import Spinner from '@/components/Spinner';
import { statusView } from '@/constants';
import { setOrderData } from '@/store/slices/shopSlice';
import { serializeSearchParams } from '@/utils/url';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { search, pathname } = useLocation();
  const { paymentType } = useParams();
  const { orderData } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentType === 'vn-pay') {
      const {
        vnp_OrderInfo,
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_SecureHash,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
      } = serializeSearchParams(search);
      const paymentId = vnp_OrderInfo.split(' ')?.pop();
      if (orderData && paymentId === orderData.paymentId) {
        navigate('/shop/create-order', {
          state: {
            orderInformation: {
              ...orderData,
              pass_process: 4,
              pass_payment_status:
                vnp_TransactionStatus === '00'
                  ? statusView.SUCCESS
                  : statusView.FAILED,
            },
            pass_process: 4,
            pass_payment_status:
              vnp_TransactionStatus === '00'
                ? statusView.SUCCESS
                : statusView.FAILED,
          },
        });
        dispatch(setOrderData(null));
      }
    }
  }, [search, pathname]);

  return (
    <div className="w-full h-screen flex flex-col gap-6 items-center justify-center">
      <Spinner size={24} color="black" />
      <p>Đang xử lý thanh toán. Vui lòng chờ...</p>
    </div>
  );
};

export default PaymentPage;
