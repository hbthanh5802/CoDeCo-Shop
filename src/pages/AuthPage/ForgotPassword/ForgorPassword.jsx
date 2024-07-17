import React, { useState } from 'react';

import images from '@/assets/images';
import { toast } from 'react-toastify';
import VerifyEmail from '../components/VerifyEmail';
import VerifyOTP from '../components/VerifyOTP';
import Background from '../components/Background';
import RecoverPassword from '../components/RecoverPassword';

const ForgotPassword = () => {
  const [process, setProcess] = useState(1);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

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
          handleSetData={setData}
        />
      )}
      {process === 3 && (
        <RecoverPassword
          handleSetProcess={setProcess}
          handleSetData={setData}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
