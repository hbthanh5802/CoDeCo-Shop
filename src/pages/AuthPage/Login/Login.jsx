import React, { useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

import images from '@/assets/images';
import CustomTextInput from '@/components/Auth/CustomTextInput/CustomTextInput';
import schemas from '@/schemas';
import Spinner from '@/components/Spinner';
import { MdChevronLeft } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/configs/firebase';
import { goBackHistory } from '@/store/slices/historySlice';
import { resetAll } from '@/store/slices/shopSlice';

const Login = () => {
  const { previous } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);
  const [reCaptcha, setReCaptcha] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmitForm = async (values, actions) => {
    try {
      if (!reCaptcha) return;
      const data = {
        email: values.email,
        password: values.password,
        recaptchaToken: reCaptcha,
      };
      if (recaptchaRef.current) recaptchaRef.current.reset();
      await dispatch(loginUser(data)).unwrap();
      toast.success('Đăng nhập thành công');
      dispatch(resetAll());
      dispatch(goBackHistory());
    } catch (error) {
      setReCaptcha('');
      console.log(error);
      toast.error('Email hoặc mật khẩu không chính xác', {
        autoClose: 500,
      });
    }
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReCaptchaChange = (value) => {
    setReCaptcha(value);
  };

  return (
    <div className="h-full w-full bg-no-repeat bg-cover flex items-center space-x-6">
      <div className="hidden w-2/3 h-full md:block">
        <Background imageUrl={images.authBg} />
      </div>
      {/* Form */}
      <div className="form-container bg-white px-14 py-10 rounded-lg space-y-6 max-w-[800px] min-w-[600px]">
        <Link
          to={previous}
          className="flex items-center opacity-80 hover:opacity-100 duration-100"
        >
          <MdChevronLeft className="flex w-5 h-5" />
          <span>Quay lại trang chủ</span>
        </Link>
        <h1 className="font-semibold text-slate-900 text-[24px] text-center">
          Đăng nhập
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validateOnChange
          validationSchema={schemas.loginSchema}
        >
          {(props) => {
            return (
              <Form className="space-y-4">
                <CustomTextInput
                  label="Email"
                  placeholder="Nhập địa chỉ email"
                  name="email"
                />

                <CustomTextInput
                  label="Mật khẩu"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="password"
                />

                <Link
                  to={'/auth/forgot-password'}
                  className="ml-auto w-fit opacity-80 block text-right hover:opacity-100 duration-100"
                >
                  Quên mật khẩu?
                </Link>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeYcA4qAAAAABBhaA--SOnU9S0QnY-Pa1ly-Wml"
                  onChange={handleReCaptchaChange}
                  onError={handleReCaptchaChange}
                  onExpired={handleReCaptchaChange}
                />

                <button
                  type="submit"
                  className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150 disabled:opacity-20 disabled:hover:bg-slate-900"
                  disabled={
                    !!Object.keys(props.errors).length ||
                    !reCaptcha?.trim() ||
                    props.isSubmitting
                  }
                >
                  {props.isSubmitting ? (
                    <Spinner size={18} />
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>

        <div className="other-method flex flex-col items-center space-y-6">
          <h3 className="text-sm uppercase">Hoặc</h3>
          <button
            className="flex space-x-2 items-center justify-center px-6 py-3 text-base border border-slate-300 w-full rounded-lg hover:bg-slate-100 duration-150"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="w-5 h-5" />
            <p>Đăng nhập bằng Google</p>
          </button>
          <p>
            Quý khách chưa có có tài khoản?
            <Link
              className="ml-2 font-medium hover:text-[var(--color-primary)] duration-150"
              to={'/auth/register'}
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
