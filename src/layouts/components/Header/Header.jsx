import Spinner from '@/components/Spinner';
import { clearState, logoutUser } from '@/store/slices/authSlice';
import { customHistory } from '@/utils/history';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
      toast.error('Có lỗi xảy ra. Vui lòng đăng nhập lại.');
      dispatch(clearState());
      customHistory.push('/auth/login');
    }
  };
  return (
    <div className="flex justify-center space-x-4">
      {loading && <Spinner color="text-black" size={24} />}
      {currentUser ? (
        <>
          <button onClick={handleLogoutUser}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => customHistory.push('/auth/login')}>
            Login
          </button>
          <button onClick={() => customHistory.push('/auth/register')}>
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
