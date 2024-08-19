import Collapse from '@/components/Collapse';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsChatDots, BsCreditCard, BsXLg } from 'react-icons/bs';
import { TbCoin } from 'react-icons/tb';

import { CheckboxGroup } from '@/components/CustomCheckbox';
import CartItem from './components/CartItem';
import images from '@/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'react-toastify';
import cartApi from '@/api/cartApi';
import { useDispatch } from 'react-redux';
import { getCartItemList } from '@/store/slices/shopSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const navigate = useNavigate();
  const cartCheckboxListRef = useRef(null);
  const [cartItemList, setCartItemList] = useState([]);
  const [checkedCartItemList, setCheckedCartItemList] = useState([]);

  const summaryResult = useMemo(() => {
    let result = {
      items: [],
      totalPrice: 0,
      discountedPrice: 0,
      paymentMethod: undefined,
      shippingFee: 0,
    };

    if (checkedCartItemList?.length) {
      const summaryCartItemList = cartItemList?.filter((cartItem) =>
        checkedCartItemList?.includes(cartItem.cartItemId)
      );
      result.items = summaryCartItemList;
      result.totalPrice = summaryCartItemList?.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.count,
        0
      );
    }
    return result;
  }, [checkedCartItemList, cartItemList]);

  const handleChooseCartItem = (data) => {
    const { name, groupValues } = data;
    setCheckedCartItemList(groupValues);
  };

  const handleDeleteCartItem = async (cart_item_id) => {
    try {
      await cartApi.removeOne(cart_item_id).then(() => {
        let _cartItemList = [...cartItemList].filter(
          (cartItem) => cartItem.cartItemId !== cart_item_id
        );
        let _checkedCartItemList = [...checkedCartItemList].filter(
          (checkedCartItem) => checkedCartItem !== cart_item_id
        );

        setCartItemList([..._cartItemList]);
        setCheckedCartItemList([..._checkedCartItemList]);
      });
    } catch (error) {
      throw error;
    }
  };

  const renderedCartItemList = useMemo(() => {
    if (cartItemList && cartItemList.length) {
      return cartItemList.map((cartItem, index) => ({
        index: index,
        label: (
          <CartItem
            data={cartItem}
            cartItemList={cartItemList}
            setCartItemList={setCartItemList}
            handleDeleteCartItem={(cartItemId) =>
              handleDeleteCartItem(cartItemId)
            }
          />
        ),
        value: cartItem.cartItemId,
      }));
    }
    return undefined;
  }, [cartItemList]);

  const handleCreateOrder = () => {
    setCreateOrderLoading(true);
    const data = { orderInformation: summaryResult };
    const selectCartItemPromises = checkedCartItemList.map((carItemId) =>
      cartApi.selectOne(carItemId)
    );
    Promise.all(selectCartItemPromises)
      .then((results) => {
        console.log(results);
        navigate('/shop/create-order', {
          state: data,
        });
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
      })
      .finally(() => {
        setCreateOrderLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    cartApi
      .getUserCart()
      .then((response) => {
        if (response?.result?.cartItemResponses)
          setCartItemList(response?.result?.cartItemResponses);
      })
      .catch((error) => {
        console.log('Failed to get Cart List in Cart Page', error);
      })
      .finally(() => {
        dispatch(getCartItemList());
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full mt-[60px]">
      <h1 className="font-semibold text-[32px]">Giỏ hàng</h1>

      <div className="w-full flex gap-6 mt-[48px]">
        {cartItemList?.length ? (
          <>
            <div className="w-2/3">
              <Collapse label="Sản phẩm" className="font-semibold">
                <div className="my-[24px] font-normal">
                  <CheckboxGroup
                    ref={cartCheckboxListRef}
                    items={renderedCartItemList}
                    name="cartItemList"
                    checkboxSize={22}
                    onChange={(data) => handleChooseCartItem(data)}
                  />
                </div>
              </Collapse>
            </div>
            <div className="w-1/3 bg-white rounded p-[32px] flex flex-col gap-[32px] border border-[#e7e7e7] h-fit">
              <h2 className="font-semibold text-[24px]">Thông tin</h2>
              <div className="w-full flex flex-col gap-[24px]">
                {/* Total price */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-base">Tổng giá:</span>
                  <span className="text-base font-semibold">
                    {formatCurrency(summaryResult.totalPrice)}
                  </span>
                </div>
                {/* Unit */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-base">Đơn vị:</span>
                  <span className="text-base font-semibold">VNĐ</span>
                </div>
              </div>
              {/* Separate */}
              <span className="w-full border-b"></span>
              <div className="w-full flex flex-col gap-[24px]">
                {/* Total price */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-base">Tạm tính:</span>
                  <span className="text-base font-semibold">
                    {formatCurrency(
                      summaryResult.totalPrice +
                        summaryResult.shippingFee -
                        summaryResult.discountedPrice
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-[24px]">
                <button
                  className="duration-200 flex justify-center items-center px-[40px] py-[18px] bg-[var(--color-primary)] min-h-[60px] text-white rounded hover:brightness-105 disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                  onClick={handleCreateOrder}
                  disabled={!summaryResult.items.length || createOrderLoading}
                >
                  {createOrderLoading ? (
                    <Spinner size={18} color="black" />
                  ) : (
                    'Tiến hành tạo đơn'
                  )}
                </button>
                <Link
                  to={'/shop'}
                  className="flex justify-center items-center bg-white rounded hover:brightness-105"
                >
                  Quay lai
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-[24px]">
            {loading ? (
              <>
                <Spinner size={24} color="text-black" />
                <p className="font-normal text-[16px]]">
                  Đang lấy dữ liệu giỏ hàng của bạn. Vui lòng chờ...
                </p>
              </>
            ) : (
              <>
                <img
                  src={images.empty}
                  alt="Empty Images"
                  className="w-[60px] fill-slate-100"
                />
                <p className="font-normal text-[16px]]">
                  Giỏ hàng của bạn trống. Hãy đi mua sắm nào!
                </p>
                <Link
                  to={'/shop'}
                  className="px-[24px] py-[12px] bg-[var(--color-primary)] text-white rounded-lg shadow-lg hover:brightness-105 duration-150 animate__animated animate__rubberBand animate__repeat-2"
                >
                  Go Shopping
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Services */}
      <div className="flex flex-wrap justify-between gap-[48px] my-[48px] mt-[120px]">
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
    </div>
  );
};

export default CartPage;
