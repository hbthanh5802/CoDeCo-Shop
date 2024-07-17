import { useField } from 'formik';
import React, { useId, useState } from 'react';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';

const CustomTextInput = ({
  label,
  type,
  styles = {},
  className = '',
  ...props
}) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(true);
  const inputId = useId();

  return (
    <div style={{ ...styles }} className={`form-control w-full ${className}`}>
      <div
        className="group px-3 py-2 border rounded-lg flex flex-col has-[:focus]:border-slate-800 duration-150 data-[error='true']:border-pink-600 relative"
        data-error={!!(meta.touched && meta.error)}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs uppercase group-data-[error='true']:text-pink-600"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type === 'password' && show ? 'password' : 'text'}
          className="text-sm text-slate-900 placeholder:text-slate-400 outline-none py-1 group-data-[error='true']:text-pink-600"
          {...field}
          {...props}
        />
        {type === 'password' && (
          <span
            onClick={() => setShow(!show)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-lg group-data-[error='true']:text-pink-600"
          >
            {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-sm text-pink-600 py-2 animate-fadeIn">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default CustomTextInput;
