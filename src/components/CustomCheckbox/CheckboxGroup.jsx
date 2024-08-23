import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import CheckboxItem from './components/CheckboxItem';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const CheckboxGroup = forwardRef(
  (
    { name, items = [], className, checkboxSize = 18, onChange = () => {} },
    ref
  ) => {
    const checkboxItemId = useId();
    const checkboxGroupRef = useRef();
    const checkboxItemRefs = useRef([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [groupValues, setGroupValues] = useState([]);

    const isCheckedAll = groupValues.length === items.length;

    const handleReset = () => {
      checkboxItemRefs.current.forEach((checkboxItemRef) =>
        checkboxItemRef?.handleReset()
      );
      setCheckedAll(false);
      setGroupValues([]);
      onChange({ name, groupValues: [] });
    };

    const handleCheckAll = () => {
      setCheckedAll(true);
      checkboxItemRefs.current.forEach((checkboxItemRef) =>
        checkboxItemRef?.handleCheck()
      );
      const values = items.map((item) => item.value);
      setGroupValues(values);
      onChange({ name, groupValues: values });
    };

    const handleCheckboxItemChange = (checkboxItemData) => {
      let values = [...groupValues];
      const { checked, name, value } = checkboxItemData;

      if (checked && !isCheckedAll) {
        values.push(value);
      }
      if (!checked) {
        values = values.filter((itemValue) => itemValue !== value);
      }

      if (values.length === items.length) {
        handleCheckAll();
      } else {
        setGroupValues([...values]);
        onChange({ name, groupValues: values });
      }
    };

    useImperativeHandle(ref, () => ({ handleReset }));

    return (
      <div
        ref={checkboxGroupRef}
        className={`CheckboxGroup flex flex-col gap-3 ${className}`}
      >
        <div className="flex items-center gap-2 pb-[4px] border-b">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (isCheckedAll) handleReset();
              if (!isCheckedAll) handleCheckAll();
            }}
          >
            <MdCheckBoxOutlineBlank
              style={{ fontSize: checkboxSize }}
              className={`${isCheckedAll ? 'hidden' : 'block'}`}
            />
            <MdCheckBox
              style={{ fontSize: checkboxSize }}
              className={`animate-fadeIn ${isCheckedAll ? 'block' : 'hidden'}`}
            />
            <span className="duration-300 select-none bg-[#f7f7f7] p-1 px-2 rounded-md font-medium hover:bg-[#e7e7e7]">
              Chọn tất cả
            </span>
          </div>
        </div>
        {items.map((item, index) => {
          const { label, value } = item;
          return (
            <CheckboxItem
              key={`${checkboxItemId}-${index}`}
              ref={(el) => (checkboxItemRefs.current[index] = el)}
              label={label}
              name={name}
              value={value}
              checkboxSize={checkboxSize}
              onChange={(data) => handleCheckboxItemChange(data)}
            />
          );
        })}
      </div>
    );
  }
);

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkboxSize: PropTypes.number,
};

export default CheckboxGroup;
