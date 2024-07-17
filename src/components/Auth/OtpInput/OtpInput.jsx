import { useField } from 'formik';
import React, { useId, useState } from 'react';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';

const OptInput = ({
  label,
  type,
  styles = {},
  className = '',
  focus = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const inputId = useId();

  const handleChange = (e) => {
    let value = e.target.value;
    if (value?.length > 1) {
      value = value.slice(value?.length - 1);
    }
    helpers.setValue(value);
  };

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
          data-type="otp"
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm text-slate-900 placeholder:text-slate-400 outline-none py-1 group-data-[error='true']:text-pink-600"
          maxLength={1}
          min={0}
          max={9}
          autoFocus={focus}
          {...field}
          {...props}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default OptInput;
