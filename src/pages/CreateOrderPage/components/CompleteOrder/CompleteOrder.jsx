import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StatusView from '@/components/StatusView';
import { toast } from 'react-toastify';
import { fakeApi } from '@/utils/url';

const CompleteOrder = ({ summaryOrderData }) => {
  const { paymentMethod } = summaryOrderData;
  const { type, title, code } = paymentMethod;

  console.log(paymentMethod);

  const [fetching, setFetching] = useState('pending');

  const fetchCreateOrder = async () => {
    try {
      const response = await fakeApi('failed', 1500);
      setFetching('success');
      toast.success('Đặt hàng thành công');
    } catch (error) {
      setFetching('failed');
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
        disabled={fetching === 'pending' ? true : false}
        title={
          fetching === 'pending'
            ? 'Đang xử lý'
            : fetching === 'success'
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
