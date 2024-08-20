import React, { useEffect, useMemo, useRef, useState } from 'react';

import RateStar from '@/components/RateStar';
import { formatCurrency } from '@/utils/currency';
import { fakeApi } from '@/utils/url';
import Spinner from '@/components/Spinner';

import { GoPlus } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import {
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoInstagram,
} from 'react-icons/io5';
import CategoryRadio from '@/pages/ProductPage/components/CategoryRadio';
import { hexToRgb } from '@/utils/colorConverter';
import productApi from '@/api/productApi';
import cartApi from '@/api/cartApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getCartItemList } from '@/store/slices/shopSlice';
import { addToHistoryCart } from '@/store/slices/historySlice';

const ProductDetail = ({
  productDetailData,
  productSizes,
  productMaterials,
  productColors,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [chosenProductDetailData, setChosenProductDetailData] = useState({
    totalQuantity: 0,
    price: null,
    productDetailId: null,
  });
  const productCategoriesRadioGroupRefs = useRef([]);
  const [colorList, setColorList] = useState(productColors);
  const [sizeList, setSizeList] = useState(productSizes);
  const [materialList, setMaterialList] = useState(productMaterials);
  const [categoryProductChosen, setCategoryProductChosen] = useState({
    colorId: '',
    materialId: '',
    sizeId: '',
  });

  const {
    productId,
    name: productName,
    description: productDesc,
    enable,
    categoryId,
    percent,
    minPrice,
    maxPrice,
    averageRating,
    createdAt,
    updateAt,
  } = productDetailData;

  const isCategoryProductChosenValid = Object.values(
    categoryProductChosen
  ).every((value) => !!value || value === 0);

  const isCanAddToCart = Object.values(chosenProductDetailData).every(
    (value) => !!value || value === 0
  );

  const renderedColorList = useMemo(() => {
    return colorList.map((colorItem, index) => {
      const { name, colorId, colorCode, disabled } = colorItem;
      return {
        label: (
          <div className="flex items-center gap-2">
            {' '}
            <span
              style={{
                backgroundColor: `rgba(${hexToRgb(
                  colorCode,
                  'string',
                  ','
                )}, 0.25)`,
              }}
              className="inline-flex items-center justify-center size-[18px] rounded-full"
            >
              <span
                style={{ backgroundColor: colorCode }}
                className="inline-block size-[14px] rounded-full"
              ></span>
            </span>
            {name}
          </div>
        ),
        value: colorId,
        disabled,
      };
    });
  }, [colorList]);

  const renderedSizeList = useMemo(() => {
    return sizeList.map((sizeItem, index) => {
      const { name, sizeId, disabled } = sizeItem;
      return {
        label: name,
        value: sizeId,
        disabled,
      };
    });
  }, [sizeList]);

  const renderedMaterialList = useMemo(() => {
    return materialList.map((materialItem, index) => {
      const { name, materialId, disabled } = materialItem;
      return {
        label: name,
        value: materialId,
        disabled,
      };
    });
  }, [colorList]);

  const handleQuantityButtonClick = (action) => {
    if (action === 'add' && quantity < chosenProductDetailData.totalQuantity) {
      setQuantity((prev) => prev + 1);
    } else if (action === 'minus' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCategoryRadioChange = (data) => {
    const { name, value } = data;
    setCategoryProductChosen((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    if (!isCanAddToCart) {
      toast.warning('Có lỗi xảy ra, vui lòng thử lại.', { autoClose: 1500 });
      return;
    }
    setLoading(true);
    cartApi
      .addToCart({
        productDetailId: chosenProductDetailData.productDetailId,
        count: quantity,
      })
      .then((response) => {
        toast.success('Thêm vào giỏ hàng thành công', { autoClose: 1000 });
        dispatch(getCartItemList());
        dispatch(
          addToHistoryCart({
            productId,
            productDetailId: chosenProductDetailData.productDetailId,
            categoryId,
            percent,
            minPrice,
            maxPrice,
          })
        );
      })
      .catch((error) => {
        console.log('Failed to add to Cart', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (productCategoriesRadioGroupRefs.current) {
      productCategoriesRadioGroupRefs.current.forEach((categoryRadioGroup) =>
        categoryRadioGroup?.handleReset()
      );
    }
    setChosenProductDetailData({
      totalQuantity: 0,
      price: null,
      productDetailId: null,
    });
    setCategoryProductChosen({
      colorId: '',
      materialId: '',
      sizeId: '',
    });
    setColorList(productColors);
    setMaterialList(productMaterials);
    setSizeList(productSizes);
  }, [productColors, productMaterials, productSizes]);

  useEffect(() => {
    if (!isCategoryProductChosenValid || !productId) return;
    setLoading(true);
    setQuantity(0);
    const dataBody = { productId, ...categoryProductChosen };
    productApi
      .getProductFilter(dataBody)
      .then((response) => {
        if (response && response.result) {
          const { price, productDetailId, totalQuantity } = response.result;
          if (!totalQuantity)
            toast.info(
              'Loại hàng này hiện tại đang hết. Rất mong quý khách thông cảm',
              { autoClose: 1000 }
            );
          setChosenProductDetailData({
            price: percent ? price * ((100 - percent) / 100) : price,
            productDetailId,
            totalQuantity,
          });
        }
      })
      .catch((error) => {
        console.log('Failed to get Total Stock in Product Detail', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryProductChosen]);

  return (
    <>
      <div className="Product-detail flex flex-col gap-[12px]">
        <h1 className="Product-detail__name text-[44px] font-semibold">
          {productName}
        </h1>

        <div className="Product-detail__rating flex gap-2">
          <RateStar rating={averageRating || 5} maxStar={5} spacing={2} />
          <span>{`${averageRating || 5} / 5.0`}</span>
          <span className="text-[#ccc]">{`(${12})`}</span>
        </div>

        <div className="Product-detail__price mb-[48px]">
          {chosenProductDetailData.price ? (
            <div className="flex gap-2 items-baseline text-[32px] font-semibold">
              <div className="flex items-baseline gap-1">
                <h3>{formatCurrency(chosenProductDetailData.price)}</h3>
                <span className="text-[24px]">VNĐ</span>
              </div>
            </div>
          ) : (
            <>
              {percent && (
                <div className="text-black/30 flex gap-2 items-baseline line-through text-[24px] font-light">
                  <div className="flex items-baseline gap-1">
                    <h3>{formatCurrency(minPrice)}</h3>
                  </div>
                  <span>-</span>
                  <div className="flex items-baseline gap-1">
                    <h3>{formatCurrency(maxPrice)}</h3>
                    <span className="text-[18px]">VNĐ</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-6">
                <div className="flex gap-2 items-baseline text-[32px] font-semibold">
                  <div className="flex items-baseline gap-1">
                    <h3>
                      {formatCurrency(
                        percent ? minPrice * ((100 - percent) / 100) : minPrice
                      )}
                    </h3>
                  </div>
                  <span>-</span>
                  <div className="flex items-baseline gap-1 text-[32px] font-semibold">
                    <h3>
                      {formatCurrency(
                        percent ? maxPrice * ((100 - percent) / 100) : maxPrice
                      )}
                    </h3>
                    <span className="font-medium text-[24px]">VNĐ</span>
                  </div>
                </div>
                {percent && (
                  <span className="px-[18px] py-[4px] bg-[var(--red-tag)] rounded-[4px] text-white text-[16px] font-semibold">
                    {`${percent}% off`}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        {/* Category */}
        <div className="Product-detail__category flex flex-col gap-6 mb-[48px]">
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Màu sắc:</h4>
            <div>
              <CategoryRadio
                ref={(el) =>
                  (productCategoriesRadioGroupRefs.current[
                    productCategoriesRadioGroupRefs.current.length++
                  ] = el)
                }
                items={renderedColorList}
                name="colorId"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Chất liệu:</h4>
            <div>
              <CategoryRadio
                ref={(el) =>
                  (productCategoriesRadioGroupRefs.current[
                    productCategoriesRadioGroupRefs.current.length++
                  ] = el)
                }
                items={renderedMaterialList}
                name="materialId"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <h4 className="min-w-[100px]">Kích thước:</h4>
            <div>
              <CategoryRadio
                ref={(el) =>
                  (productCategoriesRadioGroupRefs.current[
                    productCategoriesRadioGroupRefs.current.length++
                  ] = el)
                }
                items={renderedSizeList}
                name="sizeId"
                onChange={(data) => handleCategoryRadioChange(data)}
                className="flex flex-wrap gap-3"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col gap-3">
          <span>
            Số lượng sản phẩm:{' '}
            <span
              className={`relative font-semibold text-[18px] ${
                chosenProductDetailData.totalQuantity ? 'text-[#3aa39f]' : ''
              }`}
            >
              {chosenProductDetailData.totalQuantity}
            </span>
          </span>
          <div className="flex items-center gap-6">
            {/* Quantity Button */}
            <div className="inline-flex h-[52px] p-1 gap-4 items-center border border-[#ccc] hover:border-[#f7f7f7] rounded duration-300">
              <button
                className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                disabled={quantity <= 1 || loading}
                onClick={() => handleQuantityButtonClick('minus')}
              >
                <FiMinus />
              </button>
              <span className="text-[20px] font-medium px-[12px] min-w-[50px] flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="text-[20px] p-[12px] hover:text-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white hover:bg-[#f7f7f7] duration-300 rounded-sm disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
                disabled={
                  loading || quantity >= chosenProductDetailData.totalQuantity
                }
                onClick={() => handleQuantityButtonClick('add')}
              >
                <GoPlus />
              </button>
            </div>
            {/* Add to Cart */}
            <button
              className="capitalize min-w-[190px] min-h-[52px] py-[14px] px-[40px] bg-[var(--color-primary)] text-white rounded hover:brightness-105 active:brightness-100 disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150"
              disabled={!isCategoryProductChosenValid || quantity <= 0}
              onClick={handleAddToCart}
            >
              {loading ? (
                <Spinner size={18} />
              ) : (
                <span className="capitalize">Thêm vào giỏ</span>
              )}
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button className="group inline-flex items-center gap-2 w-fit duration-200">
              <span className="p-[8px] group-active:bg-orange-100 rounded-full duration-200">
                <GoHeart className="text-[22px] flex group-hover:text-[var(--color-primary)] duration-200" />
              </span>
              <span className="text-[16px] group-hover:text-[var(--color-primary)] duration-200">
                Thêm yêu thích
              </span>
            </button>

            <div className="flex gap-4">
              <button>
                <IoLogoFacebook className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
              <button>
                <IoLogoInstagram className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
              <button>
                <IoLogoPinterest className="text-[20px] hover:text-[var(--color-primary)] duration-150" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
