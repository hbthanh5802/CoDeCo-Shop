import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

import CustomTextInput from '@/components/Auth/CustomTextInput/CustomTextInput';
import schemas from '@/schemas';
import Spinner from '@/components/Spinner';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '@/api/authApi';

const VerifyEmail = ({ handleSetProcess, handleSetData }) => {
  // const [forgotPasswordData, setForgotPasswordData] = useState({ email: '' });
  const [reCaptcha, setReCaptcha] = useState('');
  const initialValues = {
    email: '',
  };

  const dummyTimeout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('OK');
      }, 1000);
    });
  };

  const handleSubmitForm = async (values, actions) => {
    // console.log({ values, actions });
    const { email } = values;
    if (!email) return;
    await authApi
      .forgotPassword({ email })
      .then((res) => {
        toast.success('OK');
        handleSetData((prev) => ({
          ...prev,
          email: email,
        }));
        handleSetProcess(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReCaptchaChange = (value) => {
    // console.log('ReCAPTCHA', value);
    setReCaptcha(value);
  };

  return (
    <div className="form-container bg-white px-14 py-10 rounded-lg space-y-6 max-w-[800px] min-w-[600px]">
      <Link
        to={'/auth/login'}
        className="flex items-center opacity-80 hover:opacity-100 duration-100"
      >
        <MdChevronLeft className="flex w-5 h-5" />
        <span>Quay lại</span>
      </Link>
      <h1 className="font-semibold text-slate-900 text-[24px] text-center">
        Xác nhận Email
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validateOnChange
        validationSchema={schemas.verifyEmailSchema}
      >
        {(props) => {
          return (
            <Form className="space-y-4">
              <CustomTextInput
                label="Email"
                placeholder="Nhập địa chỉ email"
                name="email"
              />

              <ReCAPTCHA
                sitekey="6LeYcA4qAAAAABBhaA--SOnU9S0QnY-Pa1ly-Wml"
                onChange={handleReCaptchaChange}
                onError={handleReCaptchaChange}
                onExpired={handleReCaptchaChange}
              />

              <button
                type="submit"
                className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150 disabled:opacity-20 disabled:hover:bg-slate-900"
                disabled={
                  !!Object.keys(props.errors).length || !reCaptcha?.trim()
                }
              >
                {props.isSubmitting ? (
                  <Spinner size={18} />
                ) : (
                  <span>Tiếp tục</span>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default VerifyEmail;
