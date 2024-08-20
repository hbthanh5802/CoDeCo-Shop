import Collapse from '@/components/Collapse';
import CustomRadio from '@/components/CustomRadio';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import UserAddress from './UserAddress';
import AddNewAddressForm from './AddNewAddressForm';
import { formatCurrency } from '@/utils/currency';
import UserVoucher from './UserVoucher';
import userApi from '@/api/userApi';
import { toast } from 'react-toastify';
import voucherApi from '@/api/voucherApi';
import { voucherStatus } from '@/constants';

const shippingMethod = [
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng tiết kiệm</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(50000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'Giao hàng tiết kiệm', price: 50000 },
  },
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng nhanh</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(100000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'Giao hàng nhanh', price: 100000 },
  },
  {
    label: (
      <div className="flex items-center gap-3 text-[16px]">
        <span className="font-medium">Giao hàng hoả tốc</span>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>{formatCurrency(200000)}</span>
          <span>VNĐ</span>
        </div>
      </div>
    ),
    value: { type: 'Giao hàng hoả tốc', price: 200000 },
  },
];

const AddressProcess = ({ handleSetSummaryOrderData, summaryOrderData }) => {
  const id = useId();
  const voucherRadioGroupRef = useRef(null);
  const [loading, setLoading] = useState({ address: false, voucher: false });
  const [addNewAddressShow, setAddNewAddressShow] = useState(false);
  const [userAddressList, setUserAddressList] = useState([]);

  const [userVoucherList, setUserVoucherList] = useState(
    Array.from({ length: 3 }).map((_, index) => ({
      voucherId: 'VoucherId' + index,
      title: 'Title' + index,
      discountPercent: Math.round(Math.random() * 50 + 1),
      minValueOrder: 5000000,
      maxValueDiscount: 500000,
      description: 'Description' + index,
    }))
  );

  const renderedAddressRadioItem = useMemo(() => {
    if (userAddressList?.length === 0) return [];
    return userAddressList?.map((userAddressItem, index) => ({
      label: <UserAddress data={userAddressItem} />,
      value: userAddressItem,
      defaultChecked: !!userAddressItem.isDefault,
    }));
  }, [userAddressList]);

  const renderedVoucherRadioItem = useMemo(() => {
    if (userVoucherList?.length === 0) return [];
    return userVoucherList?.map((voucherItem, index) => ({
      label: <UserVoucher data={voucherItem} />,
      value: voucherItem,
    }));
  }, [userVoucherList]);

  const handleAddressChange = (data) => {
    const { name, value } = data;
    handleSetSummaryOrderData({ [name]: value });
  };

  const handleAddNewAddress = (newAddressData) => {
    setAddNewAddressShow(false);
    setUserAddressList((prev) => [
      ...prev,
      {
        ...newAddressData,
        detail: newAddressData.detail + ' ' + (newAddressData.ward || ''),
      },
    ]);
  };

  const handleChooseShippingMethod = (data) => {
    const { name, value } = data;
    const { type, price } = value;
    handleSetSummaryOrderData({ [name]: price, shippingMethod: type });
  };

  const calculateDiscountPrice = (voucher) => {
    if (!voucher) return 0;
    if (voucher.minValueOrder > summaryOrderData.totalPrice) return 0;
    if (voucher.maxValueDiscount && voucher.discountPercent) {
      return summaryOrderData.totalPrice * (voucher.discountPercent / 100) <
        voucher.maxValueDiscount
        ? summaryOrderData.totalPrice * (voucher.discountPercent / 100)
        : voucher.maxValueDiscount;
    }
    return summaryOrderData.totalPrice * voucher.discountPercent;
  };

  const handleChooseVoucher = (data) => {
    const { name, value: voucherData } = data;
    let discountedPrice = calculateDiscountPrice(voucherData);
    if (voucherData) {
      voucherApi
        .checkVoucher({
          voucherId: voucherData.voucherId,
          totalMoney: summaryOrderData.totalPrice,
        })
        .then((response) => {
          if (response.result) discountedPrice = response.result;
          handleSetSummaryOrderData({ [name]: voucherData, discountedPrice });
          toast.success(
            `Áp dụng voucher thành công, đơn hàng của bạn được giảm ${formatCurrency(
              discountedPrice
            )} VNĐ 💐`,
            { autoClose: 1000 }
          );
        })
        .catch((error) => {
          console.log('Failed to check voucher in Create Order Page', error);
          toast.error('Voucher này không khả dụng với đơn hàng này 😥.', {
            autoClose: 1500,
          });
          if (voucherRadioGroupRef.current) {
            voucherRadioGroupRef.current?.handleReset();
          }
          discountedPrice = 0;
          handleSetSummaryOrderData({ discountedPrice });
        })
        .finally(() => {});
    } else {
      handleSetSummaryOrderData({ [name]: voucherData, discountedPrice });
    }
  };

  useEffect(() => {
    handleSetSummaryOrderData({
      shippingMethod: undefined,
      voucher: undefined,
    });
    setLoading((prev) => ({ ...prev, address: true, voucher: true }));
    userApi
      .getAllAddresses()
      .then((response) => {
        if (response && response.result && response.result.data) {
          setUserAddressList(response.result.data);
        }
      })
      .catch((error) => {
        console.log('Failed to get User Address in Create Order Page', error);
        toast.error(
          'Lấy thông tin địa chỉ không thành công. Vui lòng thử lại.',
          { autoClose: 1500 }
        );
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, address: false }));
      });
    voucherApi
      .getUserVouchers({ status: voucherStatus.UNUSED })
      .then((response) => {
        if (response && response.result && response.result.data) {
          setUserVoucherList(response.result.data);
        }
      })
      .catch((error) => {
        console.log('Failed to get User Voucher in Create Order Page', error);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, voucher: false }));
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse label="Địa chỉ nhận hàng">
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full flex flex-col gap-6">
              {loading.address ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={'address-' + id + index}
                    className="skeleton h-[100px] animate-fadeIn"
                  ></div>
                ))
              ) : (
                <CustomRadio
                  name="address"
                  items={renderedAddressRadioItem}
                  onChange={(data) => handleAddressChange(data)}
                  emptyContent={<p>Chưa có thông tin địa chỉ đã lưu!</p>}
                />
              )}
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-4 items-center">
                <p className="text-[14px]">
                  Hoặc <span className="font-semibold">Thêm địa chỉ mới</span>
                </p>
                <button
                  className="duration-200 px-[16px] py-[8px] text-[14px] border border-[#ccc] rounded hover:bg-[#f7f7f7] active:bg-[#e7e7e7] disabled:border-[#f7f7f7] disabled:bg-[#f7f7f7] disabled:text-[#ccc]"
                  disabled={addNewAddressShow}
                  onClick={() => setAddNewAddressShow(true)}
                >
                  Thêm địa chỉ
                </button>
              </div>
              {addNewAddressShow && (
                <div className="animate-fadeIn">
                  <AddNewAddressForm
                    onSubmit={(data) => handleAddNewAddress(data)}
                    onClose={() => setAddNewAddressShow(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </Collapse>
      </div>
      {/* Shipping Method */}
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse label="Hình thức vận chuyển">
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full">
              <CustomRadio
                name="shippingFee"
                color="#3AA39F"
                items={shippingMethod}
                onChange={(data) => handleChooseShippingMethod(data)}
              />
            </div>
          </div>
        </Collapse>
      </div>
      {/* Mã giảm giá */}
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse
          label={
            <span>
              Mã giảm giá{' '}
              <span className="text-[14px] text-[#3AA39F] font-normal">
                (Tuỳ chọn)
              </span>
            </span>
          }
        >
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full flex flex-col gap-6">
              {loading.voucher ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={'voucher-' + id + index}
                    className="skeleton h-[40px] animate-fadeIn"
                  ></div>
                ))
              ) : (
                <CustomRadio
                  ref={voucherRadioGroupRef}
                  name="voucher"
                  color="#3AA39F"
                  items={renderedVoucherRadioItem}
                  allowReset={true}
                  onChange={(data) => handleChooseVoucher(data)}
                  emptyContent={<p>Bạn chưa thu thập mã giảm giá nào!</p>}
                />
              )}
            </div>
            <div className="w-full"></div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default AddressProcess;
