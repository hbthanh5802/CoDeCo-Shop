import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import StatusView from '@/components/StatusView';
import { toast } from 'react-toastify';
import { fakeApi, serializeSearchParams } from '@/utils/url';
import { statusView } from '@/constants';
import orderApi from '@/api/orderApi';
import { useDispatch } from 'react-redux';
import {
  getCartItemList,
  getNotificationList,
  setOrderData,
} from '@/store/slices/shopSlice';
import { useNavigate } from 'react-router-dom';

const CompleteOrder = ({ summaryOrderData, paymentStatus }) => {
  if (!summaryOrderData) return <></>;
  const canCreateOrder = useRef(true);
  const {
    paymentMethod,
    note,
    address,
    voucher,
    shippingFee,
    discountedPrice,
    totalPrice,
  } = summaryOrderData;
  const { type, title, code } = paymentMethod;
  const { addressId } = address;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(statusView.PENDING);

  const fetchCreateOrder = async () => {
    try {
      const bodyData = {
        note: note,
        paymentMethod: code,
        addressId: addressId,
        voucherId: voucher?.voucherId,
      };
      const response = await orderApi.createOrder(bodyData);
      dispatch(getCartItemList({}));
      dispatch(getNotificationList({}));
      setFetching(statusView.SUCCESS);
    } catch (error) {
      setFetching(statusView.FAILED);
      console.log('Failed to create order at process #4', error);
    }
  };

  const paymentWithVnp = async (data) => {
    const { totalAmount } = data;
    if (!totalAmount) return;
    try {
      const paymentParams = { amount: totalAmount, bankCode: 'NCB' };
      const paymentResponse = await orderApi.paymentVnp(paymentParams);
      if (paymentResponse.result) {
        const redirectUrl = paymentResponse.result.paymentUrl;
        const {
          vnp_BankCode,
          vnp_OrderInfo,
          vnp_OrderType,
          vnp_ReturnUrl,
          vnp_SecureHash,
          vnp_TmnCode,
          vnp_TxnRef,
        } = serializeSearchParams(redirectUrl);
        const orderData = {
          paymentId: vnp_OrderInfo.split(' ')?.pop(),
          ...summaryOrderData,
          paymentData: {
            vnp_BankCode,
            vnp_OrderInfo,
            vnp_OrderType,
            vnp_ReturnUrl,
            vnp_SecureHash,
            vnp_TmnCode,
            vnp_TxnRef,
          },
        };
        dispatch(setOrderData(orderData));
        window.location.href = redirectUrl;
        // window.open(redirectUrl, '_blank');
      }
    } catch (error) {
      console.log('Failed to payment with VNPay', error);
    }
  };

  useEffect(() => {
    if (!canCreateOrder.current) return;
    if (paymentStatus === statusView.SUCCESS) {
      fetchCreateOrder();
    } else if (type === 'cod' && code === 0) {
      fetchCreateOrder();
    } else if (type === 'vn-pay' && code === 1) {
      const totalAmount = totalPrice + shippingFee - discountedPrice;
      paymentWithVnp({ totalAmount });
    }

    return () => {
      canCreateOrder.current = false;
    };
  }, []);

  return (
    <div className="flex justify-center">
      <StatusView
        type={fetching}
        className={'border-none'}
        disabled={fetching === statusView.PENDING ? true : false}
        to={'/shop'}
        title={
          fetching === statusView.PENDING
            ? 'Đang xử lý'
            : fetching === statusView.SUCCESS
            ? 'Đặt hàng thành công'
            : 'Đặt hàng thất bại'
        }
      />
    </div>
  );
};

CompleteOrder.propTypes = {
  summaryOrderData: PropTypes.object.isRequired,
};

export default CompleteOrder;
