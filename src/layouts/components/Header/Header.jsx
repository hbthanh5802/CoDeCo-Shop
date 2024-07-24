import Spinner from '@/components/Spinner';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, logoutUser } from '@/store/slices/authSlice';
import { customHistory } from '@/utils/history';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Menu from '@/components/Popper/Menu';

import { IoIosNotifications } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
import { FaCaretDown } from 'react-icons/fa6';
import { BiSolidCartAlt } from 'react-icons/bi';
import Badge from '@/components/Badge';

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

const Header = () => {
  const { currentUser, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const handleAccountListSelected = (value) => {
    if (value === 'logout') {
      toast.promise(handleLogoutUser, {
        pending: 'Đang đăng xuất',
        success: 'Đăng xuất thành công',
        error: 'Có lỗi xảy ra',
      });
    }
  };

  return (
    <div className="Header-container flex justify-between items-baseline w-full py-[36px] px-[var(--spacing-padding-container)] absolute top-0 left-0 right-0 z-10">
      <div className="logo">
        <Link to={'/'} className="text-[28px] text-white font-bold">
          CoDeCo
        </Link>
      </div>

      <div className="hidden lg:flex items-center space-x-[40px] text-[18px] text-white">
        <Menu
          items={headerNavItems}
          onClick={(value) => {
            console.log(value);
          }}
        >
          <Link to={'#'}>Nội thất</Link>
        </Menu>
        <Link
          to={'#'}
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

      {!currentUser ? (
        <div className="flex items-center space-x-[24px]">
          <button className="text-[18px] text-white px-[20px] py-[10px] hover:bg-black/25 rounded-lg duration-150">
            <Link to={'/auth/register'}>Đăng ký</Link>
          </button>
          <button className="text-[18px] text-white">
            <Link
              to={'/auth/login'}
              className="px-[20px] py-[10px] border border-white rounded-lg hover:bg-white/25 duration-150"
            >
              Đăng nhập
            </Link>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <Badge value={12}>
            <button className="text-white text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150">
              <IoIosNotifications />
            </button>
          </Badge>

          <Menu
            items={accountMenuList}
            onClick={(value) => handleAccountListSelected(value)}
          >
            <div className="flex space-x-2 items-center text-white cursor-pointer px-2 py-1 hover:bg-black/10 rounded-lg duration-150">
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
            <button className="text-white text-[20px] px-2 py-1 hover:bg-black/10 rounded-lg duration-150">
              <BiSolidCartAlt />
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default Header;
