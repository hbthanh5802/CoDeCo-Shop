import cartApi from '@/api/cartApi';
import { formatCurrency } from '@/utils/currency';
import React, { useEffect, useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';

const CartItem = ({
  data,
  cartItemList,
  setCartItemList,
  handleDeleteCartItem,
}) => {
  const {
    productName,
    materialName,
    colorName,
    sizeName,
    image,
    price,
    count,
    cartItemId,
    productDetailId,
    selected,
    percent,
  } = data;
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // const [quantity, setQuantity] = useState(count);

  const handleQuantityButtonClick = (action) => {
    let _cartItemList = [...cartItemList];
    const cartItemIndex = _cartItemList.findIndex(
      (cartItem) => cartItem?.cartItemId === cartItemId
    );
    if (cartItemIndex > -1) {
      let newQuantity = _cartItemList[cartItemIndex].count;
      if (action === 'add') {
        newQuantity = count + 1;
      } else if (action === 'minus' && count > 1) {
        newQuantity = count - 1;
      }
      const bodyData = { count: newQuantity };
      setLoading(true);
      cartApi
        .editCartItem(cartItemId, bodyData)
        .then((response) => {
          _cartItemList[cartItemIndex].count = newQuantity;
          toast.success('Thay đổi số lượng thành công', { autoClose: 1000 });
        })
        .catch((error) => {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
          console.log('Failed to change quantity in Cart Page', error);
        })
        .finally(() => {
          setLoading(false);
          setCartItemList(_cartItemList);
        });
    }
  };

  const handleDeleteButtonClick = () => {
    if (handleDeleteCartItem) {
      toast.promise(
        () => handleDeleteCartItem(cartItemId),
        {
          pending: 'Đang xử lý. Vui lòng chờ...',
          success: 'Sản phẩm đã được xoá khỏi giỏ hàng. 👌',
          error: 'Có lỗi xảy ra, vui lòng thử lại sau 🤯',
        },
        { autoClose: 1500 }
      );
    }
  };

  return (
    <div className="w-full duration-300 flex items-center gap-6 border-b border-b-[#e7e7e7] py-3 pb-6 pr-3 rounded-lg hover:bg-[#f7f7f7]/[.4]">
      <div className={`${image ? '' : 'skeleton'}`}>
        <img
          src={image}
          alt="Product Image"
          className="size-[160px] aspect-square object-contain border rounded"
        />
      </div>
      <div className="flex-1 cart-item__content">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-[20px]">{productName}</h2>
            <div className="flex items-center gap-2">
              <span>Màu sắc:</span>
              <span>{colorName}</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <span>Chất liệu:</span>
              <span className="font-medium">{materialName}</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <span>Kích thước:</span>
              <span className="font-medium">{sizeName}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Button */}
              <div className="inline-flex h-[52px] p-1 gap-4 items-center border border-[#ccc] hover:border-[#f7f7f7] rounded duration-300">
                <button
                  className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                  disabled={count <= 1 || loading}
                  onClick={() => handleQuantityButtonClick('minus')}
                >
                  <FiMinus />
                </button>
                <span className="text-[20px] font-medium px-[12px] min-w-[50px] flex justify-center items-center">
                  {count}
                </span>
                <button
                  className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                  disabled={loading}
                  onClick={() => handleQuantityButtonClick('add')}
                >
                  <GoPlus />
                </button>
              </div>

              <button
                className="duration-150 text-[18px] font-medium px-[24px] py-[8px] text-[--red-tag] rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200"
                onClick={handleDeleteButtonClick}
              >
                Loại bỏ
              </button>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <h2 className="font-semibold text-[20px]">
              {formatCurrency(
                (percent ? (price * (100 - percent)) / 100 : price) * count
              )}
            </h2>
            <span className="text-[18px]">VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
