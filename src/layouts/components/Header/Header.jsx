import { customHistory } from '@/utils/history';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Header = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <div className="flex justify-center space-x-4">
      {currentUser ? (
        <>
          <button onClick={() => customHistory.push('/auth/login')}>
            Login
          </button>
          <button onClick={() => customHistory.push('/auth/register')}>
            Register
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              toast.info('Logout User!');
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
