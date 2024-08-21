import voucherApi from '@/api/voucherApi';
import images from '@/assets/images';
import VoucherCard from '@/components/VoucherCard';
import { setPreviousHistory } from '@/store/slices/historySlice';
import { getVoucherList } from '@/store/slices/shopSlice';
import React, { useEffect, useId, useState } from 'react';
import { BsChatDots, BsCreditCard } from 'react-icons/bs';
import { TbCoin } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const VoucherPage = () => {
  const voucherId = useId();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  const { voucherList } = useSelector((state) => state.shop);
  const [userVoucherIdList, setUserVoucherIdList] = useState([]);

  useEffect(() => {
    dispatch(setPreviousHistory(pathname + search));
    dispatch(getVoucherList({}));
    if (currentUser) {
      voucherApi
        .getUserVouchers()
        .then((response) => {
          if (response?.result?.data) {
            setUserVoucherIdList(
              response.result.data?.map((voucherItem) => voucherItem.voucherId)
            );
          }
        })
        .catch((error) => {
          console.log('Failed to get user voucher in Shop Page', error);
        });
    }
  }, [currentUser]);

  return (
    <div className="Shop-wrapper">
      {/*  Voucher Section */}
      <div className="Shop-vouchers">
        <div
          className={`flex flex-col items-center p-[60px] px-[var(--spacing-padding-container)]`}
        >
          <p className="text-center mb-[34px] text-[42px] font-bold">
            Kho Mã Giảm Giá
          </p>

          <div className="w-full">
            <div className="w-full bg-white grid grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1 xl:grid-cols-2 xl:grid-rows-2 gap-[24px]">
              {voucherList.map((voucherItem, index) => {
                return (
                  <VoucherCard
                    isTaken={userVoucherIdList.includes(voucherItem.voucherId)}
                    key={voucherId + '' + index}
                    data={voucherItem}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contact email */}
      <div className="px-[var(--spacing-padding-container)] flex flex-wrap justify-between gap-[48px] my-[48px]">
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

      <div
        style={{
          background: `url(${images.sendEmailBg}) no-repeat center center`,
          backgroundSize: 'fit',
        }}
        className="h-[300px] px-[80px] flex items-center justify-stretch mt-[120px] md:mt-0"
      >
        <div className="bg-white p-[60px] w-full flex flex-col lg:flex-row justify-center lg:justify-between lg:items-center gap-[60px] shadow-custom2 rounded-lg">
          <h1 className="w-full lg:w-1/2 block font-semibold text-[34px]">
            Đăng ký để nhận tin tức mới nhất
          </h1>
          <form
            action="#"
            className="w-full p-[8px] px-[16px] flex flex-col md:flex-row md:items-center md:justify-between gap-6 border has-[input:focus]:border-[#333] duration-150 rounded"
          >
            <input
              type="text"
              placeholder="Nhập Email của bạn..."
              className="outline-none flex-1 text-[16px] bg-transparent p-[8px]"
            />

            <button className="px-[42px] py-[10px] bg-black text-white rounded-sm md:ml-2 hover:bg-[var(--color-primary)] duration-100">
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
