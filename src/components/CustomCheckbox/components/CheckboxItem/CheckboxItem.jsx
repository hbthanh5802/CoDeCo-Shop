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
  ({ label, name, value, onChange, className }, ref) => {
    const checkboxItemRef = useRef();
    const checkboxId = useId();
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
      setChecked(!checked);
    };

    const handleReset = () => {
      setChecked(false);
    };

    useEffect(() => {
      const data = { checked, name, label, value };
      if (onChange) onChange(data);
    }, [checked]);

    useImperativeHandle(ref, () => ({ handleReset }));

    return (
      <div
        ref={checkboxItemRef}
        className={`flex items-center gap-2 group/checkbox ${className}`}
      >
        <MdCheckBoxOutlineBlank
          className={`text-[18px] ${checked ? 'hidden' : 'block'}`}
        />
        <MdCheckBox
          className={`text-[18px] animate-fadeIn ${
            checked ? 'block' : 'hidden'
          }`}
        />
        <label
          htmlFor={checkboxId}
          className="text-[16px] select-none cursor-pointer"
          onClick={handleCheckboxChange}
        >
          {label}
        </label>
      </div>
    );
  }
);

CheckboxItem.propTypes = {
  label: PropTypes.string || PropTypes.node,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  classNames: PropTypes.string,
};

export default CheckboxItem;
