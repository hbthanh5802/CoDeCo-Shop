import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { hexToRgb } from '@/utils/colorConverter';

const RadioItem = forwardRef(
  (
    {
      name,
      size,
      label,
      color = '#E58411',
      value = undefined,
      defaultChecked = false,
      disabled = false,
      id,
      onChange = () => {},
    },
    ref
  ) => {
    const radioItemId = useId();
    const radioItemRef = useRef(null);

    const handleChange = () => {
      const data = { id, label, value, defaultChecked, disabled };
      onChange(data);
    };

    const handleReset = () => {
      if (radioItemRef.current) radioItemRef.current.checked = false;
    };

    useEffect(() => {
      if (defaultChecked) handleChange();
    }, []);

    useImperativeHandle(ref, () => ({ handleReset }));

    return (
      <div className="group w-fit h-fit flex items-start gap-[12px]">
        <div className="">
          <input
            ref={radioItemRef}
            className="hidden"
            type="radio"
            name={name}
            value={value}
            id={radioItemId}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            hidden
          />
          <label
            style={{
              width: `${size}px`,
              height: `${size}px`,
              minHeight: `${size}px`,
              minWidth: `${size}px`,
              maxHeight: `${size}px`,
              maxWidth: `${size}px`,
              borderColor: disabled
                ? '#ccc'
                : `rgba(${hexToRgb(color, 'string', ',')}, 0.5)`,
            }}
            htmlFor={radioItemId}
            className={`relative flex items-center justify-center border rounded-full cursor-pointer group-has-[input:disabled]:cursor-not-allowed aspect-square`}
          >
            <div
              style={{
                width: `${Math.round(size * 0.65)}px`,
                height: `${Math.round(size * 0.65)}px`,
                minHeight: `${Math.round(size * 0.65)}px`,
                minWidth: `${Math.round(size * 0.65)}px`,
                maxHeight: `${Math.round(size * 0.65)}px`,
                maxWidth: `${Math.round(size * 0.65)}px`,
                backgroundColor: color,
              }}
              className="absolute invisible rounded-full group-has-[input:checked]:visible animate-fadeIn top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
            ></div>
          </label>
        </div>
        <div className="flex-1 items-center group-has-[input:disabled]:text-[#ccc]">
          {label || 'Default label'}
        </div>
      </div>
    );
  }
);

RadioItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default RadioItem;
