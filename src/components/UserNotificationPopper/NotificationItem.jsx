import { getTimeAgo } from '@/utils/time';
import React from 'react';

const NotificationItem = ({ data, onClick = () => {} }) => {
  const {
    title,
    notificationId,
    content,
    userId,
    notificationType,
    seen,
    createdAt,
  } = data;

  const handleClick = () => {
    onClick(data);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col duration-200 gap-2 p-[12px] bg-[#f7f7f7] border border-transparent hover:bg-[#e7e7e7] rounded w-[500px] ${
        seen ? 'bg-[#f7f7f7]' : 'bg-[#e7e7e7]'
      } cursor-pointer select-none`}
    >
      <div className="flex">
        <div className="flex-1">
          <div className="flex flex-wrap items-center">
            <h1 className="font-semibold text-[15px] mr-2">
              {title || 'Thông báo'}
            </h1>
          </div>
          <p className="line-clamp-2 text-[14px] text-slate-600">
            {content || 'Đây là thông báo ngẫu nhiên.'}
          </p>
        </div>
        <div className="w-fit flex justify-end pl-1">
          {!seen && (
            <div className="relative flex justify-end">
              <span className="inline-block size-[8px] bg-[var(--color-primary)] rounded-full animate-ping delay-200"></span>
              <span className="absolute inline-block size-[8px] bg-[var(--color-primary)] rounded-full"></span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <span
          className={`${
            seen ? 'text-slate-400' : 'text-slate-600'
          } text-[12px]`}
        >
          {getTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
