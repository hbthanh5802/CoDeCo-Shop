import images from '@/assets/images';
import React, { useEffect, useMemo, useState } from 'react';
import Timer from '../Timer';

import { BiInfoCircle } from 'react-icons/bi';
import { hexToRgb } from '@/utils/colorConverter';
import { isDateTimeExpired } from '@/utils/time';
import voucherApi from '@/api/voucherApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import Tippy from '@tippyjs/react';
import { formatCurrency } from '@/utils/currency';
import { randomImages } from '@/constants';

const VoucherCard = ({ data = {}, isTaken = false }) => {
  const {
    voucherId,
    code,
    title,
    discountPercent,
    minValueOrder,
    maxValueDiscount,
    quantity,
    description,
    startDate,
    endDate,
  } = data;
  const [taken, setTaken] = useState(isTaken);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [isTimeExpired, setIsTimeExpired] = useState(true);

  const handleGetVoucherClick = () => {
    if (!currentUser) {
      toast.info('Vui lòng ĐĂNG NHẬP để tiếp tục thao tác', {
        autoClose: 1500,
      });
      return;
    }
    if (!taken && isTimeExpired !== true) {
      const data = { userId: currentUser.id, voucherId, code };
      setLoading(true);
      voucherApi
        .addUser(data)
        .then((response) => {
          toast.success('Lấy mã giảm thành công', { autoClose: 1000 });
          setTaken(true);
        })
        .catch((error) => {
          toast.error('Có lỗi xảy ra. Vui lòng thử lại sau', {
            autoClose: 1000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.info('Voucher không khả dụng', { autoClose: 1000 });
    }
  };

  useEffect(() => {
    setIsTimeExpired(isDateTimeExpired(endDate));
    setTaken(isTaken);
  }, [endDate, isTaken]);

  return (
    <div className="h-fit bg-white border border-[#ccc] flex flex-col items-stretch xl:flex-row gap-[24px] xl:items-stretch justify-between">
      <div className="flex flex-col items-start gap-6 xl:flex-row xl:items-center p-[24px]">
        <img
          src={randomImages[Math.floor(Math.random() * randomImages.length)]}
          alt="Voucher Background"
          className="w-full h-auto xl:size-[140px] aspect-square animate-fadeIn"
        />
        <div className="flex flex-col space-y-[8px]">
          <h2 className="capitalize text-[18px] font-medium line-clamp-1">
            {title || 'Mã giảm'}
          </h2>
          <h1 className="font font-semibold text-[24px]">
            Giảm
            <span className="ml-1 text-[--red-tag]">
              {discountPercent + '%'}
            </span>
          </h1>
          <div>
            {isTimeExpired === true ? (
              <p className="text-[12px] xl:text-[14px] p-[4px] border text-center rounded border-[var(--color-primary)] text-[var(--color-primary)] font-medium">
                ĐÃ HẾT HẠN
              </p>
            ) : (
              <Timer
                className="text-[12px] xl:text-[14px]"
                vertical={true}
                separate={true}
                day={isTimeExpired.days}
                hour={isTimeExpired.remainingHours}
                minute={isTimeExpired.remainingMinutes}
                second={isTimeExpired.remainingSeconds}
                spaceBetween={2}
                dayLabel="NGÀY"
                hourLabel="GIỜ"
                minuteLabel="PHÚT"
                secondLabel="GIÂY"
                onEnd={() => setIsTimeExpired(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="relative border border-dashed border-[#ccc]">
        <span className="dot-1 absolute -rotate-90 left-[-6px] -translate-y-1/2 xl:-translate-y-0 xl:left-0 xl:top-[-7px] xl:-translate-x-1/2 z-10 xl:rotate-3 inline-block size-[30px] bg-white rounded-full border-[1px] border-dashed border-[#ccc] border-t-transparent"></span>
        <span className="dot-2 absolute rotate-90 right-[-6px] -translate-y-1/2 xl:-translate-y-0 xl:left-0 xl:bottom-[-7px] xl:-translate-x-1/2 z-10 xl:rotate-180 inline-block size-[30px] bg-white rounded-full border-[1px] border-dashed border-[#ccc] border-t-transparent"></span>
      </div>
      {/* Right Side */}
      <div className="flex flex-col gap-6 p-[24px] xl:pl-0">
        <div className="group flex gap-2 items-center cursor-pointer duration-150">
          <h2 className="text-[18px] font-medium">Thông tin</h2>
          <Tippy
            theme="light"
            content={`Mã giảm áp dụng cho toàn bộ đơn hàng ${
              minValueOrder
                ? 'có giá trị tối thiểu ' +
                  formatCurrency(minValueOrder) +
                  ' VNĐ'
                : ''
            } ${
              maxValueDiscount
                ? '. Giảm tối đa ' + formatCurrency(maxValueDiscount) + ' VNĐ'
                : ''
            }`}
          >
            <span>
              <BiInfoCircle className="group-hover:text-[#008080]" />
            </span>
          </Tippy>
        </div>
        <button
          className={`uppercase flex items-center justify-center md:min-w-fit lg:min-w-[150px] md:min-h-[55px] gap-2 px-[24px] py-[12px] text-[18px] text-[#008080] font-medium border-[2px] border-dashed border-[#008080] bg-[#008080]/[.05] hover:bg-[#008080]/[0.2] duration-150 disabled:cursor-not-allowed disabled:border-[#ccc] disabled:text-[#ccc] disabled:bg-[#f7f7f7] active:bg-[#008080]/[.05]`}
          onClick={handleGetVoucherClick}
          disabled={taken || isTimeExpired === true}
        >
          {loading ? (
            <Spinner color="#008080" size={18} />
          ) : (
            <span>{taken ? 'Đã LẤY' : 'LẤY NGAY'}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoucherCard;
