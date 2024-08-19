import React, {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import RadioItem from './RadioItem';
import { hexToRgb } from '@/utils/colorConverter';

const CustomRadio = forwardRef(
  (
    {
      className,
      name,
      size = 18,
      color = '#E58411',
      items = [],
      allowReset = false,
      onChange = () => {},
      emptyContent = 'Empty',
    },
    ref
  ) => {
    const radioGroupRef = useRef(null);
    const radioGroupId = useId();
    const radioItemGRefs = useRef([]);
    const [checkedId, setCheckedId] = useState();

    const handleChange = (radioItemData) => {
      const { id, value } = radioItemData;
      const data = { name, value };
      setCheckedId(id);
      if (onChange) onChange(data);
    };

    const handleReset = () => {
      handleChange({ id: undefined, value: undefined });
      if (radioItemGRefs.current) {
        radioItemGRefs.current.forEach((radioItemGRef) =>
          radioItemGRef?.handleReset()
        );
      }
    };

    if (items.length === 0) return <>{emptyContent}</>;

    useImperativeHandle(ref, () => {
      handleReset;
      handleChange;
    });

    return (
      <div ref={radioGroupRef} className={`flex flex-col gap-2 ${className}`}>
        {allowReset && (
          <button
            className="duration-200 px-[12px] py-[4px] border w-fit rounded hover:border-red-300 active:bg-red-100"
            onClick={handleReset}
          >
            Loại bỏ lựa chọn
          </button>
        )}
        {items.map((item, index) => {
          const radioItemId = `RadioItem-${radioGroupId}-${index}`;
          const { label, value, defaultChecked, disabled } = item;
          return (
            <div
              key={radioItemId}
              style={{
                borderColor:
                  checkedId === radioItemId
                    ? `rgba(${hexToRgb(color, 'string', ',')}, 0.5)`
                    : 'white',
                backgroundColor:
                  checkedId === radioItemId
                    ? `rgba(${hexToRgb(color, 'string', ',')}, 0.05)`
                    : 'white',
              }}
              className={`duration-300 border p-[12px] rounded-[4px]`}
            >
              <RadioItem
                ref={(el) => (radioItemGRefs.current[index] = el)}
                id={radioItemId}
                size={size}
                name={`CustomRadio-${radioGroupId}`}
                color={color}
                label={label}
                value={value}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={(value) => handleChange(value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

CustomRadio.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  classNames: PropTypes.string,
  allowReset: PropTypes.bool,
  emptyContent: PropTypes.node,
};

export default CustomRadio;
