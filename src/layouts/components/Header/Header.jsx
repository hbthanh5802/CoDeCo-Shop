import Spinner from '@/components/Spinner';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, logoutUser } from '@/store/slices/authSlice';
import { customHistory } from '@/utils/history';

import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoIosNotifications } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
import { FaCaretDown } from 'react-icons/fa6';
import { BiSolidCartAlt } from 'react-icons/bi';
import Badge from '@/components/Badge';
import SearchBox from '@/components/SearchBox';
import { MenuExpand, Menu } from '@/components/Popper/Menu';
import SubNavigation from './SubNavigation';

const headerNavItems = [
  {
    label: 'Phòng khách',
    value: 'Phòng khách',
  },
  {
    label: 'Phòng ngủ',
    value: 'Phòng ngủ',
    to: '#',
  },
  {
    label: 'Phòng tắm',
    value: 'Phòng tắm',
    to: '#',
  },
  {
    label: 'Bếp & phòng ăn',
    value: 'Bếp & phòng ăn',
    to: '#',
  },
  {
    label: 'Văn phòng làm việc',
    value: 'Văn phòng làm việc',
    to: '#',
  },
];

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
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getHeight: () => headerRef.current.offsetHeight,
    getWidth: () => headerRef.current.offsetWidth,
  }));

  const handleLogoutUser = async () => {
    try {
      const logoutResponse = await dispatch(logoutUser()).unwrap();
      toast.info(logoutResponse + 'Bạn đã dăng xuất', {
        autoClose: 2000,
      });
      dispatch(clearState());
      customHistory.push('/');
    } catch (error) {
      dispatch(clearState());
      customHistory.push('/auth/login');
    }
  };

  const handleAccountListSelected = ({ value }) => {
    if (value === 'logout') {
      toast.promise(handleLogoutUser, {
        pending: 'Đang đăng xuất',
        success: 'Đăng xuất thành công',
        error: 'Có lỗi xảy ra',
      });
    }
  };

  return (
    <div
      ref={headerRef}
      className={`Header-container flex flex-col justify-center items-center w-full max-w-[1280px] pt-[24px] pb-[12px] px-[var(--spacing-padding-container)) ${
        pathname !== '/' && 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center w-full">
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

        {pathname === '/' ? (
          <div
            className={`hidden lg:flex items-center space-x-[40px] text-[18px] text-white`}
          >
            <Menu
              items={headerNavItems}
              onClick={(value) => {
                console.log(value);
              }}
            >
              <Link to={'#'}>Nội thất</Link>
            </Menu>
            <Link
              to={'/shop'}
              className="px-2 py-1 hover:bg-black/10 rounded-lg duration-150"
            >
              Shop
            </Link>
            <Link
              to={'#'}
              className="px-2 py-1 hover:bg-black/10 rounded-lg duration-150"
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
            <Badge value={12}>
              <button
                className={`${
                  pathname === '/' && 'text-white'
                } text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
              >
                <IoIosNotifications />
              </button>
            </Badge>

            <Menu
              items={accountMenuList}
              onClick={(value) => handleAccountListSelected(value)}
            >
              <div
                className={`flex space-x-2 items-center ${
                  pathname === '/' && 'text-white'
                } cursor-pointer px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
              >
                <span className="text-[16px]">
                  <FaUser />
                </span>
                <span className="hidden md:block">
                  {currentUser.firstName + ' ' + currentUser.lastName}
                </span>
                <span className="text-[16px]">
                  <FaCaretDown />
                </span>
              </div>
            </Menu>

            <Badge value={9}>
              <button
                className={`${
                  pathname === '/' && 'text-white'
                } text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150`}
              >
                <Link to={'/shop/cart'}>
                  <BiSolidCartAlt />
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
