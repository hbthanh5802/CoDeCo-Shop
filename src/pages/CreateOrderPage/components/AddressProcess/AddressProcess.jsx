import Collapse from '@/components/Collapse';
import CustomRadio from '@/components/CustomRadio';
import React, { useMemo, useState } from 'react';
import UserAddress from './UserAddress';
import AddNewAddressForm from './AddNewAddressForm';
import { formatCurrency } from '@/utils/currency';
import UserVoucher from './UserVoucher';

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
    value: { type: 'normal', price: 50000 },
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
    value: { type: 'fast', price: 100000 },
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
    value: { type: 'extra', price: 200000 },
  },
];

const AddressProcess = ({ handleSetSummaryOrderData, summaryOrderData }) => {
  const [addNewAddressShow, setAddNewAddressShow] = useState(false);
  const [userAddressList, setUserAddressList] = useState(
    Array.from({ length: 3 }).map((_, index) => ({
      userAddressId: 'userAddressId' + index,
      user_id: 'user_id',
      nation: 'nation' + index,
      province: 'province' + index,
      district: 'district' + index,
      detail: 'detail' + index,
      phoneReceiver: 'phoneReceiver' + index,
      nameReceiver: 'nameReceiver' + index,
      isDefault: index === 0,
    }))
  );
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
      defaultChecked: userAddressItem.isDefault,
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
    // console.log('Add New', newAddressData);
    setUserAddressList((prev) => [
      ...prev,
      {
        ...newAddressData,
        detail: newAddressData.detail + ' ' + newAddressData.ward,
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
    if (voucher.maxValueDiscount && voucher.discountPercent)
      return summaryOrderData.totalPrice * (voucher.discountPercent / 100) <
        voucher.maxValueDiscount
        ? summaryOrderData.totalPrice * (voucher.discountPercent / 100)
        : voucher.maxValueDiscount;
    return summaryOrderData.totalPrice * voucher.discountPercent;
  };

  const handleChooseVoucher = (data) => {
    const { name, value } = data;
    const discountedPrice = calculateDiscountPrice(value);
    handleSetSummaryOrderData({ [name]: value, discountedPrice });
  };

  return (
    <div className="flex flex-col">
      <div className="duration-200 border border-[#f7f7f7] rounded hover:border-[#e7e7e7] mb-[24px]">
        <Collapse label="Địa chỉ nhận hàng">
          <div className="flex flex-col gap-[24px] my-[24px]">
            <div className="w-full">
              <CustomRadio
                name="address"
                items={renderedAddressRadioItem}
                onChange={(data) => handleAddressChange(data)}
              />
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
            <div className="w-full">
              <CustomRadio
                name="voucher"
                color="#3AA39F"
                items={renderedVoucherRadioItem}
                allowReset={true}
                onChange={(data) => handleChooseVoucher(data)}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default AddressProcess;
