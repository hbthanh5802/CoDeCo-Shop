import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

const CategoryRadioItem = forwardRef(
  ({ label, name, value, disabled = false, onClick = () => {} }, ref) => {
    const radioItemRef = useRef();
    const radioItemId = useId();

    const handleChange = (e) => {
      const data = { label, name, value };
      if (!disabled) onClick(data);
    };

    const handleReset = () => {
      if (radioItemRef.current) {
        radioItemRef.current.checked = false;
      }
    };

    useImperativeHandle(ref, () => ({ handleReset }));

    return (
      <label
        htmlFor={radioItemId}
        className="radio-item duration-300 group inline-flex gap-2 items-center px-[16px] py-[6px] border border-[#ccc] rounded has-[input:checked]:border-black has-[input:checked]:bg-[#f7f7f7] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-[#f7f7f7] has-[input:disabled]:border-[#f7f7f7] has-[input:disabled]:text-[#ccc] cursor-pointer hover:border-[var(--color-primary)]"
      >
        <input
          ref={radioItemRef}
          type="radio"
          name={name}
          id={radioItemId}
          value={value || undefined}
          disabled={disabled || false}
          onChange={handleChange}
          hidden
        />
        {label ? (
          label
        ) : (
          <span className="group-has-[input:disabled]:text-[#ccc]">Label</span>
        )}
      </label>
    );
  }
);

CategoryRadioItem.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CategoryRadioItem;
