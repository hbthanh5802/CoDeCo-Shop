import images from '@/assets/images';
import React, { useMemo, useState } from 'react';
import Timer from '../Timer';

import { BiInfoCircle } from 'react-icons/bi';
import { hexToRgb } from '@/utils/colorConverter';
import { isDateTimeExpired } from '@/utils/time';
import voucherApi from '@/api/voucherApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import Tippy from '@tippyjs/react';

const VoucherCard = ({ data = {} }) => {
  const { voucherId, value, minTotal, startDate, endDate, name, description } =
    data;
  const [taken, setTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const timeRemain = useMemo(
    () => isDateTimeExpired('2024-07-28T15:45:00'),
    ['2024-07-28T15:45:00']
  );

  const handleGetVoucherClick = () => {
    if (currentUser && !taken) {
      const data = { userId: currentUser.id, voucherId };
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
      toast.info('Vui lòng ĐĂNG NHẬP để tiếp tục thao tác', {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="h-fit bg-white border border-[#ccc] flex flex-col items-stretch xl:flex-row gap-[24px] xl:items-stretch justify-between">
      <div className="flex flex-col items-start gap-6 xl:flex-row xl:items-center p-[24px]">
        <img
          src={images.voucherBg1}
          alt="Voucher Background"
          className="w-full h-auto xl:size-[140px]"
        />
        <div className="flex flex-col space-y-[8px]">
          <h2 className="capitalize text-[18px] font-medium">
            {name || 'Mã giảm'}
          </h2>
          <h1 className="font font-semibold text-[24px]">
            Giảm
            <span className="ml-1 text-[--red-tag]">
              {12 <= 100 ? 12 + '%' : 12 + ' VNĐ'}
            </span>
          </h1>
          <div>
            <Timer
              className="text-[12px] xl:text-[14px]"
              vertical={true}
              separate={true}
              day={timeRemain.days}
              hour={timeRemain.remainingHours}
              minute={timeRemain.remainingMinutes}
              second={timeRemain.remainingSeconds}
              spaceBetween={2}
              dayLabel="NGÀY"
              hourLabel="GIỜ"
              minuteLabel="PHÚT"
              secondLabel="GIÂY"
            />
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
            content={
              description ||
              '*Mã phiếu giảm giá này sẽ áp dụng cho các sản phẩm khi bạn mua sắm trên 6.000.000 VNĐ.'
            }
          >
            <span>
              <BiInfoCircle className="group-hover:text-[#008080]" />
            </span>
          </Tippy>
        </div>
        <button
          className={`uppercase flex items-center justify-center md:min-w-[150px] md:min-h-[55px] gap-2 px-[24px] py-[12px] text-[18px] text-[#008080] font-medium border-[2px] border-dashed border-[#008080] bg-[#008080]/[.05] hover:bg-[#008080]/[0.2] duration-150 disabled:cursor-not-allowed disabled:hover:bg-[#008080]/[.05]`}
          onClick={handleGetVoucherClick}
          disabled={taken}
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
