import Spinner from '@/components/Spinner';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, logoutUser } from '@/store/slices/authSlice';
import { customHistory } from '@/utils/history';

import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoIosNotifications } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa6';
import { BiSolidCartAlt } from 'react-icons/bi';
import Badge from '@/components/Badge';
import SearchBox from '@/components/SearchBox';
import { Menu } from '@/components/Popper/Menu';
import SubNavigation from './SubNavigation';
import {
  getCategoryList,
  getCartItemList,
  getNotificationList,
  getVoucherList,
  resetAll,
} from '@/store/slices/shopSlice';
import UserNotificationPopper from '@/components/UserNotificationPopper';
import notificationApi from '@/api/notificationApi';

const accountMenuList = [
  {
    label: 'Thông tin tài khoản',
    value: 'user-info',
    to: '/profile',
  },
  {
    label: 'Đơn hàng',
    value: 'orders',
    to: '/profile/orders',
  },
  {
    label: 'Đăng xuất',
    value: 'logout',
  },
];

const Header = forwardRef((props, ref) => {
  const headerRef = useRef(null);
  const { pathname, search } = useLocation();
  const { currentUser, loading } = useSelector((state) => state.auth);
  const { notificationList, cartItemList, categoryList } = useSelector(
    (state) => state.shop
  );
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getHeight: () => headerRef.current.offsetHeight,
    getWidth: () => headerRef.current.offsetWidth,
  }));

  const handleLogoutUser = async () => {
    try {
      const logoutResponse = await dispatch(logoutUser()).unwrap();
      customHistory.push('/');
    } catch (error) {
      customHistory.push('/auth/login');
    } finally {
      dispatch(clearState());
    }
  };

  const headerNavItems = useMemo(() => {
    return categoryList
      .filter(
        (categoryItem, index) => categoryItem?.subCategoriesInfo?.length > 0
      )
      .map((categoryItem, index) => {
        const { subCategoriesInfo, name, categoryId } = categoryItem;
        return {
          label: name,
          value: categoryId,
          to: '/shop/search?categoryId=' + categoryId,
        };
      });
  }, [categoryList]);

  const handleAccountListSelected = ({ value }) => {
    if (value === 'logout') {
      toast.promise(
        handleLogoutUser,
        {
          pending: 'Đang đăng xuất 😴',
          success: {
            render: () => {
              dispatch(resetAll());
              dispatch(clearState());
              return 'Đăng xuất thành công 🫡';
            },
          },
          error: 'Có lỗi xảy ra 🤔',
        },
        {
          autoClose: 1500,
        }
      );
    }
  };

  const handleNotificationItemClick = async (data) => {
    if (Object.keys(data).length) {
      const { seen, notificationId } = data;
      try {
        if (!seen) {
          await notificationApi.updateUserNotifications(notificationId);
          await dispatch(
            getNotificationList({ page: 1, pageSize: 999999 })
          ).unwrap();
        }
      } catch (error) {
        console.log('Update notification failed.');
      }
    }
  };

  useEffect(() => {
    const params = { page: 1, pageSize: 99999 };
    dispatch(getNotificationList({ params }));
    dispatch(getCartItemList());
    dispatch(getVoucherList({}));
    dispatch(getCategoryList({}));
  }, []);

  return (
    <div
      ref={headerRef}
      className={`Header-container flex flex-col justify-center items-center w-full max-w-[1280px] pt-[24px] pb-[12px] px-[var(--spacing-padding-container)) ${
        pathname !== '/' && 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-6">
          <div className="logo">
            <Link
              to={'/'}
              className={`text-[28px] ${
                pathname === '/' && 'text-white'
              } font-bold`}
            >
              CoDeCo
            </Link>
          </div>
          {pathname !== '/' && (
            <Link
              to={'/shop'}
              className="text-[18px] hover:text-[var(--color-primary)] duration-300 px-1 py-1 hover:px-4 hover:bg-[#e58411]/[.02] border border-transparent hover:border-[var(--color-primary)] rounded-md"
            >
              Shop
            </Link>
          )}
        </div>

        {pathname === '/' ? (
          <div
            className={`flex items-center space-x-[40px] text-[18px] text-white`}
          >
            <Menu items={headerNavItems}>
              <Link to={'#'} className="hidden md:block">
                Nội thất
              </Link>
            </Menu>
            <Link
              to={'/shop'}
              className="px-2 py-1 hover:px-5 border border-transparent rounded-lg duration-150 ease-out hover:bg-[#e58411]/[0.2] bg-opacity-45"
            >
              Shop
            </Link>
            <Link
              to={'#'}
              className="hidden md:block px-2 py-1 hover:bg-black/10 rounded-lg duration-150"
            >
              Liên hệ
            </Link>
          </div>
        ) : (
          <div>
            <SearchBox />
          </div>
        )}

        {!currentUser ? (
          <div className="flex items-center space-x-[24px]">
            <button
              className={`text-[18px] ${
                pathname === '/'
                  ? 'text-white hover:bg-black/25 rounded-lg duration-150'
                  : 'hover:text-[var(--color-primary)]'
              } px-[20px] py-[10px] duration-150`}
            >
              <Link to={'/auth/register'}>Đăng ký</Link>
            </button>
            <button className="text-[18px]">
              <Link
                to={'/auth/login'}
                className={`px-[20px] py-[10px] border ${
                  pathname === '/'
                    ? 'border-white text-white hover:bg-white/25 duration-150'
                    : 'border-[var(--color-primary)] text-white bg-[var(--color-primary)] hover:brightness-105'
                } rounded-lg duration-150`}
              >
                Đăng nhập
              </Link>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <UserNotificationPopper
              items={notificationList}
              onClick={(data) => handleNotificationItemClick(data)}
            >
              <div>
                <Badge value={notificationList?.length || 0}>
                  <button
                    className={`${
                      pathname === '/' && 'text-white'
                    } text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
                  >
                    <IoIosNotifications className="text-[22px]" />
                  </button>
                </Badge>
              </div>
            </UserNotificationPopper>

            <Menu
              trigger="click"
              items={accountMenuList}
              onClick={(value) => handleAccountListSelected(value)}
            >
              <div
                className={`flex space-x-2 items-center ${
                  pathname === '/' && 'text-white'
                } cursor-pointer px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
              >
                <span className="text-[16px]">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt="Avatar"
                      className="size-[28px] rounded-full border border-white"
                    />
                  ) : (
                    <FaUserCircle className="text-[22px]" />
                  )}
                </span>
                <span className="capitalize hidden md:block">
                  {(currentUser.firstName || '') +
                    ' ' +
                    (currentUser.lastName || '')}
                </span>
                <span className="text-[16px]">
                  <FaCaretDown className="text-[18px]" />
                </span>
              </div>
            </Menu>

            <Badge value={cartItemList?.length || 0}>
              <button
                className={`${
                  pathname === '/' && 'text-white'
                } text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
              >
                <Link to={'/shop/cart'}>
                  <BiSolidCartAlt className="text-[22px]" />
                </Link>
              </button>
            </Badge>
          </div>
        )}
      </div>

      {pathname !== '/' && (
        <div className="mt-[24px] flex justify-center">
          <SubNavigation />
        </div>
      )}
    </div>
  );
});

export default Header;
