import images from '@/assets/images';
import Spinner from '@/components/Spinner';
import { statusView } from '@/constants';
import { serializeSearchParams } from '@/utils/url';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import StatusView from '@/components/StatusView';
import authApi from '@/api/authApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToken, setCurrentUser } from '@/store/slices/authSlice';

const statusViewData = {
  [statusView.PENDING]: {
    title: 'Vui lòng chờ',
    to: '/auth/login',
    content: '',
    buttonLabel: 'Tiếp tục',
  },
  [statusView.SUCCESS]: {
    title: 'Thành công',
    to: '/',
    content: '',
    buttonLabel: 'Tiếp tục',
  },
  [statusView.FAILED]: {
    title: 'Không thành công',
    to: '/auth/login',
    content: '',
    buttonLabel: 'Tiếp tục',
  },
};

const OAuthPage = () => {
  const [status, setStatus] = useState(statusView.PENDING);
  const allowFetch = useRef(true);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { previous } = useSelector((state) => state.history);

  useEffect(() => {
    if (allowFetch.current) {
      const { code } = serializeSearchParams(search);
      if (code) {
        authApi
          .loginWithGoogle({ code })
          .then((response) => {
            toast.info('Chào mừng 💐🤩', {
              autoClose: 500,
              onClose: () => navigate(previous || '/'),
            });
            setStatus(statusView.SUCCESS);
            if (response.result) {
              const { userResponse, accessToken, refreshToken } =
                response.result;
              dispatch(addToken({ accessToken, refreshToken }));
              dispatch(setCurrentUser(userResponse));
            }
          })
          .catch((error) => {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại ❌', {
              autoClose: 1500,
            });
            setStatus(statusView.FAILED);
            console.log('Failed to login with Google', error);
          });
      }
    }
    return () => {
      allowFetch.current = false;
    };
  });

  return (
    <div className="h-full w-full bg-no-repeat bg-cover flex items-center space-x-6">
      <div className="hidden w-2/3 h-full md:block">
        <Background imageUrl={images.authBg} />
      </div>
      <div className="flex items-center flex-1 justify-center pr-6 text-center">
        <StatusView
          type={status}
          to={statusViewData[status].to}
          buttonLabel={statusViewData[status].buttonLabel}
          title={statusViewData[status].title}
          disabled={status === statusView.PENDING}
        >
          <p className="text-center">{statusViewData[status].content}</p>
        </StatusView>
      </div>
    </div>
  );
};

export default OAuthPage;
