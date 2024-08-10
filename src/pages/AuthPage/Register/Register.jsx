import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import images from '@/assets/images';
import CustomTextInput from '@/components/Auth/CustomTextInput/CustomTextInput';
import schemas from '@/schemas';
import Spinner from '@/components/Spinner';
import CustomCheckboxInput from '@/components/Auth/CustomCheckboxInput';
import { MdChevronLeft } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Background from '../components/Background';
import VerifyOTP from '../components/VerifyOTP';
import SuccessView from '../components/SuccessView';
import { useSelector } from 'react-redux';
import authApi from '@/api/authApi';

const Register = () => {
  const navigate = useNavigate();
  const { previous } = useSelector((state) => state.history);
  const [process, setProcess] = useState(1);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    agreeToTerms: false,
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    agreeToTerms: false,
  };

  const handleSubmitForm = async (values, actions) => {
    const { firstName, lastName, email, password, phoneNumber } = values;
    const data = { firstName, lastName, email, password, phoneNumber };
    setRegisterData(data);
    try {
      const registerResponse = await authApi.registerUser(data);
      setProcess(2);
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin và thử lại');
    }
  };

  return (
    <div className="h-full w-full bg-no-repeat bg-cover flex items-center space-x-6">
      <div className="hidden w-2/3 h-full md:block">
        <Background imageUrl={images.authBg} />
      </div>
      {/* Form */}
      {process === 1 && (
        <div className="form-container bg-white px-14 py-10 rounded-lg space-y-6 max-w-[800px] min-w-[600px]">
          <Link
            to={previous}
            className="flex items-center opacity-80 hover:opacity-100 duration-100"
          >
            <MdChevronLeft className="flex w-5 h-5" />
            <span>Quay lại trang chủ</span>
          </Link>
          <h1 className="font-semibold text-slate-900 text-[24px] text-center">
            Đăng ký tài khoản
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            validationSchema={schemas.registerSchema}
            enableReinitialize
          >
            {(props) => {
              return (
                <Form className="space-y-4">
                  <div className="flex space-x-6">
                    <CustomTextInput
                      label="Họ và Tên đệm"
                      placeholder="Nhập họ và tên đệm..."
                      name="firstName"
                    />
                    <CustomTextInput
                      label="Tên"
                      placeholder="Nhập tên của bạn..."
                      name="lastName"
                    />
                  </div>

                  <CustomTextInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại..."
                    name="phoneNumber"
                  />

                  <CustomTextInput
                    label="Email"
                    placeholder="Nhập địa chỉ email..."
                    name="email"
                  />

                  <CustomTextInput
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu..."
                    name="password"
                  />

                  <CustomCheckboxInput name="agreeToTerms">
                    <p className="text-sm">
                      Tôi đồng ý với{' '}
                      <span className="underline font-medium cursor-pointer">
                        Điều khoản dịch vụ
                      </span>{' '}
                      và{' '}
                      <span className="underline font-medium cursor-pointer">
                        Chính sách bảo mật
                      </span>
                      .
                    </p>
                  </CustomCheckboxInput>

                  <button
                    type="submit"
                    className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150 disabled:opacity-20 disabled:hover:bg-slate-900"
                    disabled={
                      !!Object.keys(props.errors).length ||
                      !props.values['agreeToTerms']
                    }
                  >
                    {props.isSubmitting ? (
                      <Spinner size={18} />
                    ) : (
                      <span>Tạo tài khoản</span>
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>

          <div className="other-method flex flex-col items-center space-y-6">
            <h3 className="text-sm uppercase">Hoặc</h3>
            <button className="flex space-x-2 items-center justify-center px-6 py-3 text-base border border-slate-300 w-full rounded-lg hover:bg-slate-100 duration-150">
              <FcGoogle className="w-5 h-5" />
              <p>Đăng ký bằng Google</p>
            </button>
            <p>
              Quý khách đã có tài khoản?
              <Link
                className="ml-2 font-medium hover:text-[var(--color-primary)] duration-150"
                to={'/auth/login'}
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      )}
      {process === 2 && (
        <VerifyOTP
          title={'Xác minh Email'}
          data={registerData}
          handleSetProcess={(value) => setProcess(value)}
          onSubmit={() => setProcess(3)}
        />
      )}
      {process === 3 && (
        <SuccessView to={'/auth/login'}>
          <p className="text-center">
            Tài khoản của quý khách đã được xác thực thành công. Hãy đi đến
            trang chủ để tiếp tục mua sắm với{' '}
            <span className="font-medium">CoDeco</span>.
          </p>
        </SuccessView>
      )}
    </div>
  );
};

export default Register;
