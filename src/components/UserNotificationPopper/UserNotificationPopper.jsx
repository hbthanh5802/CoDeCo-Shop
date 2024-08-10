import React, { useId, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '@/components/Popper/PopperWrapper';
import NotificationItem from './NotificationItem';
import { toast } from 'react-toastify';
import notificationApi from '@/api/notificationApi';
import { useDispatch } from 'react-redux';
import { getNotificationList } from '@/store/slices/shopSlice';

const UserNotificationPopper = ({
  trigger = 'click',
  position = 'bottom-end',
  arrow = true,
  arrowPosition = 'top-right',
  children,
  items = [],
  onClick = () => {},
}) => {
  const dispatch = useDispatch();
  const notificationId = useId();
  const currentItemList = useMemo(() => {
    return items.map((item, index) => {
      const _item = Object.assign({}, item);
      _item.id = index;
      return _item;
    });
  }, [items]);

  const renderItems = () => {
    return currentItemList.map((item, index) => {
      return (
        <NotificationItem
          key={`${notificationId}-${index}`}
          data={item}
          onClick={onClick}
        />
      );
    });
  };

  const handleUpdateAll = async () => {
    toast.promise(notificationApi.updateAllUserNotification(), {
      pending: 'Đang xử lý 😴',
      success: {
        render() {
          dispatch(getNotificationList({ page: 1, pageSize: 99999 }));
          return 'Đã đánh dấu tất cả thông báo 👌';
        },
      },
      error: 'Có lỗi xảy ra. Vui lòng thử lại 😥',
    });
  };

  const handleRenderResult = (attrs) => (
    <div tabIndex="-1" {...attrs}>
      <PopperWrapper arrow={arrow} arrowPosition={arrowPosition}>
        <div className="flex w-full justify-end mb-2">
          <button
            className="duration-200 border min-w-[180px] px-[8px] py-[4px] rounded text-[14px] hover:font-medium hover:border-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white"
            onClick={handleUpdateAll}
          >
            Đánh dấu đã đọc tất cả
          </button>
        </div>
        <div className="flex flex-col gap-1">{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  if (items.length === 0) return <>{children}</>;
  return (
    <HeadlessTippy
      placement={position}
      interactive
      trigger={trigger}
      appendTo={document.body}
      render={handleRenderResult}
      onShow={() =>
        dispatch(getNotificationList({ params: { page: 1, pageSize: 99999 } }))
      }
    >
      {children}
    </HeadlessTippy>
  );
};

UserNotificationPopper.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  placement: PropTypes.string,
  trigger: PropTypes.string,
};

export default UserNotificationPopper;
