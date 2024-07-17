import { useField } from 'formik';
import React, { useId } from 'react';

const CustomCheckboxInput = ({ label, size, children, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const inputId = useId();

  return (
    <div>
      <div
        className="flex items-center form-control space-x-1 group"
        data-error={!!(meta.touched && meta.error)}
      >
        <input
          style={{
            height: size || 14,
            width: size || 14,
          }}
          id={inputId}
          type="checkbox"
          {...field}
          {...props}
        />
        {children && (
          <label
            className="text-base text-slate-900 group-data-[error='true']:text-pink-600"
            htmlFor={inputId}
          >
            {children}
          </label>
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

export default CustomCheckboxInput;
