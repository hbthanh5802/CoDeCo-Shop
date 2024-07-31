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

const CheckboxGroup = forwardRef(
  ({ name, items = [], className, onChange }, ref) => {
    const checkboxItemId = useId();
    const checkboxGroupRef = useRef();
    const checkboxItemRefs = useRef([]);
    const [groupValues, setGroupValues] = useState([]);

    const handleCheckboxItemChange = (checkboxItemData) => {
      let values = [...groupValues];
      const { checked, name, value } = checkboxItemData;

      if (checked) values.push(value);
      else values = values.filter((itemValue) => itemValue !== value);
      setGroupValues([...values]);
    };

    const handleReset = () => {
      checkboxItemRefs.current.forEach((checkboxItemRef) =>
        checkboxItemRef?.handleReset()
      );
      setGroupValues([]);
    };

    useEffect(() => {
      if (onChange) onChange({ name, groupValues });
    }, [groupValues]);

    useImperativeHandle(ref, () => ({ handleReset }));

    return (
      <div
        ref={checkboxGroupRef}
        className={`flex flex-col gap-3 ${className}`}
      >
        <button
          className="w-fit px-[4px] py-[1px] text-[14px] rounded-[4px] border bg-white duration-150 hover:text-[--color-primary]"
          onClick={handleReset}
        >
          Bỏ chọn tất cả
        </button>
        {items.map((item, index) => {
          const { label, value } = item;
          return (
            <CheckboxItem
              key={`${checkboxItemId}-${index}`}
              ref={(el) => (checkboxItemRefs.current[index] = el)}
              label={label}
              name={name}
              value={value}
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
};

export default CheckboxGroup;
