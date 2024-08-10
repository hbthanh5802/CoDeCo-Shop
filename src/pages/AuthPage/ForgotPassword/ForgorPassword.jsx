import React, { useEffect, useState } from 'react';

import images from '@/assets/images';
import { toast } from 'react-toastify';
import VerifyEmail from '../components/VerifyEmail';
import VerifyOTP from '../components/VerifyOTP';
import Background from '../components/Background';
import RecoverPassword from '../components/RecoverPassword';
import authApi from '@/api/authApi';
import StatusView from '@/components/StatusView';
import { statusView } from '@/constants';

const ForgotPassword = () => {
  const [process, setProcess] = useState(1);
  const [status, setStatus] = useState('');
  const [data, setData] = useState({
    otp: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleVerifyOtpSubmit = (otpData) => {
    if (typeof otpData === 'object') {
      setData((prev) => ({ ...prev, otp: Object.values(otpData).join('') }));
    }
    setProcess(3);
  };

  const handleRecoverPasswordSubmit = async (formData) => {
    if (Object.values(formData).some((value) => !value.trim())) {
      toast.info('Vui lòng kiểm tra thông tin hoặc thử lại.', {
        autoClose: 1000,
      });
      return;
    }
    const { password, confirmPassword } = formData;
    if (!password || !confirmPassword || password !== confirmPassword) {
      toast.info('Vui lòng kiểm tra lại thông tin. Hoặc thử lại.', {
        autoClose: 1500,
      });
      return;
    }
    setData((prev) => ({
      ...prev,
      newPassword: password,
      confirmPassword: confirmPassword,
    }));
    const bodyData = {
      otp: data.otp,
      email: data.email,
      newPassword: password,
      confirmPassword,
    };
    try {
      await authApi.recoverPassword(bodyData);
      toast.success('Đổi mật khẩu thành công 🧡', { autoClose: 1000 });
      setStatus(statusView.SUCCESS);
    } catch (error) {
      console.log('Recover Password failed', error);
      setStatus(statusView.FAILED);
      toast.error('Thay đổi mật khẩu không thành công. Vui lòng thử lại. ❌');
    } finally {
      setProcess(4);
    }
  };

  return (
    <div className="h-full w-full bg-no-repeat bg-cover flex items-center space-x-6 relative">
      <div className="hidden w-2/3 h-full md:block">
        <Background imageUrl={images.authBg} />
      </div>
      {/* Form */}
      {process === 1 && (
        <VerifyEmail handleSetProcess={setProcess} handleSetData={setData} />
      )}
      {process === 2 && (
        <VerifyOTP
          title={'Quên mật khẩu'}
          handleSetProcess={setProcess}
          onSubmit={(data) => handleVerifyOtpSubmit(data)}
          data={data}
          allowPass={true}
        />
      )}
      {process === 3 && (
        <RecoverPassword
          onSubmit={(data) => handleRecoverPasswordSubmit(data)}
          handleSetProcess={setProcess}
        />
      )}
      {process === 4 && (
        <div className="flex items-center flex-1 justify-center text-center">
          <StatusView
            type={status}
            to="/auth/login"
            buttonLabel={status === statusView.SUCCESS ? 'Tiếp Tục' : 'Trở lại'}
            title={
              status === statusView.SUCCESS
                ? 'Khôi phục thành công thành công'
                : 'Mật khẩu chưa được khôi phục'
            }
          >
            {status === statusView.SUCCESS ? (
              <p className="text-center">
                Tài khoản của quý khách đã được khôi phục mật khẩu. Hãy đi đến
                trang chủ để tiếp tục mua sắm với{' '}
                <span className="font-medium">CoDeco</span>.
              </p>
            ) : (
              <p className="text-center">
                Mật khẩu của quý khách chưa được khôi phục. Hệ thông của chúng
                tôi đang gặp sự cố. Rất mong quý khách thông cảm và thử lại sau.
              </p>
            )}
          </StatusView>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
