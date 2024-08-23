import SearchBox from '@/components/SearchBox';
import React from 'react';
import SubNavigation from '../SubNavigation';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BiCartAlt, BiSolidCartAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

const MobileNavigation = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogoutUser = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success('Đăng xuất thành công 👌💙', { autoClose: 500 });
      })
      .catch((error) => {
        console.log('Failed to logout user in Mobile Navigation', error);
      });
  };

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-3">
      <div className="flex flex-col gap-2">
        <span>Tìm kiếm:</span>
        <SearchBox className="!rounded-lg" />
      </div>

      {currentUser ? (
        <>
          <div className="flex flex-col gap-3">
            <NavLink
              end
              to={'/profile'}
              className={({ isActive }) => {
                return `duration-200 flex py-3 gap-3 mt-2 items-center rounded ${
                  isActive
                    ? 'px-3 bg-[#333] text-white'
                    : 'hover:bg-[#f7f7f7] hover:pl-3'
                }`;
              }}
            >
              <p>Thông tin tài khoản</p>
            </NavLink>
            <NavLink
              end
              to={'/profile/orders'}
              className={({ isActive }) => {
                return `duration-200 flex py-3 gap-3 mt-2 items-center rounded ${
                  isActive
                    ? 'px-3 bg-[#333] text-white'
                    : 'hover:bg-[#f7f7f7] hover:pl-3'
                }`;
              }}
            >
              <p>Đơn hàng của bạn</p>
            </NavLink>
          </div>
          <span className="block w-full h-[1px] bg-slate-200"></span>
          <div className="flex flex-col gap-3">
            <button
              className="duration-300 px-0 hover:px-3 py-3 text-red-700 hover:text-red-800 hover:bg-red-50 rounded text-left"
              onClick={handleLogoutUser}
            >
              Đăng xuất
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-stretch gap-6">
          <button className="block flex-1 text-[18px]">
            <Link
              to={'/auth/login'}
              className={`w-full block px-[20px] py-[10px] border ${
                pathname === '/'
                  ? 'border-white text-white hover:bg-white/25 duration-150'
                  : 'border-[var(--color-primary)] text-white bg-[var(--color-primary)] hover:brightness-105'
              } rounded-lg duration-150`}
            >
              Đăng nhập
            </Link>
          </button>
          <button
            className={`text-[18px] ${
              pathname === '/'
                ? 'text-white hover:bg-black/25 rounded-lg duration-150'
                : 'hover:text-[var(--color-primary)]'
            } px-[20px] py-[10px] hover:bg-[#f7f7f7] duration-150`}
          >
            <Link to={'/auth/register'} className="block">
              Đăng ký
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
