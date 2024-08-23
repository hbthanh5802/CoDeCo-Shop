import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';

const CheckboxItem = forwardRef(
  ({ label, name, value, onChange, checkboxSize, className }, ref) => {
    const checkboxItemRef = useRef();
    const checkboxId = useId();
    const [checked, setChecked] = useState(false);

    const handleChange = (isChecked) => {
      if (onChange) {
        const data = { checked: isChecked, name, label, value };
        onChange(data);
      }
    };

    const handleCheckboxChange = () => {
      setChecked(!checked);
      handleChange(!checked);
    };

    const handleReset = () => {
      setChecked(false);
    };

    const handleCheck = () => {
      setChecked(true);
    };

    useImperativeHandle(ref, () => ({ handleReset, handleCheck }));

    return (
      <div
        ref={checkboxItemRef}
        className={`CheckboxItem flex items-center gap-2 group/checkbox ${className}`}
      >
        <label
          htmlFor={checkboxId}
          className="text-[16px] select-none cursor-pointer flex items-center gap-2"
          onClick={handleCheckboxChange}
        >
          <MdCheckBoxOutlineBlank
            style={{ fontSize: checkboxSize }}
            className={`${checked ? 'hidden' : 'block'}`}
          />
          <MdCheckBox
            style={{ fontSize: checkboxSize }}
            className={`animate-fadeIn ${checked ? 'block' : 'hidden'}`}
          />
        </label>
        <div className="flex-1">{label}</div>
      </div>
    );
  }
);

CheckboxItem.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  classNames: PropTypes.string,
  checkboxSize: PropTypes.number,
};

export default CheckboxItem;
