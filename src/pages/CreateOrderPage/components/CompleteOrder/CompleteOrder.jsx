import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import StatusView from '@/components/StatusView';
import { toast } from 'react-toastify';
import { fakeApi } from '@/utils/url';
import { statusView } from '@/constants';
import orderApi from '@/api/orderApi';
import { useDispatch } from 'react-redux';
import { getCartItemList, getNotificationList } from '@/store/slices/shopSlice';

const CompleteOrder = ({ summaryOrderData }) => {
  if (!summaryOrderData) return <></>;
  const canCreateOrder = useRef(true);
  const { paymentMethod, note, address, voucher } = summaryOrderData;
  const { type, title, code } = paymentMethod;
  const { addressId } = address;
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (!canCreateOrder.current) return;
    if (type === 'cod' && code === 0) {
      fetchCreateOrder();
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
