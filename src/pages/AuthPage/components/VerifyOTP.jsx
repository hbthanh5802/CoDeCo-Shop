import authApi from '@/api/authApi';
import OtpInput from '@/components/Auth/OtpInput';
import Spinner from '@/components/Spinner';
import Timer from '@/components/Timer';
import schemas from '@/schemas';
import { Form, Formik } from 'formik';
import React, { Fragment, useEffect, useId, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const otpSize = import.meta.env.VITE_OTP_SIZE;

const VerifyOTP = ({ handleSetProcess, title, onSuccess, data }) => {
  const inputId = useId();
  const [canReSend, setCanReSend] = useState(true);
  const navigate = useNavigate();
  const initialValues = Array.from({ length: otpSize }).reduce(
    (acc, _, index) => {
      acc[`number${index + 1}`] = '';
      return acc;
    },
    {}
  );

  const handleSubmitForm = async (values, actions) => {
    // console.log({ values, actions });
    const otpValue = Object.values(values).join('');
    const { email } = data;
    if (!email) return;
    if (onSuccess) onSuccess();
    await authApi
      .verifyOtp({ email, otp: otpValue })
      .then((res) => {
        toast.success('Đăng ký thành công');
        navigate('/auth/login');
      })
      .catch((error) => {
        toast.error('OTP chưa chính xác. Vui lòng kiểm tra và thử lại.');
        console.log(error);
      })
      .finally(() => {
        setCanReSend(true);
      });
  };

  const handleReSendOTP = async () => {
    const { email } = registerData;
    if (!email) return;
    await authApi
      .regenerateOtp({ email })
      .then((res) => {
        toast.success('Gửi mã thành công');
        setCanReSend(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const otpInputs = document.querySelectorAll('input[data-type="otp"]');
    otpInputs.forEach((input, index) => {
      const handleInput = (e) => {
        if (e.target.value.length >= 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      };

      const handleKeyDown = (e) => {
        if (e.target.value.length >= 1 && e.key !== 'Backspace') {
          e.preventDefault();
        }
      };

      input.addEventListener('input', handleInput);
      input.addEventListener('keydown', handleKeyDown);

      return () => {
        input.removeEventListener('input', handleInput);
        input.removeEventListener('keydown', handleKeyDown);
      };
    });
  }, []);

  return (
    <div className="form-container bg-white px-14 py-10 rounded-lg space-y-6 max-w-[600px] min-w-[600px]  ">
      <p
        className="flex items-center opacity-80 hover:opacity-100 duration-100 cursor-pointer"
        onClick={() => handleSetProcess(1)}
      >
        <MdChevronLeft className="flex w-5 h-5" />
        <span>Quay lại</span>
      </p>

      {title && (
        <h1 className="font-semibold text-slate-900 text-[24px] text-center">
          {title}
        </h1>
      )}

      <h3>
        Một <span className="font-bold">mã xác nhận (OTP)</span> đã được gửi tới
        địa chỉ Email của bạn. Vui lòng kiểm tra hộp thư và điền vào ô trống
        dưới đây:
      </h3>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={schemas.otpSchema}
      >
        {(props) => {
          return (
            <Form className="space-y-4">
              <div className="flex justify-between">
                {Array.from({ length: otpSize }, (_, index) => (
                  <Fragment key={`opt-${inputId}-${index + 1}`}>
                    <OtpInput
                      styles={{ width: '54px' }}
                      className="[&_*]:text-center [&_*]:text-lg [&_*]:font-semibold"
                      name={`number${index + 1}`}
                    />
                  </Fragment>
                ))}
              </div>

              <div className="flex space-x-1">
                <p>Chưa nhận được mã?</p>
                {canReSend && (
                  <button
                    type="button"
                    className="mx-1 font-medium hover:text-[var(--color-primary)] duration-150"
                    disabled={!canReSend}
                    onClick={handleReSendOTP}
                  >
                    Gửi lại
                  </button>
                )}
                {!canReSend && (
                  <div className="flex space-x-0">
                    <span>Thử lại sau</span>
                    <Timer
                      className="animate-fadeIn font-medium"
                      onEnd={() => setCanReSend(true)}
                      second={30}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150 disabled:opacity-20 disabled:hover:bg-slate-900"
                disabled={!!Object.keys(props.errors).length}
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

export default VerifyOTP;
