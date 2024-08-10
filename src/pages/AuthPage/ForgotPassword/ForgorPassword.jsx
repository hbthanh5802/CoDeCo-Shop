import React, { useState } from 'react';

import images from '@/assets/images';
import { toast } from 'react-toastify';
import VerifyEmail from '../components/VerifyEmail';
import VerifyOTP from '../components/VerifyOTP';
import Background from '../components/Background';
import RecoverPassword from '../components/RecoverPassword';
import SuccessView from '../components/SuccessView';

const ForgotPassword = () => {
  const [process, setProcess] = useState(1);
  const [data, setData] = useState({
    otp: '',
    email: '',
    password: '',
  });

  // console.log(data);

  const handleVerifyOTPSuccess = (otpData) => {
    if (typeof otpData === 'object') {
      setData((prev) => ({ ...prev, otp: Object.values(otpData).join('') }));
    }
    setProcess(3);
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
          onSuccess={handleVerifyOTPSuccess}
          data={data}
        />
      )}
      {process === 3 && (
        <RecoverPassword
          handleSetProcess={setProcess}
          handleSetData={setData}
        />
      )}
      {process === 4 && (
        <SuccessView to="/auth/login" title="Khôi phục thành công thành công">
          <p className="text-center">
            Tài khoản của quý khách đã được khôi phục mật khẩu. Hãy đi đến trang
            chủ để tiếp tục mua sắm với{' '}
            <span className="font-medium">CoDeco</span>.
          </p>
        </SuccessView>
      )}
    </div>
  );
};

export default ForgotPassword;
