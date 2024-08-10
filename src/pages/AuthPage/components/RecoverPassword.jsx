import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import CustomTextInput from '@/components/Auth/CustomTextInput/CustomTextInput';
import schemas from '@/schemas';
import Spinner from '@/components/Spinner';
import { MdChevronLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecoverPassword = ({ handleSetProcess, onSubmit }) => {
  const navigate = useNavigate();
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmitForm = async (values, actions) => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <div className="form-container bg-white px-14 py-10 rounded-lg space-y-6 max-w-[800px] min-w-[600px]">
      <p
        className="flex items-center opacity-80 hover:opacity-100 duration-100 cursor-pointer"
        onClick={() => handleSetProcess(2)}
      >
        <MdChevronLeft className="flex w-5 h-5" />
        <span>Quay lại</span>
      </p>
      <h1 className="font-semibold text-slate-900 text-[24px] text-center">
        Xác nhận Email
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validateOnChange
        validationSchema={schemas.recoverPasswordSchema}
      >
        {(props) => {
          return (
            <Form className="space-y-4">
              <CustomTextInput
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới của bạn..."
                name="password"
                type="password"
              />

              <CustomTextInput
                label="Xác nhận mật khẩu mới"
                placeholder="Vui lòng nhập lại mật khẩu mới..."
                name="confirmPassword"
                type="password"
              />

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

export default RecoverPassword;
