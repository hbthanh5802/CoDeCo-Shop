import { formatCurrency } from '@/utils/currency';
import React, { useEffect, useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';

const CartItem = ({ data, setCartItemList, handleDeleteCartItem }) => {
  const {
    name,
    size,
    color,
    material,
    productImageUrl,
    price,
    count,
    cart_item_id,
  } = data;
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // const [quantity, setQuantity] = useState(count);

  const handleQuantityButtonClick = (action) => {
    setCartItemList((prev) => {
      let _cartItemList = [...prev];
      const cartItemIndex = _cartItemList.findIndex(
        (cartItem) => cartItem?.cart_item_id === cart_item_id
      );

      if (cartItemIndex > -1) {
        if (action === 'add') {
          _cartItemList[cartItemIndex].count = count + 1;
        } else if (action === 'minus' && count > 1) {
          _cartItemList[cartItemIndex].count = count - 1;
        }
        return _cartItemList;
      }
    });
  };

  const handleDeleteButtonClick = () => {
    if (handleDeleteCartItem) {
      // setDeleteLoading(true);
      // handleDeleteCartItem(cart_item_id).then((cart) => {
      //   console.log('THANH CONG');
      // });
      toast.promise(
        () => handleDeleteCartItem(cart_item_id),
        {
          pending: 'Đang xử lý. Vui lòng chờ...',
          success: 'Sản phẩ đã được xoá khỏi giỏ hàng. 👌',
          error: 'Có lỗi xảy ra, vui lòng thử lại sau 🤯',
        },
        { autoClose: 1500 }
      );
    }
  };

  return (
    <div className="w-full duration-300 flex items-center gap-6 border-b border-b-[#e7e7e7] py-3 pb-6 pr-3 rounded-lg hover:bg-[#f7f7f7]/[.4]">
      <img
        src={productImageUrl}
        alt="Product Image"
        className="size-[160px] aspect-square object-contain"
      />
      <div className="flex-1 cart-item__content">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-[20px]">{name}</h2>
            <div className="flex items-center gap-2">
              <span>Màu sắc:</span>
              <span>{color}</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <span>Chất liệu:</span>
              <span className="font-medium">{material}</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <span>Kích thước:</span>
              <span className="font-medium">{size}</span>
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
              {formatCurrency(price * count)}
            </h2>
            <span className="text-[18px]">VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
