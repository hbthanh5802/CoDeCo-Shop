import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StatusView from '@/components/StatusView';
import { toast } from 'react-toastify';
import { fakeApi } from '@/utils/url';
import { statusView } from '@/constants';

const CompleteOrder = ({ summaryOrderData }) => {
  const { paymentMethod } = summaryOrderData;
  const { type, title, code } = paymentMethod;

  const [fetching, setFetching] = useState(statusView.PENDING);

  const fetchCreateOrder = async () => {
    try {
      const response = await fakeApi('success', 1500);
      setFetching(statusView.SUCCESS);
      toast.success('Đặt hàng thành công');
    } catch (error) {
      setFetching(statusView.FAILED);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại', { autoClose: 1500 });
    }
  };

  useEffect(() => {
    if (type === 'cod' && code === 0) {
      fetchCreateOrder();
    }
  }, []);

  return (
    <div className="flex justify-center">
      <StatusView
        type={fetching}
        className={'border-none'}
        disabled={fetching === statusView.PENDING ? true : false}
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
